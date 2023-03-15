package com.bear.whizzle.whisky.controller;

import com.bear.whizzle.whisky.service.WhiskyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WhiskyController {

    private final WhiskyService whiskyService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String test() {
        return whiskyService.test();
    }

    @GetMapping("/exception")
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String testException() {
        try {
            return whiskyService.testException();
        } catch (Exception e) {
            throw new RuntimeException("다른 예외로 래핑", e);
        }
    }

    @GetMapping("/sleep")
    @ResponseStatus(HttpStatus.OK)
    public String sleep() throws InterruptedException {
        return whiskyService.sleep();
    }


}
