package com.bear.whizzle.retrain.service.query;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.retrain.handler.dto.MemberData;
import com.bear.whizzle.retrain.mapper.MemberDataMapper;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.preference.service.query.PreferenceQueryService;
import com.bear.whizzle.review.repository.projection.ReviewProjectionRepository;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RetrainServiceImpl implements RetrainService {

    private final ReviewProjectionRepository reviewProjectionRepository;
    private final PreferenceRepository preferenceRepository;
    private final PreferenceQueryService preferenceQueryService;

    @Override
    public MemberData reactiveLearnData(Long memberId) {
        List<RatingDto> ratings = reviewProjectionRepository.findAllRatingByMemberId(memberId);
        List<Preference> preferences = preferenceRepository.findAllByMemberIds(List.of(memberId));
        return MemberDataMapper.toMemberData(ratings, preferences, preferenceQueryService.findFlavorMinMax());
    }

}
