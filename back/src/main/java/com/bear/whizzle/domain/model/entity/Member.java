package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.domain.model.type.Image;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "member")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
//@DynamicUpdate // dirty checking 후에 변경사항이 있으면 모든 column 이 업데이트 되는데, 해당 어노테이션으로 변경분만 업데이트 할 수 있다.
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String nickname;

    @Email
    @NotNull
    private String email;

    @NotNull
    @NotBlank
    private String provider;

    @Embedded
    @NotNull
    private Image image;

    @NotNull
    @ColumnDefault("1")
    private Boolean isActive;

    @NotNull
    @Min(0)
    @Max(100)
    @ColumnDefault("40.0")
    private Float level;

    @CreatedDate
    @Column(columnDefinition = "DATETIME", updatable = false)
    @NotNull
    private LocalDateTime createdDateTime;

    @Builder
    private Member(String provider, String nickname, String email) {
        this.provider = provider;
        this.nickname = nickname;
        this.email = email;
    }

    @PrePersist
    protected void prePersist() {
        this.image = Image.getDefaultMemberImage();
        this.isActive = Boolean.TRUE;
        this.level = 40.0f;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateImage(Image image) {
        this.image = image;
    }

    public void levelUp(Action action) {
        this.level += action.getScore();
        this.level = Math.round(this.level * 100) / 100f;
    }

}
