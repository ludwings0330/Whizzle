package com.bear.whizzle.domain.model.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "keep")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Keep {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne
    @JoinColumn(name = "whiskey_id")
    @NotNull
    private Whiskey whiskey;

    @CreatedDate
    @Column(columnDefinition = "DATETIME", unique = true, updatable = false)
    @NotNull
    private LocalDateTime createdDateTime;

}
