package com.bear.whizzle.retrain.handler.dto;

import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
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

    private String time;
    private List<RatingDto> ratings;
    private List<PreferenceDto> preferences;

    public void setTime(String time) {
        this.time = time;
    }

}
