package com.bear.whizzle.whisky;

import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class LoadFlavorSummaryTest {

    @Autowired
    private WhiskyQueryService whiskyQueryService;

    @Test
    @DisplayName("Local Cache 적용 테스트")
    void localCacheInitTest() {
        log.debug("===================================================================================");
        FlavorSummary flavorSummary = whiskyQueryService.findFlavorMinMax();
        log.debug(flavorSummary.toString());
        log.debug("===================================================================================");
        Map<Long, Integer> longIntegerMap = whiskyQueryService.findWhiskyPriceTier();
        log.debug(longIntegerMap.toString());
        log.debug("===================================================================================");
        FlavorSummary flavorSummary2 = whiskyQueryService.findFlavorMinMax();
        log.debug(flavorSummary2.toString());
        log.debug("===================================================================================");
        Map<Long, Integer> longIntegerMap2 = whiskyQueryService.findWhiskyPriceTier();
        log.debug(longIntegerMap2.toString());
        log.debug("===================================================================================");
        FlavorSummary flavorSummary3 = whiskyQueryService.findFlavorMinMax();
        log.debug(flavorSummary3.toString());
        log.debug("===================================================================================");
        Map<Long, Integer> longIntegerMap4 = whiskyQueryService.findWhiskyPriceTier();
        log.debug(longIntegerMap4.toString());
        log.debug("===================================================================================");
        FlavorSummary flavorSummary5 = whiskyQueryService.findFlavorMinMax();
        log.debug(flavorSummary5.toString());
        log.debug("===================================================================================");
        Map<Long, Integer> longIntegerMap5 = whiskyQueryService.findWhiskyPriceTier();
        log.debug(longIntegerMap5.toString());

    }

}
