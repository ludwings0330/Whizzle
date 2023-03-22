package com.bear.whizzle.memberlevellog.service;

import com.bear.whizzle.domain.model.type.Action;

public interface MemberLevelLogService {

    void increaseLevelByActivity(Long memberId, Action action);

    void clearLevelLog();

}
