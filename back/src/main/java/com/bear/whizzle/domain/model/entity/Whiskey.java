package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.File;
import com.bear.whizzle.domain.model.type.Flavor;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "whiskey")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Whiskey {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @Embedded
    @NotNull
    private File image;

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
