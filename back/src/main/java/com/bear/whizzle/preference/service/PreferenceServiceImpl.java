package com.bear.whizzle.preference.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PreferenceServiceImpl implements PreferenceService {

    private final PreferenceRepository preferenceRepository;

    @Override
    public Preference findByMemberId(Long memberId) {
        return preferenceRepository.findById(memberId)
                                   .orElseThrow(() -> new NotFoundException("선호 정보를 찾을 수 없습니다."));
    }

}
