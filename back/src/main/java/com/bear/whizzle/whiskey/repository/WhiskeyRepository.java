package com.bear.whizzle.whiskey.repository;

import com.bear.whizzle.domain.model.entity.Whiskey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhiskeyRepository extends JpaRepository<Whiskey, Long>, WhiskeyCustomRepository {


}
