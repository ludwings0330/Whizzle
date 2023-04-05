package com.bear.whizzle.retrain.service.query;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.preference.repository.projection.PreferenceProjectionRepository;
import com.bear.whizzle.retrain.handler.dto.MemberData;
import com.bear.whizzle.retrain.mapper.MemberDataMapper;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.preference.service.query.PreferenceQueryService;
import com.bear.whizzle.review.repository.projection.ReviewProjectionRepository;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RetrainQueryServiceImpl implements RetrainQueryService {

    private final ReviewProjectionRepository reviewProjectionRepository;
    private final PreferenceRepository preferenceRepository;
    private final PreferenceQueryService preferenceQueryService;
    private final PreferenceProjectionRepository preferenceProjectionRepository;

    @Override
    public MemberData reactiveLearnData(List<Long> memberIds) {
        List<RatingDto> ratings = reviewProjectionRepository.findAllRatingByMemberInIds(memberIds);
        List<Preference> preferences = preferenceRepository.findAllByMemberIds(memberIds);
        return MemberDataMapper.toMemberData(ratings, preferences,
                                             FlavorSummary.selectMinMax(preferenceQueryService.findFlavorMinMax(),
                                                                        preferenceProjectionRepository.findFlavorMinMaxByPreference()));
    }

}
