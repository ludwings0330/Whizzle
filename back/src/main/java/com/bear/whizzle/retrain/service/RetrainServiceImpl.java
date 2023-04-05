package com.bear.whizzle.retrain.service;

import com.bear.whizzle.retrain.controller.dto.SavedModelRequestDto;
import com.bear.whizzle.savedmodel.SavedModelMapper;
import com.bear.whizzle.savedmodel.repository.SavedModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RetrainServiceImpl implements RetrainService {

    private final SavedModelRepository savedModelRepository;

    @Override
    @Transactional
    public void saveRetrainModel(SavedModelRequestDto savedModelRequestDto) {
        savedModelRepository.save(SavedModelMapper.toSavedModel(savedModelRequestDto));
    }

}
