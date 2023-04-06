package com.bear.whizzle.domain.model.type;

public enum BadgeType {
    FIRST_DIARY(5L),
    FIFTH_DIARY(6L),
    TWENTIETH_DIARY(7L),
    FIRST_REVIEW(8L),
    FIFTH_REVIEW(9L),
    TWENTIETH_REVIEW(10L),
    FIRST_KEEP(3L),
    TENTH_KEEP(4L),
    FIRST_PREFERENCE(1L),
    FIRST_DAILY(2L),
    LEVEL_50(11L),
    LEVEL_60(12L);

    private final Long id;

    BadgeType(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
