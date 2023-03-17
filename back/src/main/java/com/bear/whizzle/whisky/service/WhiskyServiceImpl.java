package com.bear.whizzle.whisky.service;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WhiskyServiceImpl implements WhiskyService {

    private final WhiskyRepository memberRepository;

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
