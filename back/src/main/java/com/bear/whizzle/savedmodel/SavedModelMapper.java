package com.bear.whizzle.savedmodel;

import com.bear.whizzle.domain.model.entity.SavedModel;
import com.bear.whizzle.retrain.controller.dto.SavedModelRequestDto;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)

public class SavedModelMapper {

    public static SavedModel toSavedModel(SavedModelRequestDto savedModelRequestDto) {
        return SavedModel.builder()
                         .auc(savedModelRequestDto.getAuc())
                         .mrr(savedModelRequestDto.getMrr())
                         .savedDateTime(savedModelRequestDto.getSavedDateTime())
                         .precision(savedModelRequestDto.getPrecision())
                         .recall(savedModelRequestDto.getRecall())
                         .build();
    }

}
