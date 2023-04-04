package com.bear.whizzle.whisky.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WhiskyServiceImpl implements WhiskyService {

    private final WhiskyRepository whiskyRepository;

    @Override
    public Whisky findWhisky(Long whiskyId) {
        return whiskyRepository.findById(whiskyId)
                               .orElseThrow(() -> new NotFoundException("위스키를 찾을 수 없습니다."));
    }

    @Override
    public Flavor getWhiskyFlavorById(long whiskyId) {
        return findWhisky(whiskyId).getFlavor();
    }

    @Override
    public Integer countWhiskies(String word) {
        return whiskyRepository.countByName("%" + word.toUpperCase() + "%");
    }

}
