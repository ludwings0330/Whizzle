package com.bear.whizzle.domain.model.entity;

import com.bear.whizzle.review.controller.dto.ReviewUpdateRequestDto;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(
        name = "review",
        indexes = {
                @Index(columnList = "likeCount"),
                @Index(columnList = "created_date_time")
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString(callSuper = true)
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    @ToString.Exclude
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "whisky_id")
    @NotNull
    @ToString.Exclude
    private Whisky whisky;

    @NotNull
    @Min(0)
    @Max(5)
    private Float rating;

    @Lob
    private String content;

    @NotNull
    @ColumnDefault("0")
    @Builder.Default
    private Integer likeCount = 0;

    @NotNull
    @ColumnDefault("0")
    @Builder.Default
    private Boolean isDeleted = Boolean.FALSE;

    @OneToMany(
            mappedBy = "review",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @ToString.Exclude
    private final List<ReviewImage> images = new ArrayList<>();

    @PrePersist
    private void prePersist() {
        this.likeCount = 0;
        this.isDeleted = Boolean.FALSE;
    }

    public void update(ReviewUpdateRequestDto data) {
        if (data.getRating() != null) {
            this.rating = data.getRating();
        }

        if (data.getContent() != null) {
            this.content = data.getContent();
        }
    }

    public void markDeleted() {
        this.isDeleted = true;
    }

    public void countUpLike() {
        this.likeCount++;
    }

    public void countDownLike() {
        this.likeCount--;
    }

}
