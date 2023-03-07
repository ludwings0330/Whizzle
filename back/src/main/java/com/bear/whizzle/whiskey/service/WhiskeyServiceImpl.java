package com.bear.whizzle.whiskey.service;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.whiskey.repository.WhiskeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WhiskeyServiceImpl implements WhiskeyService {

    private final WhiskeyRepository memberRepository;

    @Performance
    public String test() {
        memberRepository.findByIdAfterSleepTest(1L);
        return "Testing Service...";
    }

    @Performance
    public String sleep() {
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return "3초 수면";
    }

    public String testException() {
        throw new IllegalArgumentException("예외야 터져라!!");
    }

}
