package com.bear.whizzle.retrain.controller.dto;

import java.time.LocalDateTime;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@Builder
public class SavedModelRequestDto {

    @NotNull
    private LocalDateTime savedDateTime;

    @Min(0)
    @Max(1)
    private Float precision;

    @Min(0)
    @Max(1)
    private Float recall;

    @Min(0)
    @Max(1)
    private Float auc;

    @Min(0)
    @Max(1)
    private Float mrr;

}
