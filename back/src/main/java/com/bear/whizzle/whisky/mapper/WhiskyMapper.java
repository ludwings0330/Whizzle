package com.bear.whizzle.whisky.mapper;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.whisky.controller.dto.WhiskyDetailResponseDto;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class WhiskyMapper {

    public static WhiskyDetailResponseDto toWhiskyDetailResponseDto(Whisky whisky) {
        return WhiskyDetailResponseDto.builder()
                                      .id(whisky.getId())
                                      .name(whisky.getName())
                                      .imageUrl(whisky.getImage().getUrl())
                                      .category(whisky.getCategory())
                                      .location(whisky.getLocation())
                                      .priceTier(whisky.getPriceTier())
                                      .abv(whisky.getAbv())
                                      .caskType(whisky.getCaskType())
                                      .reviewCount(whisky.getReviewCount())
                                      .avgRating(whisky.getAvgRating())
                                      .flavor(whisky.getFlavor())
                                      .build();
    }

}
