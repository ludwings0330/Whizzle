package com.bear.whizzle.whisky.controller;

import com.bear.whizzle.whisky.controller.dto.WhiskyDetailResponseDto;
import com.bear.whizzle.whisky.mapper.WhiskyMapper;
import com.bear.whizzle.whisky.service.WhiskyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/whiskies")
@RequiredArgsConstructor
public class WhiskyController {

    private final WhiskyService whiskyService;

    /**
     * 위스키 상세 정보 조회에 성공할 경우 그 정보와 상태 코드 200으로 응답
     *
     * @param whiskyId 조회하려는 위스키 ID
     * @return 위스키 상세 정보
     * @throws com.bear.whizzle.domain.exception.NotFoundException 잘못된 위스키 ID로 조회하여 위스키를 찾을 수 없을 때 발생
     */
    @GetMapping("/{whiskyId}")
    @ResponseStatus(HttpStatus.OK)
    public WhiskyDetailResponseDto findWhisky(@PathVariable Long whiskyId) {
        return WhiskyMapper.toWhiskyDetailResponseDto(
                whiskyService.findWhisky(whiskyId)
        );
    }

}
