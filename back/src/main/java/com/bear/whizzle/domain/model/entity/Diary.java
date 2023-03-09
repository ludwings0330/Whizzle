package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "diary",
        uniqueConstraints = @UniqueConstraint(columnNames = { "member_id", "created_date_time" })
)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder
public class Diary extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", updatable = false)
    @NotNull
    private Member member;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Emotion emotion;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DrinkLevel drinkLevel;

    @Size(max = 255)
    private String content;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Diary)) {
            return false;
        }

        Diary that = (Diary) o;
        return Objects.equals(this.getCreatedDateTime(), that.getCreatedDateTime())
                && Objects.equals(this.getMember().getId(), that.getMember().getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getCreatedDateTime(), this.getId());
    }

}
