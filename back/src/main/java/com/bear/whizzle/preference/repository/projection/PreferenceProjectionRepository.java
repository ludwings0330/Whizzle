package com.bear.whizzle.preference.repository.projection;

import static com.bear.whizzle.domain.model.entity.QMember.member;
import static com.bear.whizzle.domain.model.entity.QPreference.preference;

import com.bear.whizzle.domain.model.entity.Member;
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

    public List<PreferenceStatisticsDto> findAllByMemberIn(List<Member> members) {
        return queryFactory.select(Projections.constructor(
                                   PreferenceStatisticsDto.class,
                                   preference.age, preference.gender
                           ))
                           .from(preference)
                           .join(preference.member, member)
                           .where(member.in(members))
                           .fetch();

    }

}
