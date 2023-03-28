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
@Getter
@ToString(callSuper = true)
public class Review extends BaseTimeEntity {

    @OneToMany(
            mappedBy = "review",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
//    @Size(max = 5) // 삭제한 이미지들을 유지하기때문에 5개 이상이 가능하다.
    @ToString.Exclude
    private final List<ReviewImage> images = new ArrayList<>();
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
    private Integer likeCount;
    @NotNull
    @ColumnDefault("0")
    private Boolean isDeleted;

    @Builder
    public Review(Member member, Whisky whisky, Float rating, String content) {
        super();
        this.member = member;
        this.whisky = whisky;
        this.rating = rating;
        this.content = content;
    }

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

    public boolean isDeleted() {
        return Boolean.TRUE.equals(this.isDeleted);
    }

}
