package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Gender;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceRequestDto;
import javax.persistence.Column;
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
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "preference")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString(callSuper = true)
public class Preference extends BaseTimeEntity {

    @Id
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    @ToString.Exclude
    private Member member;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Age age;

    @NotNull
    @Column(columnDefinition = "TINYINT")
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @Embedded
    @NotNull
    private Flavor flavor;

    public void updatePreference(MemberPreferenceRequestDto preference) {
        this.gender = preference.getGender();
        this.age = preference.getAge();
        this.priceTier = preference.getPriceTier();
        this.flavor = preference.getFlavor();
    }

}
