package com.bear.whizzle.keep.service;

import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.keep.repository.KeepCustomRepository;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeepServiceImpl implements KeepService {

    private final KeepRepository keepRepository;
    private final KeepCustomRepository keepCustomRepository;
    private final MemberRepository memberRepository;
    private final WhiskyRepository whiskyRepository;

    @Override
    public Boolean isKeptWhisky(Long memberId, Long whiskyId) {
        return keepCustomRepository.existByMemberIdAndWhiskyId(memberId, whiskyId);
    }

    @Override
    @Transactional
    public boolean toggleKeepForWhisky(Long memberId, Long whiskyId) {
        Member member = memberRepository.getReferenceById(memberId);
        Whisky whisky = whiskyRepository.getReferenceById(whiskyId);

        final Optional<Keep> keepOptional = keepRepository.findByMemberIdAndWhiskyId(memberId, whiskyId);
        if (keepOptional.isPresent()) {
            keepRepository.delete(keepOptional.get());
            return false;
        } else {
            keepRepository.save(Keep.builder()
                                    .member(member)
                                    .whisky(whisky).build());
            return true;
        }
    }

    @Override
    public long getKeepCountByMemberId(Long memberId) {
        return keepRepository.countByMemberId(memberId);
    }

}
