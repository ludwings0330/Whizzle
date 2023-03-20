package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.badge.repository.BadgeRepository;
import com.bear.whizzle.badge.repository.projection.BadgeProjectionRepository;
import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.MemberHasBadge;
import com.bear.whizzle.domain.model.entity.MemberHasBadgeRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BadgeServiceImpl implements BadgeService {

    private final BadgeProjectionRepository badgeProjectionRepository;

    private final BadgeRepository badgeRepository;
    private final MemberRepository memberRepository;
    private final MemberHasBadgeRepository memberHasBadgeRepository;

    @Override
    public List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId) {
        return badgeProjectionRepository.findAllBadgesByMemberId(memberId);
    }

    @Override
    @Transactional
    public void memberAchieveBadge(Long memberId, Long badgeId) {
        final Member member = memberRepository.getReferenceById(memberId);
        final Badge badge = badgeRepository.getReferenceById(badgeId);

        final MemberHasBadge achieve = MemberHasBadge.builder()
                                                     .member(member)
                                                     .badge(badge)
                                                     .build();
        // 이미 획득 여부 확인하는 내용 추가?
        memberHasBadgeRepository.save(achieve);
    }

}
