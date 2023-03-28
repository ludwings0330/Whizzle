package com.bear.whizzle.whisky.repository;

import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

}
