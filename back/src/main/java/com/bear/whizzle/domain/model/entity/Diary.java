package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(
        name = "diary",
        uniqueConstraints = @UniqueConstraint(columnNames = { "member_id", "date" })
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", updatable = false)
    @NotNull
    @ToString.Exclude
    private Member member;

    @Column(columnDefinition = "DATE", updatable = false)
    @NotNull
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Emotion emotion;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DrinkLevel drinkLevel;

    @Size(max = 255)
    private String content;

    @NotNull
    @ColumnDefault("0")
    @Builder.Default
    private Boolean isDeleted = Boolean.FALSE;

    @OneToMany(
            mappedBy = "diary",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @OrderBy("drinkOrder ASC")
    @ToString.Exclude
    private final List<Drink> drinks = new ArrayList<>();

    public void update(Diary diary) {
        this.emotion = diary.getEmotion();
        this.drinkLevel = diary.getDrinkLevel();
        this.content = diary.getContent();
        this.isDeleted = Boolean.FALSE;
    }

    public void markDeleted() {
        this.isDeleted = Boolean.TRUE;
        for (Drink drink : drinks) {
            drink.markDeleted();
        }
    }

    public void addDrink(Drink drink) {
        this.drinks.add(drink);
        drink.writeDiary(this);
    }

    public void deleteDrink(Integer index) {
        this.drinks.get(index).markDeleted();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof Diary)) {
            return false;
        }

        Diary that = (Diary) o;
        return Objects.equals(this.getDate(), that.getDate())
                && Objects.equals(this.getMember().getId(), that.getMember().getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getDate(), this.getMember().getId());
    }

}
