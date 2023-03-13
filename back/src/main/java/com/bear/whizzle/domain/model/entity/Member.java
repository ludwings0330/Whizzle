package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Image;
import javax.persistence.Embedded;
import javax.persistence.Entity;
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

@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
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

    @Builder
    private Member(Long id, String nickname, String email) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
    }

    @PrePersist
    protected void prePersist() {
        this.image = Image.getDefaultMemberImage();
        this.isActive = Boolean.TRUE;
        this.level = 40.0f;
    }

}
