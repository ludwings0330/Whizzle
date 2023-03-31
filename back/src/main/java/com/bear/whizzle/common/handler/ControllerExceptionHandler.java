package com.bear.whizzle.common.handler;

import com.bear.whizzle.domain.exception.NotFoundException;
import io.jsonwebtoken.JwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException.UnprocessableEntity;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler({ AuthenticationException.class, JwtException.class })
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String handleNotAuthenticated(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String handleNotAuthorized(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleBadRequest(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String handleEmptyResult(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleConflict(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(UnprocessableEntity.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleRestAPICall(Exception e) {
        return e.getMessage();
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleTheOthers(Exception e) {
        return e.getMessage();
    }

}
