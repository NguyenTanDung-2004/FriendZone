package com.example.FriendZone.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionUser extends RuntimeException {

    private ExceptionErrorCode exceptionErrorCode;

}
