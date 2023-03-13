package com.bear.whizzle.whiskey.repository;

import static com.bear.whizzle.domain.model.entity.QWhiskey.whiskey;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.Whiskey;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class WhiskeyCustomRepositoryImpl implements WhiskeyCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    @Performance
    public Optional<Whiskey> findByIdAfterSleepTest(Long id) {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return Optional.ofNullable(
                queryFactory.selectFrom(whiskey)
                            .where(whiskey.id.eq(id))
                            .fetchOne()
        );
    }

}
