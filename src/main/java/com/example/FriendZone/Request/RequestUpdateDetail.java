package com.example.FriendZone.Request;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestUpdateDetail {
    private String firstName;
    private String lastName;
    private int gender;
    private Date dateOfBirth;
    private String live;
    private String from;
    private String study;
    private String work;
}
