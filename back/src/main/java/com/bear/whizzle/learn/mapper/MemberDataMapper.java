package com.bear.whizzle.learn.mapper;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.learn.controller.MemberData;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import java.util.List;

public final class MemberDataMapper {

    private MemberDataMapper() {
    }

    public static MemberData toMemberData(List<RatingDto> ratings, List<Preference> preferences) {
        return MemberData.builder()
                         .ratings(ratings)
                         .preferences(preferences)
                         .build();
    }

}
