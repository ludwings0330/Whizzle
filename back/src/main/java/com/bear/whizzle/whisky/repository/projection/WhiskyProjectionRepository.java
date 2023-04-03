package com.bear.whizzle.whisky.repository.projection;

import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.whisky.controller.dto.WhiskySearchCondition;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import com.bear.whizzle.whisky.repository.projection.dto.QWhiskySimpleResponseDto;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WhiskyProjectionRepository {

    private final JPAQueryFactory queryFactory;

    public Slice<WhiskySimpleResponseDto> findTopNByWordAndLastOffset(Pageable pageable, WhiskySearchCondition searchCondition) {
        List<WhiskySimpleResponseDto> content = queryFactory.select(new QWhiskySimpleResponseDto(
                                                                    whisky.id,
                                                                    whisky.name,
                                                                    whisky.image.url,
                                                                    whisky.reviewCount,
                                                                    whisky.avgRating
                                                            ))
                                                            .from(whisky)
                                                            .where(whisky.name.upper().like(searchCondition.getWord()),
                                                                   whisky.id.gt(searchCondition.getLastOffset()))
                                                            .limit(pageable.getPageSize() + 1L)
                                                            .fetch();

        return checkLastPage(pageable, content);
    }

    public FlavorSummary findFlavorMinMaxByWhisky() {
        return queryFactory.select(
                                   Projections.constructor(FlavorSummary.class,
                                                           whisky.flavor.smoky.min().as("minSmoky"), whisky.flavor.smoky.max().as("maxSmoky"),
                                                           whisky.flavor.peaty.min().as("minPeaty"), whisky.flavor.peaty.max().as("maxPeaty"),
                                                           whisky.flavor.spicy.min().as("minSpicy"), whisky.flavor.spicy.max().as("maxSpicy"),
                                                           whisky.flavor.herbal.min().as("minHerbal"), whisky.flavor.herbal.max().as("maxHerbal"),
                                                           whisky.flavor.oily.min().as("minOily"), whisky.flavor.oily.max().as("maxOily"),
                                                           whisky.flavor.body.min().as("minBody"), whisky.flavor.body.max().as("maxBody"),
                                                           whisky.flavor.rich.min().as("minRich"), whisky.flavor.rich.max().as("maxRich"),
                                                           whisky.flavor.sweet.min().as("minSweet"), whisky.flavor.sweet.max().as("maxSweet"),
                                                           whisky.flavor.salty.min().as("minSalty"), whisky.flavor.salty.max().as("maxSalty"),
                                                           whisky.flavor.vanilla.min().as("minVanilla"), whisky.flavor.vanilla.max().as("maxVanilla"),
                                                           whisky.flavor.tart.min().as("minTart"), whisky.flavor.tart.max().as("maxTart"),
                                                           whisky.flavor.fruity.min().as("minFruity"), whisky.flavor.fruity.max().as("maxFruity"),
                                                           whisky.flavor.floral.min().as("minFloral"), whisky.flavor.floral.max().as("maxFloral")
                                   )
                           )
                           .from(whisky)
                           .fetchOne();
    }

    private SliceImpl<WhiskySimpleResponseDto> checkLastPage(Pageable pageable, List<WhiskySimpleResponseDto> content) {
        boolean hasNext = false;
        if (content.size() > pageable.getPageSize()) {
            hasNext = true;
            content.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(content, pageable, hasNext);
    }

}
