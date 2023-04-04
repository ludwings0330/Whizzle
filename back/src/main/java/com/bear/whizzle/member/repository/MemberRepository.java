package com.bear.whizzle.member.repository;

import com.bear.whizzle.domain.model.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndProvider(String email, String provider);

    @Query("SELECT m FROM Member m WHERE m.id = :memberId AND m.createdDateTime <= (SELECT MAX(s.savedDateTime) FROM SavedModel s WHERE s.isUsed = TRUE)")
    Optional<Member> findByIdAndCreatedDateTimeBefore(@Param("memberId") Long memberId);

    @Query("SELECT m.id FROM Member m WHERE m.createdDateTime >= ( SELECT MAX(s.savedDateTime) FROM SavedModel s WHERE s.isUsed = TRUE)")
    List<Long> findIdsByCreatedDateTimeAfter();

}
