#!/usr/bin/env groovy

def call(List<String> ports, int maxAttempts = 5, int sleepTime = 10) {
    ports.each { port ->
        def checkCommand = "curl -f http://j8a805.p.ssafy.io:${port}/health"

        while (maxAttempts-- > 0) {
            try {
                sh(checkCommand)
                return
            } catch (Exception e) {
                println("${port}를 사용하는 웹 서버 감지 실패")
                sleep sleepTime
            }
        }
    }

    error("모든 서버에서 실행에 실패했습니다.")
}