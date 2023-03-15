package com.bear.whizzle.common.aop;

import java.lang.reflect.Parameter;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;

@Aspect
@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Slf4j
public class LogAspect {

    private static final String REQUEST_MAPPED = "[{}.{}()]---------------------------------------------------------------------------------------------------------------------------------------------------------------------------";
    private static final String REQUEST_DATA_LOG = " => Request Data    {} = {}";
    private static final String RESPONSE_LOG = " => Response Data    {} / {}";
    private static final String OVER_250_MS = " => should improve performance [{}.{}()] : {} ms";
    private static final String THROWING_INFO = " => Throwing Info       [{}.{}()] 실행 중 예외 발생";
    private static final String EXCEPTION_INFO = " => Exception Info      {} : {}";
    private static final String CAUSED_INFO = " => Caused Info         {} : {}";
    private static final String FINISH_LINE = "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------";

    @Pointcut("execution(* com.bear.whizzle..controller.*Controller*.*(..))")
    private void controller() {
    }

    @Pointcut("@annotation(com.bear.whizzle.common.annotation.Performance)")
    private void performance() {
    }

    @Pointcut("execution(* com.bear.whizzle..service..*Service*.*(..)) && !performance()")
    private void service() {
    }

    @Pointcut("execution(* com.bear.whizzle..repository..*Repository*.*(..)) && !performance()")
    private void repository() {
    }

    @Before("controller()")
    public void beforeController(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        log.debug(
                REQUEST_MAPPED,
                signature.getDeclaringType().getSimpleName(), // 메서드를 정의(선언)한 클래스
                signature.getName() // 메서드의 이름
        );

        Parameter[] parameters = signature.getMethod().getParameters();
        Object[] args = joinPoint.getArgs();
        for (int len = args.length, i = 0; i < len; i++) {
            log.debug(REQUEST_DATA_LOG, parameters[i].getName(), args[i]);
        }
    }

    @AfterReturning(value = "controller()", returning = "dto")
    public void afterReturningController(JoinPoint joinPoint, Object dto) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        HttpStatus httpStatus = Optional.ofNullable(
                                                signature.getMethod()
                                                         .getDeclaredAnnotation(ResponseStatus.class)
                                        )
                                        .map(ResponseStatus::value)
                                        .orElse(HttpStatus.OK);

        log.debug(RESPONSE_LOG, httpStatus, dto);
        log.debug(FINISH_LINE);
    }

    @AfterThrowing(value = "controller()", throwing = "e")
    public void afterThrowingController(JoinPoint joinPoint, Exception e) {
        logThrowingInfo(joinPoint.getSignature());
        logExceptionInfo(e);
        log.debug(FINISH_LINE);
    }

    @Around("performance()")
    private Object measurePerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        return logThrowingAndPerformance(joinPoint);
    }

    @AfterThrowing(value = "service() || repository()")
    public void afterThrowingService(JoinPoint joinPoint) {
        logThrowingInfo(joinPoint.getSignature());
    }

    private Object logThrowingAndPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            long startTime = TimeUnit.NANOSECONDS.toMillis(System.nanoTime());
            Object returned = joinPoint.proceed();
            long endTime = TimeUnit.NANOSECONDS.toMillis(System.nanoTime());

            logPerformance(joinPoint.getSignature(), endTime - startTime);
            return returned;
        } catch (Throwable e) {
            logThrowingInfo(joinPoint.getSignature());
            throw e;
        }
    }

    private void logThrowingInfo(Signature signature) {
        log.error(
                THROWING_INFO,
                signature.getDeclaringType().getSimpleName(),
                signature.getName()
        );
    }

    private void logExceptionInfo(Throwable e) {
        boolean isFirst = true;

        while (e != null) {
            log.error(
                    isFirst ? EXCEPTION_INFO : CAUSED_INFO,
                    e.getClass().getSimpleName(),
                    e.getMessage()
            );

            e = e.getCause();
            isFirst = false;
        }
    }

    private void logPerformance(Signature signature, long performance) {
        if (performance >= 250) {
            log.warn(
                    OVER_250_MS,
                    signature.getDeclaringType().getSimpleName(),
                    signature.getName(),
                    performance
            );
        }
    }

}
