package com.bear.whizzle.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.cors().disable()
                   .authorizeRequests(
                           requests -> requests.anyRequest().permitAll()
                   )
                   .httpBasic(Customizer.withDefaults())
                   .build();
    }

}
