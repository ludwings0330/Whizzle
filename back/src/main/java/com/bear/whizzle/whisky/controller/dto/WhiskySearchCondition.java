package com.bear.whizzle.whisky.controller.dto;

import java.util.Objects;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
@EqualsAndHashCode
public class WhiskySearchCondition {

    @NotNull
    private String word;

    private Long lastOffset;

    public String getWord() {
        return "%" + word + "%";
    }

    public Long getLastOffset() {
        return Objects.requireNonNullElse(this.lastOffset, 0L);
    }

}
