package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Image;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "whisky")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class Whisky {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Embedded
    private Image image;

    @NotNull
    @Column(updatable = false)
    private String category;

    @NotNull
    private String location;

    @Column(columnDefinition = "TINYINT")
    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @NotNull
    @Min(0)
    @Max(100)
    private Float abv;

    private String caskType;

    private Integer reviewCount;

    private Float avgRating;

    @Embedded
    @NotNull
    private Flavor flavor;

}
