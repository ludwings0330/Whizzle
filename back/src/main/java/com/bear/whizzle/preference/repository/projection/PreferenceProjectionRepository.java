package com.bear.whizzle.preference.repository.projection;

import static com.bear.whizzle.domain.model.entity.QPreference.preference;

import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
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

}
