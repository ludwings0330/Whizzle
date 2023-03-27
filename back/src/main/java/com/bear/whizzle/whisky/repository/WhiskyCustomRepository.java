package com.bear.whizzle.whisky.repository;

import static com.bear.whizzle.domain.model.entity.QWhisky.*;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WhiskyCustomRepository {

    private final JPAQueryFactory queryFactory;

    public Map<Long, Whisky> findByIds(List<Long> ids) {
        Map<Long, Whisky> whiskies = new HashMap<>();
        queryFactory.selectFrom(whisky)
                    .where(whisky.id.in(ids))
                    .fetch()
                    .forEach(w -> whiskies.put(w.getId(), w));
        return whiskies;
    }

    @Performance
    public Optional<Whisky> findByIdAfterSleepTest(Long id) {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return Optional.ofNullable(
                queryFactory.selectFrom(whisky)
                            .where(whisky.id.eq(id))
                            .fetchOne()
        );
    }

}
