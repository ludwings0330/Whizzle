package com.bear.whizzle.keep.service;

import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeepServiceImpl implements KeepService {

    private final KeepRepository keepRepository;
    private final MemberRepository memberRepository;
    private final WhiskyRepository whiskyRepository;

    @Override
    @Transactional
    public void keepOrUnkeepWhisky(Long memberId, Long whiskyId) {
        Member member = memberRepository.getReferenceById(memberId);
        Whisky whisky = whiskyRepository.getReferenceById(whiskyId);

        keepRepository.findByMemberIdAndWhiskyId(memberId, whiskyId)
                      .ifPresentOrElse(
                              keepRepository::delete,
                              () -> keepRepository.save(Keep.builder()
                                                            .member(member)
                                                            .whisky(whisky)
                                                            .build())
                      );
    }

    @Override
    public long getKeepCountByMemberId(Long memberId) {
        return keepRepository.countByMemberId(memberId);
    }

}
