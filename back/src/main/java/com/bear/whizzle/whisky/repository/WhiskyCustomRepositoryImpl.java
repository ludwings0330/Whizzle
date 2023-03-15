package com.bear.whizzle.whisky.repository;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.QWhisky;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WhiskyCustomRepositoryImpl implements WhiskyCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    @Performance
    public Optional<Whisky> findByIdAfterSleepTest(Long id) {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return Optional.ofNullable(
                queryFactory.selectFrom(QWhisky.whisky)
                            .where(QWhisky.whisky.id.eq(id))
                            .fetchOne()
        );
    }

}
