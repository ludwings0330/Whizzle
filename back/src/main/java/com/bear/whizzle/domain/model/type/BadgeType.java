package com.bear.whizzle.domain.model.type;

public enum BadgeType {
    FIRST_DIARY(1L),
    FIFTH_DIARY(2L),
    TWENTIETH_DIARY(3L),
    FIRST_REVIEW(4L),
    FIFTH_REVIEW(5L),
    TWENTIETH_REVIEW(6L),
    FIRST_KEEP(7L),
    TENTH_KEEP(8L),
    FIRST_PREFERENCE(9L),
    FIRST_DAILY(10L),
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
