#!/usr/bin/env groovy

def call(maxAttemps = 5, sleepTime = 10) {
    def checkCommnad = "curl -f https://j8a805.p.ssafy.io/api/health"

    while (maxAttemps-- > 0) {
        try {
            sh(checkCommnad)
            return
        } catch (Exception e) {
            println("서버 감지 실패, ${sleepTime} 후 재확인 하겠습니다.")
            sleep sleepTime
        }
    }

    error("새로운 스프링 서버 컨테이너의 실행에 실패했습니다.")
}