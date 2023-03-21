package com.bear.whizzle.keep.service;

import com.bear.whizzle.keep.repository.KeepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeepServiceImpl implements KeepService {

    private final KeepRepository keepRepository;

    @Override
    public long getKeepCountByMemberId(Long memberId) {
        return keepRepository.countByMemberId(memberId);
    }

}
