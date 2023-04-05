package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.keep.repository.KeepCustomRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.preference.repository.projection.PreferenceProjectionRepository;
import com.bear.whizzle.preference.service.query.PreferenceQueryService;
import com.bear.whizzle.recommend.PreferenceMapper;
import com.bear.whizzle.recommend.RecommendWhiskyMapper;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
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
    private final PreferenceQueryService preferenceQueryService;
    private final PreferenceProjectionRepository preferenceProjectionRepository;
    private final MemberRepository memberRepository;

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
        FlavorSummary flavorSummary = FlavorSummary.selectMinMax(preferenceQueryService.findFlavorMinMax(), preferenceProjectionRepository.findFlavorMinMaxByPreference());
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
     * 조회할 위스키 정보 조회 with keep
     *
     * @param whiskies   : 조회할 위스키 index 리스트
     * @param memberId   : 사용자 id [ 로그인 시 memberId | 비로그인 시 0L ]
     * @param returnType : 반환 타입
     * @return List<returnType> : 전달받은 returnType 리스트로 반환
     */
    @Override
    public <T> List<T> findRecommendWhiskies(List<Long> whiskies, Long memberId, Class<T> returnType) {
        Map<Long, Whisky> whiskyMap = whiskyCustomRepository.findByIds(whiskies);
        Map<Long, Boolean> myKeeps = memberId != 0L ? keepCustomRepository.whetherKeep(whiskies, memberId) : new HashMap<>();
        List<T> whiskiesResponseDto = new ArrayList<>();
        whiskies.forEach(
                r -> whiskiesResponseDto.add(
                        returnType.cast(RecommendWhiskyMapper.toWhiskyResponseDto(whiskyMap.get(r), myKeeps.containsKey(r), returnType))));
        return whiskiesResponseDto;
    }

    /**
     * 이미 학습된 사용자인지 판단하는 함수
     *
     * @param memberId 접근중인 주체
     * @return 학습된 사용자라면 memberId, 신규 사용자라면 0L
     * @throws RuntimeException : 학습된 모델이 존재하지 않는 경우 발생합니다.
     */
    @Override
    public Long isLearnedMember(Long memberId) {
        return memberRepository.findByIdAndCreatedDateTimeBefore(memberId)
                               .map(Member::getId)
                               .orElse(0L);
    }

}
