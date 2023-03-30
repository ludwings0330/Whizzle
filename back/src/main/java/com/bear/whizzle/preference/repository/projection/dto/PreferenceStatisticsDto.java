package com.bear.whizzle.preference.repository.projection.dto;

import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Gender;
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
public class PreferenceStatisticsDto {

    private Age age;

    private Gender gender;

}
