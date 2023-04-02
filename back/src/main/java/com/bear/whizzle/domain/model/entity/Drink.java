package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.id.DrinkId;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "drink")
@IdClass(DrinkId.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Drink {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", updatable = false)
    private Diary diary;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "whisky_id", updatable = false)
    private Whisky whisky;

    @Column(columnDefinition = "TINYINT")
    @NotNull
    private Integer drinkOrder;

    @NotNull
    @ColumnDefault("0")
    private Boolean isDeleted = Boolean.FALSE;

    @Builder
    public Drink(Diary diary, Whisky whisky, Integer drinkOrder) {
        this.diary = diary;
        this.whisky = whisky;
        this.drinkOrder = drinkOrder;
    }

    public void markDeleted() {
        this.isDeleted = Boolean.TRUE;
    }

    public void markNotDeleted() {
        this.isDeleted = Boolean.FALSE;
    }

    public void writeDiary(Diary diary) {
        this.diary = diary;
        this.drinkOrder = diary.getDrinks().size() - 1;
    }

    public String toString() {
        return "Drink [diary.id: " + diary.getId() + ", whisky.id: " + whisky.getId() + "]";
    }

}
