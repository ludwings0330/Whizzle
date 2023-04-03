#!/usr/bin/env groovy

def call(List<String> ports, int maxAttempts = 5, int sleepTime = 10) {
    ports.each { port ->
        def checkCommand = "curl -f http://j8a805.p.ssafy.io:${port}/api/health" as Object

        while (maxAttempts-- > 0) {
            try {
                sh(checkCommand)
                return
            } catch (Exception e) {
                println("${port}를 사용하는 서버 감지 실패, ${sleepTime} 후 재확인 하겠습니다.")
                sleep sleepTime
            }
        }
    }

    error("모든 서버에서 실행에 실패했습니다.")
}
