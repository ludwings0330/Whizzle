package com.bear.whizzle.keep.repository.projection;

import static com.bear.whizzle.domain.model.entity.QKeep.keep;
import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.whisky.repository.projection.dto.QWhiskySimpleResponseDto;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class KeepProjectionRepository {

    private final JPAQueryFactory queryFactory;

    public Slice<WhiskySimpleResponseDto> findTopNByMemberIdAndLastOffset(Pageable pageable, KeepSearchCondition searchCondition) {
        List<WhiskySimpleResponseDto> content = queryFactory.select(new QWhiskySimpleResponseDto(
                                                                    whisky.id,
                                                                    whisky.name,
                                                                    whisky.image.url,
                                                                    whisky.reviewCount,
                                                                    whisky.avgRating
                                                            ))
                                                            .from(keep)
                                                            .join(keep.whisky, whisky)
                                                            .where(keep.member.id.eq(searchCondition.getMemberId()),
                                                                   loeCreatedDateTime(searchCondition))
                                                            .orderBy(keep.createdDateTime.desc(),
                                                                     keep.whisky.id.desc())
                                                            .limit(pageable.getPageSize() + 1L)
                                                            .fetch();

        return checkLastPage(pageable, content);
    }

    private BooleanExpression loeCreatedDateTime(KeepSearchCondition searchCondition) {
        if (searchCondition.getLastOffset() == null) {
            return null;
        }

        return keep.createdDateTime.lt(queryCreatedDateTimeByMemberIdAndLastOffset(searchCondition))
                                   .or(
                                           keep.createdDateTime.eq(queryCreatedDateTimeByMemberIdAndLastOffset(searchCondition))
                                                               .and(keep.whisky.id.lt(searchCondition.getLastOffset()))
                                   );
    }

    private JPAQuery<LocalDateTime> queryCreatedDateTimeByMemberIdAndLastOffset(KeepSearchCondition searchCondition) {
        return queryFactory.select(keep.createdDateTime)
                           .from(keep)
                           .where(keep.member.id.eq(searchCondition.getMemberId()),
                                  keep.whisky.id.eq(searchCondition.getLastOffset()));
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
