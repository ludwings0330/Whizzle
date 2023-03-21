package com.bear.whizzle.keep.repository;

import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.type.id.KeepId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KeepRepository extends JpaRepository<Keep, KeepId> {

    @Query("SELECT COUNT(*) FROM Keep k WHERE k.member.id =:memberId")
    long countByMemberId(@Param("memberId") Long memberId);

}
