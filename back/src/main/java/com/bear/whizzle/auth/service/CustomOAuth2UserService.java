package com.bear.whizzle.auth.service;

import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.type.BadgeType;
import com.bear.whizzle.member.repository.MemberRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final BadgeService badgeService;
    private final DefaultOAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();

    // OAuth 2.0 로그인 성공시 loadUser 를 통해 확인
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.debug("사용자가 소셜 로그인 완료시 호출");
        log.debug("provider access token : {}", userRequest.getAccessToken().getTokenValue());

        // 1. nickname, email, provider 획득
        final OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // provider 획득
        final String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        log.debug("provider : {}", provider);

        // 필요한 정보 꺼내기
        final Map<String, Object> attributes = oAuth2User.getAttributes();
        log.debug("attributes : {}", attributes);

        //provider 마다 attributes 에서 필요한 정보를 꺼내는 방식이 달라 처리
        final PrincipalDetails details = PrincipalDetails.of(provider, attributes);

        // 2. 최초로 로그인 하는지 확인
        // 3. 최초 로그인 이면 회원 가입 + token 생성
        if (details != null) {
            memberRepository.findByEmailAndProvider(details.getEmail(), details.getProvider())
                            .ifPresentOrElse(member -> {
                                                 details.setMemberId(member.getId());
                                                 log.debug("이미 존재하는 회원 (member : {})", member);
                                             },
                                             () -> joinProcess(details));
        }

        return details;
    }

    public void joinProcess(PrincipalDetails details) {
        log.debug("신규 회원 가입 진행");

        details.join();

        final Member member = Member.builder()
                                    .provider(details.getProvider())
                                    .nickname(details.getNickname())
                                    .email(details.getEmail())
                                    .build();
        memberRepository.save(member);

        details.setMemberId(member.getId());

        badgeService.memberAchieveBadge(member.getId(), BadgeType.FIRST_PREFERENCE);

        log.debug("신규 회원 가입 완료({})", member);
    }

}
