# Spring Boot 서버 빌드
FROM openjdk:11-slim AS builder
WORKDIR /app

# Jenkins에서 빌드 시 "docker build -t ${newImage} -f ./back/deploy/Dockerfile ." 를 이용하므로 경로에 주의해야 한다.
COPY ./back /app
RUN ./gradlew bootJar

# 빌드 결과를 담은 이미지 생성
FROM openjdk:11-jre
ENV TZ="Asia/Seoul"

WORKDIR /app

# ./gradlew bootJar로 빌드한 파일을 컨테이너 내부에 COPY
COPY --from=builder /app/build/libs/*.jar /app/app.jar

# 컨테이너 실행 직후 컨테이너에서 다음 명령어를 수행하여 Spring 웹 서버 실행
ENTRYPOINT ["java", \
             "-jar", \
             "-Dspring.profiles.active=prod", \
             "-Dspring.config.location=classpath:/application.yml,/app/config/application-db.yml,/app/config/application-s3.yml,/app/config/application-security.yml,/app/config/application-ssl.yml", \
             "/app/app.jar"]

# 무중단 배포를 적용하기 위한 컨테이너 상태 체크
# HEALTHCHECK --interval=5s --timeout=5s --start-period=15s --retries=5 \
#   CMD curl -f http://localhost:8080/actuator/health --quiet --output-document - >/dev/null 2>&1