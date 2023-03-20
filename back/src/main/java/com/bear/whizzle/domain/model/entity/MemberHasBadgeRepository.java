package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.id.MemberHasBadgeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberHasBadgeRepository extends JpaRepository<MemberHasBadge, MemberHasBadgeId> {

}