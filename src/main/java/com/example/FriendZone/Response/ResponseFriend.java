package com.example.FriendZone.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseFriend {
    private String userId;
    private String userName;
    private int numberOfFriends;
}
