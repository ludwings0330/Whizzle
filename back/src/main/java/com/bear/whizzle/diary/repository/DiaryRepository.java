package com.bear.whizzle.diary.repository;

import com.bear.whizzle.domain.model.entity.Diary;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    @Query("SELECT d FROM Diary d JOIN FETCH d.drinks ds JOIN FETCH ds.whisky WHERE d.id = :id")
    Optional<Diary> findWithDrinksById(@Param("id") Long id);

    @Query("SELECT DISTINCT d FROM Diary d JOIN FETCH d.drinks WHERE d.member.id = :memberId")
    List<Diary> findByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT d FROM Diary d JOIN FETCH d.drinks ds JOIN FETCH ds.whisky WHERE d.member.id = :memberId AND d.date = :date")
    Optional<Diary> findWithDrinksByMemberIdAndDate(@Param("memberId") Long memberId, @Param("date") LocalDate date);

    @Query("SELECT COUNT(*) FROM Diary d WHERE d.member.id = :memberId")
    long countByMemberId(@Param("memberId") Long memberId);

}
