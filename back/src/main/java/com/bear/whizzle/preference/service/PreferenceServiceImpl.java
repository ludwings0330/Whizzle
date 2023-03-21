package com.bear.whizzle.preference.service;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.domain.model.type.BadgeType;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceRequestDto;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.whisky.service.WhiskyService;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PreferenceServiceImpl implements PreferenceService {

    private final PreferenceRepository preferenceRepository;

    private final WhiskyService whiskyService;
    private final MemberRepository memberRepository;
    private final BadgeService badgeService;

    @Override
    @Transactional
    public void updateMemberPreference(PrincipalDetails user, MemberPreferenceRequestDto preference) {
        if (!isBeginner(preference)) {
            List<Long> whiskies = preference.getWhiskies();

            if (whiskies == null) {
                throw new IllegalArgumentException("flavor, whiskies 둘다 null 일 수 없습니다.");
            }

            Flavor flavor = selectRandomFlavorInWhiskies(whiskies);
            preference.setFlavor(flavor);
        }

        // 기존 Preference 가 있을 수 도, 없을 수도 있다.
        preferenceRepository.findById(user.getMemberId())
                            .ifPresentOrElse(p -> p.updatePreference(preference)
                                    , () -> saveFirstPreference(user, preference));

    }

    private void saveFirstPreference(PrincipalDetails user, MemberPreferenceRequestDto preference) {
        Member member = memberRepository.findById(user.getMemberId())
                                        .orElseThrow(() -> new NotFoundException("찾을 수 없는 유저입니다."));

        final Preference created = Preference.builder()
                                             .member(member)
                                             .build();

        created.updatePreference(preference);

        badgeService.memberAchieveBadge(user.getMemberId(), BadgeType.FIRST_PREFERENCE);

        preferenceRepository.save(created);
    }

    @Override
    public Preference findByMemberId(Long memberId) {
        return preferenceRepository.findById(memberId)
                                   .orElseThrow(() -> new NotFoundException("선호 정보를 찾을 수 없습니다."));
    }


    private boolean isBeginner(MemberPreferenceRequestDto preference) {
        return preference.getFlavor() != null;
    }

    private Flavor selectRandomFlavorInWhiskies(List<Long> whiskies) {
        final Long whiskyId = whiskies.get(new Random().nextInt() % whiskies.size());

        return whiskyService.getWhiskyFlavorById(whiskyId);
    }

}
