package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;

public class RecommendWhiskyMapper {

    private RecommendWhiskyMapper() {
    }

    public static <T> T toWhiskyResponseDto(Whisky whisky, Boolean kept, Class<T> returnType) {
        if (returnType.equals(RecWhiskyResponseDto.class)) {
            return returnType.cast(toRecWhiskyResponseDto(whisky, kept));
        } else if (returnType.equals(SimilarWhiskyResponseDto.class)) {
            return returnType.cast(toSimilarWhiskyResponseDto(whisky, kept));
        }
        return null;
    }
    private static RecWhiskyResponseDto toRecWhiskyResponseDto(Whisky   whisky, Boolean kept) {
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
                                   .isKept(kept)
                                   .build();
    }

    private static SimilarWhiskyResponseDto toSimilarWhiskyResponseDto(Whisky whisky, Boolean kept) {
        return SimilarWhiskyResponseDto.builder()
                                       .id(whisky.getId())
                                       .name(whisky.getName())
                                       .avgRating(whisky.getAvgRating())
                                       .imageUrl(whisky.getImage().getUrl())
                                       .isKept(kept)
                                       .reviewCount(whisky.getReviewCount())
                                       .build();
    }

}
