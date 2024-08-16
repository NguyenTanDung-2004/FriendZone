package com.example.FriendZone.Request;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCreationUser {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private int gender;
    private Date dateOfBirth;
}
