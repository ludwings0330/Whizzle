package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.domain.model.type.Image;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "review_image")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    @NotNull
    @ToString.Exclude
    private Review review;

    @Embedded
    @NotNull
    private Image image;

    @Column(columnDefinition = "TINYINT")
    @NotNull
    private Integer imageOrder;

    @NotNull
    @ColumnDefault("0")
    private Boolean isDeleted = Boolean.FALSE;

    @Builder
    private ReviewImage(Review review, Image image, Integer imageOrder) {
        this.review = review;
        this.image = image;
        this.imageOrder = imageOrder;
    }

    public void setReview(Review review) {
        if (this.review != null) {
            this.review.getImages().remove(this);
        }

        this.review = review;
        review.getImages().add(this);
    }

    public void markDelete() {
        this.isDeleted = true;
    }

}
