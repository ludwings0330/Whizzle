package com.bear.whizzle.keep.service;

public interface KeepService {

    Boolean isKeptWhisky(Long memberId, Long whiskyId);

    boolean toggleKeepForWhisky(Long memberId, Long whiskyId);

    long getKeepCountByMemberId(Long memberId);

}
