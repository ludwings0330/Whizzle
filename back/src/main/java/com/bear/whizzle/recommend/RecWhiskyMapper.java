package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;

public class RecWhiskyMapper {

    private RecWhiskyMapper() {
    }

    public static RecWhiskyResponseDto toRecWhiskyResponseDto(Whisky whisky, Boolean keep) {
        return RecWhiskyResponseDto.builder()
                                   .id(whisky.getId())
                                   .abv(whisky.getAbv())
                                   .avgRating(whisky.getAvgRating())
                                   .imageUrl(whisky.getImage().getUrl())
                                   .priceTier(whisky.getPriceTier())
                                   .name(whisky.getName())
                                   .reviewCount(whisky.getReviewCount())
                                   .category(whisky.getCategory())
                                   .location(whisky.getLocation())
                                   .isKept(keep)
                                   .build();
    }

    public static SimilarWhiskyResponseDto toSimilarWhiskyResponseDto(Whisky whisky, Boolean keep) {
        return SimilarWhiskyResponseDto.builder()
                                       .id(whisky.getId())
                                       .name(whisky.getName())
                                       .avgRating(whisky.getAvgRating())
                                       .imageUrl(whisky.getImage().getUrl())
                                       .isKept(keep)
                                       .reviewCount(whisky.getReviewCount())
                                       .build();
    }

}
