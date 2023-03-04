package com.bear.whizzle.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder
public abstract class BaseTimeEntity {

    @CreatedDate
    @Column(name = "created_date_time", columnDefinition = "DATETIME", updatable = false)
    @NotNull
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    @Column(name = "modified_date_time", columnDefinition = "DATETIME")
    private LocalDateTime modifiedDateTime;

}
