package com.bear.whizzle.keep.repository;

import java.util.List;
import java.util.Map;

public interface KeepCustomRepository {
    Map<Long, Boolean> whetherKeep(List<Long> whiskyIds, Long memberId);
}
