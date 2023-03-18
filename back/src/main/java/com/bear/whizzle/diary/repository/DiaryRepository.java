package com.bear.whizzle.diary.repository;

import com.bear.whizzle.domain.model.entity.Diary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>, DiaryCustomRepository {

    @Query("SELECT DISTINCT d FROM Diary d JOIN FETCH d.drinks WHERE d.member.id = :memberId")
    List<Diary> findByMemberId(@Param("memberId") Long memberId);

}
