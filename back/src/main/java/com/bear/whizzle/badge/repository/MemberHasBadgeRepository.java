package com.bear.whizzle.badge.repository;

import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.entity.MemberHasBadge;
import com.bear.whizzle.domain.model.type.id.MemberHasBadgeId;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberHasBadgeRepository extends JpaRepository<MemberHasBadge, MemberHasBadgeId> {

    @Query("select mhb.badge from MemberHasBadge mhb where mhb.member.id = :memberId and mhb.badge.id = :badgeId")
    Optional<Badge> findByMemberIdAndBadgeId(@Param("memberId") Long memberId, @Param("badgeId") Long badgeId);

}