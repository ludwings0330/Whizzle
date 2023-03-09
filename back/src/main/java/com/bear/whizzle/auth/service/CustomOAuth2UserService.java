package com.bear.whizzle.auth.service;

import com.bear.whizzle.auth.repository.TokenRepository;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Token;
import com.bear.whizzle.domain.model.type.File;
import com.bear.whizzle.member.MemberRepository;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;

    // OAuth 2.0 로그인 성공시 loadUser 를 통해 확인
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("사용자가 소셜 로그인 완료시 호출");
        log.info("provider access token : {}", userRequest.getAccessToken().getTokenValue());

        // 1. nickname, email, provider 획득
        final OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
        final OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        // provider 획득
        final String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        log.info("provider : {}", provider);

        // 필요한 정보 꺼내기
        final Map<String, Object> attributes = oAuth2User.getAttributes();
        log.info("attributes : {}", attributes);

        //provider 마다 attributes 에서 필요한 정보를 꺼내는 방식이 달라 처리
        final PrincipalDetails details = PrincipalDetails.of(provider, attributes);

        // 2. 최초로 로그인 하는지 확인
        // 3. 최초 로그인 이면 회원 가입 + token 생성
        if (details != null) {
            memberRepository.findByEmailAndProvider(details.getEmail(), details.getProvider())
                            .ifPresentOrElse(id -> log.info("이미 존재하는 회원 (id : {})", id),
                                             () -> joinProcess(details));
        }

        return details;
    }

    protected void joinProcess(PrincipalDetails details) {
        log.info("신규 회원 가입 진행");
        final File file = File.builder()
                              .savedName(UUID.randomUUID().toString())
                              .originName("originName")
                              .build();

        final Member member = Member.builder().provider(details.getProvider())
                                    .nickname(details.getNickname())
                                    .email(details.getEmail())
                                    .image(file)
                                    .level(40f)
                                    .build();
        memberRepository.save(member);

        final Token token = Token.builder()
                                 .memberId(member.getId())
                                 .build();
        tokenRepository.save(token);

        log.info("신규 회원 가입 완료({}, {})", member, token);
    }

}
