package com.bear.whizzle.common.config;

import com.bear.whizzle.domain.model.type.CacheType;
import com.github.benmanes.caffeine.cache.Caffeine;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        List<CaffeineCache> caches = Arrays.stream(CacheType.values())
                                           .map(cache -> new CaffeineCache(cache.getCacheName(), Caffeine.newBuilder()
                                                                                                         .recordStats()
                                                                                                         .build())
                                           )
                                           .collect(Collectors.toList());
        SimpleCacheManager simpleCacheManager = new SimpleCacheManager();
        simpleCacheManager.setCaches(caches);
        return simpleCacheManager;
    }

}