package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.KeepId;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "keep")
@IdClass(KeepId.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
public class Keep {

    @Id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Id
    @ManyToOne
    @JoinColumn(name = "whiskey_id")
    private Whiskey whiskey;

    @CreatedDate
    @Column(columnDefinition = "DATETIME", unique = true, updatable = false)
    @NotNull
    private LocalDateTime createdDateTime;

    public String toString() {
        return "Keep [member.id: " + member.getId() + ", whiskey.id: " + whiskey.getId() + "]";
    }

}
