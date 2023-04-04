package com.bear.whizzle.whisky.repository;

import com.bear.whizzle.domain.model.entity.Whisky;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WhiskyRepository extends JpaRepository<Whisky, Long> {

    @Query("SELECT COUNT(w.id) FROM Whisky w WHERE UPPER(w.name) LIKE :word")
    Integer countByName(String word);

}
