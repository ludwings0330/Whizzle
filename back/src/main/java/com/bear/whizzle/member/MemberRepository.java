package com.bear.whizzle.member;

import com.bear.whizzle.domain.model.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndProvider(String email, String provider);

}
