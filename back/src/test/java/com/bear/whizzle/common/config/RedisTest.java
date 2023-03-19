package com.bear.whizzle.common.config;

import java.time.Duration;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
class RedisTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    public void connectionTest() throws Exception {
        String key = "key";
        final ValueOperations valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, "token will be saved", Duration.ofSeconds(5));

        Assertions.assertThat("token will be saved").isEqualTo(valueOperations.get(key));

        Thread.sleep(5000);

        Assertions.assertThat(valueOperations.get(key)).isNull();
    }

}