package com.bear.whizzle.badge.repository.projection;

import static com.bear.whizzle.domain.model.entity.QMemberHasBadge.memberHasBadge;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BadgeProjectionRepository {

    private final JPAQueryFactory query;

    public List<BadgeResponseDto> findAllBadgesByMemberId(Long memberId) {
        return query.select(Projections.fields(BadgeResponseDto.class,
                                               memberHasBadge.badge.description,
                                               memberHasBadge.badge.image.url,
                                               memberHasBadge.createdDateTime.as("achieveDate")
                            ))
                    .from(memberHasBadge)
                    .where(memberHasBadge.member.id.eq(memberId))
                    .orderBy(memberHasBadge.createdDateTime.asc())
                    .fetch();
    }

}
