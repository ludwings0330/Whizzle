package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.DrinkId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
import lombok.ToString;

@Entity
@Table(name = "drink")
@IdClass(DrinkId.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
public class Drink {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", updatable = false)
    private Diary diary;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "whiskey_id", updatable = false)
    private Whiskey whiskey;

    public String toString() {
        return "Drink [diary.id: " + diary.getId() + ", whiskey.id: " + whiskey.getId() + "]";
    }

}
