package com.bear.whizzle.whisky.controller.dto;

import com.bear.whizzle.domain.model.type.Flavor;
import java.net.URL;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class WhiskyDetailResponseDto {

    private Long id;

    private String name;

    private URL imageUrl;

    private String category;

    private String location;

    private Integer priceTier;

    private Float abv;

    private String caskType;

    private Integer reviewCount;

    private Float avgRating;

    private Flavor flavor;

}
