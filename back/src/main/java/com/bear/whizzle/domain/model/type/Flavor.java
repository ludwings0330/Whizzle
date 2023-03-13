package com.bear.whizzle.domain.model.type;

import javax.persistence.Embeddable;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Flavor {

    @Min(0)
    @Max(100)
    private Integer smoky;

    @Min(0)
    @Max(100)
    private Integer peaty;

    @Min(0)
    @Max(100)
    private Integer spicy;

    @Min(0)
    @Max(100)
    private Integer herbal;

    @Min(0)
    @Max(100)
    private Integer oily;

    @Min(0)
    @Max(100)
    private Integer body;

    @Min(0)
    @Max(100)
    private Integer rich;

    @Min(0)
    @Max(100)
    private Integer sweet;

    @Min(0)
    @Max(100)
    private Integer salty;

    @Min(0)
    @Max(100)
    private Integer vanilla;

    @Min(0)
    @Max(100)
    private Integer tart;

    @Min(0)
    @Max(100)
    private Integer fruity;

    @Min(0)
    @Max(100)
    private Integer floral;

}
