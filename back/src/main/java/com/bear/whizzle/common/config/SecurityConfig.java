package com.bear.whizzle.common.config;

import com.bear.whizzle.auth.service.CustomOAuth2UserService;
import com.bear.whizzle.common.handler.CustomAuthenticationFailureHandler;
import com.bear.whizzle.common.handler.CustomAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.oauth2Login(oauth2 ->
                                 oauth2
                                         .userInfoEndpoint()
                                         .userService(customOAuth2UserService)
                                         .and()
                                         .successHandler(customAuthenticationSuccessHandler)
                                         .failureHandler(customAuthenticationFailureHandler));

        http.authorizeRequests(request ->
                                       request.antMatchers("/login/**", "/redirect/**")
                                              .permitAll()
                                              .anyRequest()
                                              .authenticated());

        http.csrf().disable();

        return http.build();
    }

}
