package com.bear.whizzle.whiskey.controller;

import com.bear.whizzle.whiskey.service.WhiskeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WhiskeyController {

    private final WhiskeyService whiskeyService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String test() {
        return whiskeyService.test();
    }

    @GetMapping("/exception")
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String testException() {
        try {
            return whiskeyService.testException();
        } catch (Exception e) {
            throw new RuntimeException("다른 예외로 래핑", e);
        }
    }

    @GetMapping("/sleep")
    @ResponseStatus(HttpStatus.OK)
    public String sleep() throws InterruptedException {
        return whiskeyService.sleep();
    }


}
