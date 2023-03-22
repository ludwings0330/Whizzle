package com.bear.whizzle.memberlevellog.repository;

import com.bear.whizzle.memberlevellog.repository.dto.LevelLogCounter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberLevelLogRedisRepository {

    private static final String MEMBER_LOG_COUNTER_KEY = "MEMBER_LOG_COUNTER";
    private final RedisTemplate<String, Object> redisTemplate;

    public Optional<Object> countByMemberIdAndAction(Long memberId) {
        return Optional.ofNullable(redisTemplate.opsForHash()
                                                .get(MEMBER_LOG_COUNTER_KEY, memberId));
    }

    public void save(Long memberId, LevelLogCounter counter) {
        redisTemplate.opsForHash().put(MEMBER_LOG_COUNTER_KEY, memberId, counter);
    }

    public void clearLevelLogCounter() {
        redisTemplate.delete(MEMBER_LOG_COUNTER_KEY);
    }

}
