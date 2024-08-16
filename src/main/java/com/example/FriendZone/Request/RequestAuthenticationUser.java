package com.example.FriendZone.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestAuthenticationUser {
    private String userName;
    private String password;
}
