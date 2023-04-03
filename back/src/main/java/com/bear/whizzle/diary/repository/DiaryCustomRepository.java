package com.bear.whizzle.diary.repository;

import static com.bear.whizzle.domain.model.entity.QDiary.diary;
import static com.bear.whizzle.domain.model.entity.QDrink.drink;
import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.domain.model.entity.Diary;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiaryCustomRepository {

    private final JPAQueryFactory queryFactory;

    public List<Diary> findAllByMemberIdAndMonth(Long memberId, String month) {
        StringTemplate diaryMonth = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})",
                diary.date, ConstantImpl.create("%Y-%m")
        );

        return queryFactory.selectDistinct(diary)
                           .from(diary)
                           .innerJoin(diary.drinks, drink).fetchJoin()
                           .innerJoin(drink.whisky, whisky).fetchJoin()
                           .where(diary.member.id.eq(memberId),
                                  diaryMonth.eq(month),
                                  diary.isDeleted.isFalse(),
                                  drink.isDeleted.isFalse())
                           .orderBy(diary.date.asc(), drink.drinkOrder.asc())
                           .fetch();
    }

}
