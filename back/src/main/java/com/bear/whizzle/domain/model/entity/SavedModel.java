package com.bear.whizzle.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "saved_model")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class SavedModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "saved_date_time", columnDefinition = "DATETIME", updatable = false)
    @NotNull
    private LocalDateTime savedDateTime;

    @Column(name = "precision_k")
    @Min(0)
    @Max(1)
    private Float precisionK;

    @Column(name = "recall_k")
    @Min(0)
    @Max(1)
    private Float recallK;

    @Min(0)
    @Max(1)
    private Float auc;

    @Min(0)
    @Max(1)
    private Float mrr;

    @NotNull
    @Column(name = "is_used")
    @ColumnDefault("1")
    @Builder.Default
    private Boolean isUsed = Boolean.TRUE;


}
