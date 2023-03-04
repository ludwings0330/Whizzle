package com.bear.whizzle.domain.model.type;

public enum Action {

    LOGIN(0.03f), // AccessToken 재발급 시 캐시 확인, 하루에 한 번만!
    REVIEW(0.05f), // 쓸 때마다 계속
    DIARY(0.05f), // 일일 최대 점수 0.05f
    KEEP(0.01f), // 일일 최대 점수 0.05f
    LIKE(0.01f); // 일일 최대 점수 0.05f

    private final Float score;

    Action(Float score) {
        this.score = score;
    }

    public Float score() {
        return this.score;
    }

}
