package com.example.FriendZone.Response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseComment {
    private String userId;
    private String userName;
    private String[] listTagedUserId;
    private String[] listTagedUserName;
    private String content;
    private String linkFile;
    private String typeImgOrVideo;
    private int numberOfLikes;
    private LocalDateTime time;
    private int level;
    private String commentId;
    private int numberOfReplies;
    private int flagLike; // mark if you liked or not
}
