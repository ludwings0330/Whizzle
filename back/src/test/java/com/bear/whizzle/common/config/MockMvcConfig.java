package com.bear.whizzle.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@Configuration
public class MockMvcConfig {

    @Autowired
    private WebApplicationContext context;

    @Bean
    public MockMvc mockMvc() {
        return MockMvcBuilders.webAppContextSetup(context)
                              .apply(SecurityMockMvcConfigurers.springSecurity())
                              .alwaysDo(MockMvcResultHandlers.print())
                              .build();
    }

}
