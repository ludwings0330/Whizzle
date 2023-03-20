package com.bear.whizzle.auth.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PrincipalDetails implements OAuth2User, UserDetails {

    private static final String EMAIL_PATTERN = "email";

    private Long memberId;
    private String email;
    private String nickname;
    private String provider;
    private boolean isNew;

    public static PrincipalDetails of(String provider, Map<String, Object> attributes) {
        switch (provider) {
            case "GOOGLE":
                return ofGoogle(attributes);
            case "NAVER":
                return ofNaver(attributes);
            case "KAKAO":
                return ofKakao(attributes);
            default:
                return null;
        }
    }

    private static PrincipalDetails ofKakao(Map<String, Object> attributes) {
        final Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        final Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        return PrincipalDetails.builder()
                               .provider("KAKAO")
                               .email((String) kakaoAccount.get(EMAIL_PATTERN))
                               .nickname((String) profile.get("nickname"))
                               .build();
    }

    private static PrincipalDetails ofNaver(Map<String, Object> attributes) {
        final Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return PrincipalDetails.builder()
                               .provider("NAVER")
                               .email((String) response.get(EMAIL_PATTERN))
                               .nickname((String) response.get("name"))
                               .build();
    }

    private static PrincipalDetails ofGoogle(Map<String, Object> attributes) {
        return PrincipalDetails.builder()
                               .provider("GOOGLE")
                               .email((String) attributes.get(EMAIL_PATTERN))
                               .nickname((String) attributes.get("name"))
                               .build();
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void join() {
        this.isNew = true;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.nickname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Collections.emptyMap();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getName() {
        return this.email;
    }

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

}
