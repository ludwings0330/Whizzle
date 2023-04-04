package com.bear.whizzle.learn.service;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.learn.controller.MemberData;
import com.bear.whizzle.learn.mapper.MemberDataMapper;
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
public class LearnServiceImpl implements LearnService {

    private final ReviewProjectionRepository reviewProjectionRepository;
    private final PreferenceRepository preferenceRepository;
    private final PreferenceQueryService preferenceQueryService;

    @Override
    public MemberData reactiveLearnMyData(Long memberId) {
        List<RatingDto> ratings = reviewProjectionRepository.findAllRatingByMemberId(memberId);
        Preference preference = preferenceRepository.findByMemberId(memberId).orElse(Preference.builder().build());
        return MemberDataMapper.toMemberData(ratings, List.of(preference), preferenceQueryService.findFlavorMinMax());
    }

}
