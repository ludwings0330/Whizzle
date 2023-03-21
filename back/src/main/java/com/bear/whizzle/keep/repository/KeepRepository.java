package com.bear.whizzle.keep.repository;

import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.type.id.KeepId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeepRepository extends JpaRepository<Keep, KeepId> {

    long countByMemberId(Long memberId);

}
