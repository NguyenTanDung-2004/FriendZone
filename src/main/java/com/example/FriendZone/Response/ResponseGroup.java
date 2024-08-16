package com.example.FriendZone.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseGroup {
    private String groupId;
    private String groupName;
    private String groupBackground;
}
