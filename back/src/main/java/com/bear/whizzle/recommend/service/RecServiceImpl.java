package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.keep.repository.KeepCustomRepository;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.recommend.PreferenceMapper;
import com.bear.whizzle.recommend.RecWhiskyMapper;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;
import com.bear.whizzle.whisky.repository.WhiskyCustomRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecServiceImpl implements RecService {

    private final WhiskyRepository whiskyRepository;
    private final WhiskyCustomRepository whiskyCustomRepository;
    private final PreferenceRepository preferenceRepository;
    private final KeepCustomRepository keepCustomRepository;
    private final WhiskyQueryService whiskyQueryService;

    @Value("${app.rec.topK}")
    private Integer topK;


    /**
     * Min-Max Noramlization 처리 한 Flavor & 선호 가격대 반환
     *
     * @param memberId            : 로그인 했다면 해당 id, 비로그인 시 0
     * @param recWhiskyRequestDto : 위스키 추천 요청 DTO
     * @return PreferenceDto : 선호 가격대 & 정규화된 선호 입맛
     * @throws NotFoundException
     */
    @Override
    public PreferenceDto extractPreference(Long memberId, RecWhiskyRequestDto recWhiskyRequestDto) throws NotFoundException {
        Flavor flavor = null;
        Integer priceTier = recWhiskyRequestDto == null ? null : recWhiskyRequestDto.getPriceTier();
        if (recWhiskyRequestDto == null) {
            Preference preference = preferenceRepository.findByMemberId(memberId)
                                                        .orElseThrow(() -> new NotFoundException("선호 입맛 데이터가 존재하지 않습니다."));
            flavor = preference.getFlavor();
            priceTier = preference.getPriceTier();
        } else if (recWhiskyRequestDto.getWhiskies() != null) { // whisky random choice
            Random rand = new Random();
            flavor = whiskyRepository.findById(recWhiskyRequestDto.getWhiskies().get(rand.nextInt(recWhiskyRequestDto.getWhiskies().size())))
                                     .orElseThrow(() -> new NotFoundException("해당 위스키 데이터가 없습니다."))
                                     .getFlavor();
        } else if (recWhiskyRequestDto.getFlavor() != null) { // use flavor
            flavor = recWhiskyRequestDto.getFlavor();
        }
        FlavorSummary flavorSummary = whiskyQueryService.findFlavorMinMax();
        return PreferenceMapper.toPreferenceDto(memberId, priceTier, flavor, flavorSummary);
    }

    /**
     * 로컬 캐쉬에 저장된 PriceMapping정보를 활용해 추천할 topK개 위스키를 추출합니다.
     *
     * @param recWhiskies : 추천모델로부터 받은 whisky index List
     * @param priceTier   : 원하는 가격대
     * @return 추천할 topK개 위스키의 index
     */
    @Override
    public List<Long> filterByPriceTier(List<Long> recWhiskies, Integer priceTier) {
        Map<Long, Integer> whiskyPriceTier = whiskyQueryService.findWhiskyPriceTier();
        List<Long> filteredRecWhiskies = new ArrayList<>(topK);
        for (Long recWhisky : recWhiskies) {
            Integer whiskyPrice = whiskyPriceTier.get(recWhisky);
            if (whiskyPrice != null && whiskyPrice.equals(priceTier) && filteredRecWhiskies.size() < 9) {
                filteredRecWhiskies.add(recWhisky);
            } else if (filteredRecWhiskies.size() >= 9) {
                break;
            }
        }
        return filteredRecWhiskies;
    }

    /**
     * 추천 결과 위스키 정보 조회 with Keep
     *
     * @param filteredWhiskies : 모델로부터 추천받은 위스키 중 원하는 가격대 맞는 9개 위스키 index
     * @param memberId         : 접근중인 주체 memberId
     * @return 추천 결과 페이지에 출력할 위스키 정보 DTO
     */
    @Override
    public List<RecWhiskyResponseDto> findRecWhiskies(List<Long> filteredWhiskies, Long memberId) {
        Map<Long, Whisky> whiskyMap = whiskyCustomRepository.findByIds(filteredWhiskies);
        Map<Long, Boolean> myKeeps = memberId != 0L ? keepCustomRepository.whetherKeep(filteredWhiskies, memberId) : new HashMap<>();
        List<RecWhiskyResponseDto> recWhiskyResponseDtos = new ArrayList<>();
        filteredWhiskies.forEach(
                r -> recWhiskyResponseDtos.add(RecWhiskyMapper.toRecWhiskyResponseDto(whiskyMap.get(r), myKeeps.containsKey(r))));
        return recWhiskyResponseDtos;
    }

    /**
     * 유사한 위스키 정보 조회 with keep
     *
     * @param simWhiskies : 모델로부터 추천받은 위스키 중 원하는 가격대 맞는 9개 위스키 index
     * @param memberId    : 접근중인 주체 memberId
     * @return 추천 결과 페이지에 출력할 위스키 정보 DTO
     */
    @Override
    public List<SimilarWhiskyResponseDto> findSimWhiskies(List<Long> simWhiskies, Long memberId) {
        Map<Long, Whisky> whiskyMap = whiskyCustomRepository.findByIds(simWhiskies);
        Map<Long, Boolean> myKeeps = memberId != 0L ? keepCustomRepository.whetherKeep(simWhiskies, memberId) : new HashMap<>();
        List<SimilarWhiskyResponseDto> similarWhiskyResponseDtos = new ArrayList<>();
        simWhiskies.forEach(
                r -> similarWhiskyResponseDtos.add(RecWhiskyMapper.toSimilarWhiskyResponseDto(whiskyMap.get(r), myKeeps.containsKey(r))));
        return similarWhiskyResponseDtos;
    }

}
