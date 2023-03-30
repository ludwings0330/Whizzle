package com.bear.whizzle.memberlevellog.service;

import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.MemberLevelLog;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.memberlevellog.repository.MemberLevelLogRedisRepository;
import com.bear.whizzle.memberlevellog.repository.MemberLevelLogRepository;
import com.bear.whizzle.memberlevellog.repository.dto.LevelLogCounter;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberLevelLogServiceImpl implements MemberLevelLogService {

    private final MemberRepository memberRepository;
    private final MemberLevelLogRepository memberLevelLogRepository;
    private final BadgeService badgeService;
    private final MemberLevelLogRedisRepository memberLevelLogRedisRepository;

    @Override
    @Transactional
    public void increaseLevelByActivity(Long memberId, Action action) {
        Member member = memberRepository.findById(memberId)
                                        .orElseThrow(() -> new NotFoundException("해당 유저를 찾을 수 없습니다."));

        final MemberLevelLog log = MemberLevelLog.builder()
                                                 .level(member.getLevel())
                                                 .member(member)
                                                 .action(action)
                                                 .build();

        memberLevelLogRepository.save(log);

        if (!isDailyLevelLimitReached(memberId, action)) {
            member.levelUp(action);
            badgeService.awardBadgeOnLevelReached(memberId);
        }
    }

    private boolean isDailyLevelLimitReached(Long memberId, Action action) {
        LevelLogCounter counter = (LevelLogCounter) memberLevelLogRedisRepository.countByMemberIdAndAction(memberId)
                                                                                 .orElseGet(LevelLogCounter::new);

        int count = 0;
        switch (action) {
            case KEEP:
                counter.keepWhisky();
                count = counter.getKeepCount();
                break;
            case LIKE:
                counter.likeReview();
                count = counter.getLikeCount();
                break;
            case DIARY:
                counter.writeDiary();
                count = counter.getDiaryCount();
                break;
            case LOGIN:
                counter.login();
                count = counter.getLoginCount();
                break;
            case REVIEW:
                counter.writeReview();
                count = counter.getReviewCount();
                break;
        }

        memberLevelLogRedisRepository.save(memberId, counter);

        return count > action.getLimit();
    }

    @Override
    @Scheduled(cron = "0 0 0 * * *") // 매일 자정 실행
    public void clearLevelLog() {
        memberLevelLogRedisRepository.clearLevelLogCounter();
    }

}
