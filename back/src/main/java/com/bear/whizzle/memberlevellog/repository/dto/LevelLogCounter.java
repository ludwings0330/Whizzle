package com.bear.whizzle.memberlevellog.repository.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LevelLogCounter {

    private int loginCount = 0;
    private int reviewCount = 0;
    private int likeCount = 0;
    private int keepCount = 0;
    private int diaryCount = 0;

    public void login() {
        this.loginCount++;
    }

    public void writeReview() {
        this.reviewCount++;
    }

    public void likeReview() {
        this.likeCount++;
    }

    public void keepWhisky() {
        this.keepCount++;
    }

    public void writeDiary() {
        this.diaryCount++;
    }

}
