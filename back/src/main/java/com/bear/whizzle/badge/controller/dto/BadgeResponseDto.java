package com.bear.whizzle.badge.controller.dto;

import java.net.URL;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BadgeResponseDto {

    private URL url;
    private String description;
    private LocalDateTime achieveDate;

}
