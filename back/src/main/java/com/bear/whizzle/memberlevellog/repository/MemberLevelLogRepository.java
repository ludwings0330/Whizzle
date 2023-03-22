package com.bear.whizzle.memberlevellog.repository;

import com.bear.whizzle.domain.model.entity.MemberLevelLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberLevelLogRepository extends JpaRepository<MemberLevelLog, Long> {

}
