package com.bear.whizzle.keep.repository;

import static com.bear.whizzle.domain.model.entity.QKeep.keep;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class KeepCustomRepository {

    private final JPAQueryFactory queryFactory;

    public Map<Long, Boolean> whetherKeep(List<Long> whiskyIds, Long memberId) {
        Map<Long, Boolean> myKeeps = new HashMap<>();
        queryFactory.selectFrom(keep)
                    .where(keep.member.id.eq(memberId).and(keep.whisky.id.in(whiskyIds)))
                    .fetch()
                    .forEach(k -> myKeeps.put(k.getWhisky().getId(), Boolean.TRUE));
        return myKeeps;
    }

    public Boolean existByMemberIdAndWhiskyId(Long memberId, Long whiskyId) {
        return queryFactory.selectFrom(keep)
                           .where(keep.member.id.eq(memberId),
                                  keep.whisky.id.eq(whiskyId))
                           .fetchFirst() != null;
    }

}
