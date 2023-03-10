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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "whiskey")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class Whiskey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Embedded
    @NotNull
    private Image image;

    @NotNull
    @Column(unique = true, updatable = false)
    private String category;

    @NotNull
    private String location;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @NotNull
    @Min(0)
    @Max(100)
    private Float abv;

    private String caskType;

    @Embedded
    @NotNull
    private Flavor flavor;

}
