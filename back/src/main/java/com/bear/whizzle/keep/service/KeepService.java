package com.bear.whizzle.keep.service;

public interface KeepService {

    void keepOrUnkeepWhisky(Long memberId, Long whiskyId);

    long getKeepCountByMemberId(Long memberId);

}
