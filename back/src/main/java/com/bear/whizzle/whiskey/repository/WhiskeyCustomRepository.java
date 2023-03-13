package com.bear.whizzle.whiskey.repository;

import com.bear.whizzle.domain.model.entity.Whiskey;
import java.util.Optional;

public interface WhiskeyCustomRepository {

    Optional<Whiskey> findByIdAfterSleepTest(Long id);

}
