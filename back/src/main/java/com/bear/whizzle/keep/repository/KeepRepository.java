package com.bear.whizzle.keep.repository;

import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.type.id.KeepId;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KeepRepository extends JpaRepository<Keep, KeepId> {

    @Query("SELECT k.whisky.id FROM Keep k WHERE k.member.id = :memberId")
    Set<Long> findAllByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT k FROM Keep k WHERE k.member.id = :memberId AND k.whisky.id = :whiskyId")
    Optional<Keep> findByMemberIdAndWhiskyId(@Param("memberId") Long memberId, @Param("whiskyId") Long whiskyId);

    @Query("SELECT COUNT(*) FROM Keep k WHERE k.member.id =:memberId")
    long countByMemberId(@Param("memberId") Long memberId);

}
