package com.bear.whizzle.preference.repository;

import com.bear.whizzle.domain.model.entity.Preference;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    Optional<Preference> findByMemberId(Long memberId);

}
