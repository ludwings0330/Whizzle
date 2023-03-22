package com.bear.whizzle.badge.repository;

import com.bear.whizzle.domain.model.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
