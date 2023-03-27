package com.bear.whizzle.common.config;

import com.bear.whizzle.auth.service.CustomOAuth2UserService;
import com.bear.whizzle.common.filter.JwtAuthenticationFilter;
import com.bear.whizzle.common.handler.CustomAuthenticationFailureHandler;
import com.bear.whizzle.common.handler.CustomAuthenticationSuccessHandler;
import com.bear.whizzle.common.handler.JwtAccessDeniedHandler;
import com.bear.whizzle.common.handler.JwtAuthenticationEntryPoint;
import com.bear.whizzle.common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CORS support
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

        // Disable CSRF protection
        http.csrf().disable();

        http.addFilterAfter(new JwtAuthenticationFilter(jwtUtil), LogoutFilter.class);

        http.exceptionHandling(handle ->
                                       handle
                                               .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                                               .accessDeniedHandler(jwtAccessDeniedHandler));

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.oauth2Login(oauth2 ->
                                 oauth2
                                         .userInfoEndpoint()
                                         .userService(customOAuth2UserService)
                                         .and()
                                         .successHandler(customAuthenticationSuccessHandler)
                                         .failureHandler(customAuthenticationFailureHandler));

        http.authorizeRequests(request ->
                                       request
                                               .antMatchers("/login/**").permitAll()
                                               .antMatchers("/api/**/any").permitAll()
                                               .anyRequest().authenticated());

        return http.build();
    }

}
