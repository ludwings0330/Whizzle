package com.bear.whizzle.preference.repository.projection;

import static com.bear.whizzle.domain.model.entity.QPreference.preference;

import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PreferenceProjectionRepository {

    private final JPAQueryFactory queryFactory;

    public List<PreferenceStatisticsDto> findAllByMemberIn(List<Long> memberIds) {
        return queryFactory.select(Projections.constructor(
                                   PreferenceStatisticsDto.class,
                                   preference.age, preference.gender
                           ))
                           .from(preference)
                           .where(preference.member.id.in(memberIds))
                           .fetch();
    }

    public FlavorSummary findFlavorMinMaxByPreference() {
        return queryFactory.select(
                                   Projections.constructor(FlavorSummary.class,
                                                           preference.flavor.smoky.min().as("minSmoky"), preference.flavor.smoky.max().as("maxSmoky"),
                                                           preference.flavor.peaty.min().as("minPeaty"), preference.flavor.peaty.max().as("maxPeaty"),
                                                           preference.flavor.spicy.min().as("minSpicy"), preference.flavor.spicy.max().as("maxSpicy"),
                                                           preference.flavor.herbal.min().as("minHerbal"), preference.flavor.herbal.max().as("maxHerbal"),
                                                           preference.flavor.oily.min().as("minOily"), preference.flavor.oily.max().as("maxOily"),
                                                           preference.flavor.body.min().as("minBody"), preference.flavor.body.max().as("maxBody"),
                                                           preference.flavor.rich.min().as("minRich"), preference.flavor.rich.max().as("maxRich"),
                                                           preference.flavor.sweet.min().as("minSweet"), preference.flavor.sweet.max().as("maxSweet"),
                                                           preference.flavor.salty.min().as("minSalty"), preference.flavor.salty.max().as("maxSalty"),
                                                           preference.flavor.vanilla.min().as("minVanilla"), preference.flavor.vanilla.max().as("maxVanilla"),
                                                           preference.flavor.tart.min().as("minTart"), preference.flavor.tart.max().as("maxTart"),
                                                           preference.flavor.fruity.min().as("minFruity"), preference.flavor.fruity.max().as("maxFruity"),
                                                           preference.flavor.floral.min().as("minFloral"), preference.flavor.floral.max().as("maxFloral")
                                   )
                           )
                           .from(preference)
                           .fetchOne();
    }

}
