package com.bear.whizzle.whisky.service;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WhiskyServiceImpl implements WhiskyService {

    private final WhiskyRepository whiskyRepository;

    @Performance
    public String test() {
        whiskyRepository.findByIdAfterSleepTest(1L);
        return "Testing Service...";
    }

    @Override
    public Flavor getWhiskyFlavorById(long whiskyId) {
        Whisky whisky = whiskyRepository.findById(whiskyId)
                                        .orElseThrow(() -> new NotFoundException("찾을 수 없는 위스키입니다."));

        return whisky.getFlavor();
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
