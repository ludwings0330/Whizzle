package com.bear.whizzle.whisky.repository;

import com.bear.whizzle.domain.model.entity.Whisky;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface WhiskyCustomRepository {

    Map<Long, Whisky> findByIds(List<Long> ids);

    Optional<Whisky> findByIdAfterSleepTest(Long id);

}
