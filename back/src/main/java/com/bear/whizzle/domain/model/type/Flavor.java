package com.bear.whizzle.domain.model.type;

import javax.persistence.Column;
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

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer smoky;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer peaty;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer spicy;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer herbal;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer oily;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer body;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer rich;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer sweet;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer salty;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer vanilla;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer tart;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer fruity;

    @Column(columnDefinition = "TINYINT")
    @Min(0)
    @Max(100)
    private Integer floral;

}
