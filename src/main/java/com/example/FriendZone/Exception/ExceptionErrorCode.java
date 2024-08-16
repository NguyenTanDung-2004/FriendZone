package com.example.FriendZone.Exception;

import java.util.HashMap;

import org.hibernate.mapping.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ExceptionErrorCode {
    // create some enums
    emailExistInDatabase(1002, "User was exist in database", HttpStatus.CONFLICT),
    tokenCreateError(1002, "Token is created fail", HttpStatus.BAD_REQUEST),
    emailOrPasswordWrong(1002, "Email or password is wrong", HttpStatus.CONFLICT),
    sendEmailFail(1002, "Email is sent fail!", HttpStatus.BAD_REQUEST),
    checkCodeWrong(1002, "Your code is wrong", HttpStatus.BAD_REQUEST),
    emailIsNotExistInDatabase(1002, "Your email is not exist in database", HttpStatus.BAD_REQUEST),
    verifyTokenFail(1002, "JwtToken is verfied fail", HttpStatus.UNAUTHORIZED),
    saveFileError(1002, "Save file fail", HttpStatus.BAD_REQUEST);

    // properties
    private int code;
    private String message;
    private HttpStatusCode status;

    @JsonValue
    public HashMap<String, Object> toJson() {
        HashMap<String, Object> json = new HashMap<>();
        json.put("code", code);
        json.put("message", message);
        json.put("status", status);
        return json;
    }
}
