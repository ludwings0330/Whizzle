package com.bear.whizzle.retrain.mapper;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.retrain.handler.dto.MemberData;
import com.bear.whizzle.recommend.PreferenceMapper;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import java.util.List;
import java.util.stream.Collectors;

public final class MemberDataMapper {

    private MemberDataMapper() {
    }

    public static MemberData toMemberData(List<RatingDto> ratings, List<Preference> preferences, FlavorSummary flavorSummary) {
        return MemberData.builder()
                         .ratings(ratings)
                         .preferences(
                                 preferences.stream()
                                            .map(p -> PreferenceMapper.toPreferenceDto(p, flavorSummary))
                                            .collect(Collectors.toList())
                         )
                         .build();
    }

}
