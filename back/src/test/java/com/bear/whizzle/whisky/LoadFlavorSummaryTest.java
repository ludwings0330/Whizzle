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
        log.info("===================================================================================");
        FlavorSummary flavorSummary = whiskyQueryService.findFlavorMinMax();
        log.info(flavorSummary.toString());
        log.info("===================================================================================");
        Map<Long, Integer> longIntegerMap = whiskyQueryService.findWhiskyPriceTier();
        log.info(longIntegerMap.toString());
        log.info("===================================================================================");
        FlavorSummary flavorSummary2 = whiskyQueryService.findFlavorMinMax();
        log.info(flavorSummary2.toString());
        log.info("===================================================================================");
        Map<Long, Integer> longIntegerMap2 = whiskyQueryService.findWhiskyPriceTier();
        log.info(longIntegerMap2.toString());
        log.info("===================================================================================");
        FlavorSummary flavorSummary3 = whiskyQueryService.findFlavorMinMax();
        log.info(flavorSummary3.toString());
        log.info("===================================================================================");
        Map<Long, Integer> longIntegerMap4 = whiskyQueryService.findWhiskyPriceTier();
        log.info(longIntegerMap4.toString());
        log.info("===================================================================================");
        FlavorSummary flavorSummary5 = whiskyQueryService.findFlavorMinMax();
        log.info(flavorSummary5.toString());
        log.info("===================================================================================");
        Map<Long, Integer> longIntegerMap5 = whiskyQueryService.findWhiskyPriceTier();
        log.info(longIntegerMap5.toString());

    }

}
