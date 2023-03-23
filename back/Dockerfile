FROM openjdk:11-jre
ENV TZ="Asia/Seoul"

# 현재 프로젝트를 jar 파일로 빌드
RUN ./gradlew bootJar

# ./gradlew bootJar로 빌드한 파일을 컨테이너 내부에 COPY
COPY build/libs/*.jar app.jar

# 컨테이너 실행 직후 컨테이너에서 다음 명령어를 수행하여 Spring 웹 서버 실행
ENTRYPOINT ["java", "-jar",
    "-Dspring.profiles.active=prod",
    "-Dspring.config.location=classpath:/application.yml,/~/config/application-db.yml,/~/config/application-s3.yml,/~/config/application-security.yml,/~/config/application-ssl.yml",
    "/app.jar"]

# 무중단 배포를 적용하기 위한 컨테이너 상태 체크
# HEALTHCHECK --interval=5s --timeout=5s --start-period=15s --retries=5 \
#   CMD curl -f http://localhost:8080/actuator/health --quiet --output-document - >/dev/null 2>&1