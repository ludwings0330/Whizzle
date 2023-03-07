package com.bear.whizzle.domain.exception;

import org.springframework.dao.DataAccessException;

/**
 * {@code NotFoundException} 은 DB에 적어도 1개의 데이터가 있을 것이라 기대했지만, 1개의 데이터도 찾지 못한 경우에 발생하는 예외이다.
 * */
public class NotFoundException extends DataAccessException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
