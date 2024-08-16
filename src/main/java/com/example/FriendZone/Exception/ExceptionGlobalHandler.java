package com.example.FriendZone.Exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionGlobalHandler {

    // the code block below will handle ExceptionUser
    @ExceptionHandler(value = ExceptionUser.class)
    public ResponseEntity<ExceptionErrorCode> handleExceptionUser(ExceptionUser exception) {
        return ResponseEntity.status(exception.getExceptionErrorCode().getStatus())
                .body(exception.getExceptionErrorCode());
    }
}
