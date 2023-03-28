package com.bear.whizzle.keep.repository.projection;

import static com.bear.whizzle.domain.model.entity.QKeep.keep;
import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.whisky.repository.projection.dto.QWhiskySimpleResponseDto;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
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
                                                                   lessWhiskyId(searchCondition.getLastOffset()))
                                                            .orderBy(keep.whisky.id.desc())
                                                            .limit(pageable.getPageSize() + 1L)
                                                            .fetch();

        return checkLastPage(pageable, content);
    }

    private BooleanExpression lessWhiskyId(Long lastOffset) {
        if (lastOffset == null) {
            return null;
        }

        return keep.whisky.id.lt(lastOffset);
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
