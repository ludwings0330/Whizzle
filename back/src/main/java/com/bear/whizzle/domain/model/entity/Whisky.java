package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Image;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "whisky")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Whisky {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @Embedded
    private Image image;

    @NotNull
    @Column(updatable = false)
    private String category;

    @NotNull
    private String location;

    @Column(columnDefinition = "TINYINT")
    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @NotNull
    @Min(0)
    @Max(100)
    private Float abv;

    private String caskType;

    @NotNull
    @ColumnDefault("0")
    private Integer reviewCount = 0;

    @NotNull
    @ColumnDefault("0")
    private Float avgRating = 0f;

    @Embedded
    @NotNull
    private Flavor flavor;

    @Builder
    private Whisky(Long id, String name, Image image, String category, String location, Integer priceTier, Float abv, String caskType,
                   Flavor flavor) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.category = category;
        this.location = location;
        this.priceTier = priceTier;
        this.abv = abv;
        this.caskType = caskType;
        this.flavor = flavor;
    }

    public void changeImage(Image image) {
        this.image = image;
    }

    public void updateRatingByReviewSave(Review review) {
        float totalRating = (calculateRatingTotalSum() + review.getRating()) * 100;
        float updatedRating = totalRating / (this.reviewCount + 1);

        avgRating = Math.round(updatedRating) / 100f;
        reviewCount++;
    }

    public void updateRatingByReviewDelete(Review review) {
        float totalRating = (calculateRatingTotalSum() - review.getRating()) * 100;
        float updatedRating = totalRating / (this.reviewCount - 1);

        avgRating = Math.round(updatedRating) / 100f;
        reviewCount--;
    }

    private float calculateRatingTotalSum() {
        return this.avgRating * this.reviewCount;
    }

}
