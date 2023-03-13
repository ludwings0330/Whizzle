package com.bear.whizzle.domain.model.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
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
    @JoinColumn(name = "whiskey_id")
    @NotNull
    @ToString.Exclude
    private Whiskey whiskey;

    @NotNull
    @Min(0)
    @Max(5)
    private Float rating;

    @Lob
    private String content;

    @NotNull
    @ColumnDefault("0")
    private Integer likeCount;

    @OneToMany(
            mappedBy = "review",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @Size(max = 5)
    @ToString.Exclude
    private final List<ReviewImage> images = new ArrayList<>();

    @Builder
    public Review(Member member, Whiskey whiskey, Float rating, String content) {
        super();
        this.member = member;
        this.whiskey = whiskey;
        this.rating = rating;
        this.content = content;
    }

    @PrePersist
    private void prePersist() {
        this.likeCount = 0;
    }

}
