package com.bear.whizzle.domain.model.type;

public enum Action {

    LOGIN(0.03f, 1), // AccessToken 재발급 시 캐시 확인, 하루에 한 번만!
    REVIEW(0.05f, Integer.MAX_VALUE), // 쓸 때마다 계속
    DIARY(0.05f, 1), // 일일 최대 점수 0.05f
    KEEP(0.01f, 5), // 일일 최대 점수 0.05f
    LIKE(0.01f, 5); // 일일 최대 점수 0.05f

    private final Float score;
    private final Integer limit;

    Action(Float score, Integer limit) {
        this.score = score;
        this.limit = limit;
    }

    public Float getScore() {
        return this.score;
    }

    public Integer getLimit() {
        return this.limit;
    }
}
