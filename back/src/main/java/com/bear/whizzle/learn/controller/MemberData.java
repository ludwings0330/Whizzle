package com.bear.whizzle.learn.controller;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class MemberData {

    private List<RatingDto> ratings;
    private List<Preference> preferences;

}
