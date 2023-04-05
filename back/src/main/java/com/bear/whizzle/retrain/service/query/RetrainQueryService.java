package com.bear.whizzle.retrain.service.query;

import com.bear.whizzle.retrain.handler.dto.MemberData;
import java.util.List;

public interface RetrainQueryService {

    MemberData reactiveLearnData(List<Long> memberId);

}
