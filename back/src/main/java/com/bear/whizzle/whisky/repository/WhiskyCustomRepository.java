package com.bear.whizzle.whisky.repository;

import com.bear.whizzle.domain.model.entity.Whisky;
import java.util.Optional;

public interface WhiskyCustomRepository {

    Optional<Whisky> findByIdAfterSleepTest(Long id);

}
