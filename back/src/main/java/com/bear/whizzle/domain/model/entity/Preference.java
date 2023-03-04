package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Gender;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "preference")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder
public class Preference extends BaseTimeEntity {

    @Id
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Age age;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @Embedded
    @NotNull
    private Flavor flavor;

}
