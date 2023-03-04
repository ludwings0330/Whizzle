package com.bear.whizzle.domain.model.type;

import javax.persistence.Embeddable;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Flavor {

    @Min(0)
    @Max(10)
    private Integer smoky;

    @Min(0)
    @Max(10)
    private Integer peaty;

    @Min(0)
    @Max(10)
    private Integer spicy;

    @Min(0)
    @Max(10)
    private Integer herbal;

    @Min(0)
    @Max(10)
    private Integer oily;

    @Min(0)
    @Max(10)
    private Integer body;

    @Min(0)
    @Max(10)
    private Integer rich;

    @Min(0)
    @Max(10)
    private Integer sweet;

    @Min(0)
    @Max(10)
    private Integer briny;

    @Min(0)
    @Max(10)
    private Integer salty;

    @Min(0)
    @Max(10)
    private Integer vanilla;

    @Min(0)
    @Max(10)
    private Integer tart;

    @Min(0)
    @Max(10)
    private Integer fruity;

    @Min(0)
    @Max(10)
    private Integer floral;

}
