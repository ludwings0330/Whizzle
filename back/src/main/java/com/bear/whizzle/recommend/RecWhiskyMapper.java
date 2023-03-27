package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;

public class RecWhiskyMapper {

    private RecWhiskyMapper() {
    }

    public static RecWhiskyResponseDto toRecWhiskyResponseDto(Whisky whisky, Boolean keep) {
        return RecWhiskyResponseDto.builder()
                                   .id(whisky.getId())
                                   .abv(whisky.getAbv())
                                   .avgRating(whisky.getAvgRating())
                                   .url(whisky.getImage().getUrl())
                                   .priceTier(whisky.getPriceTier())
                                   .name(whisky.getName())
                                   .reviewCount(whisky.getReviewCount())
                                   .category(whisky.getCategory())
                                   .location(whisky.getLocation())
                                   .keep(keep)
                                   .build();
    }

}
