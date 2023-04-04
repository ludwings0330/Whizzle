package com.bear.whizzle.preference.repository;

import com.bear.whizzle.domain.model.entity.Preference;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    Optional<Preference> findByMemberId(Long memberId);

    @Query("SELECT p FROM Preference p WHERE p.member.id IN :ids")
    List<Preference> findAllByMemberIds(@Param("ids") List<Long> ids);

}
