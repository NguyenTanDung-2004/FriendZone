package com.example.FriendZone.Response;

import java.time.LocalDateTime;

import org.hibernate.mapping.List;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponsePost {
    private String id;
    private String caption;
    private String[] idTagedUser;
    private String[] nameTagedUser;
    private LocalDateTime time;
    private int scope; // 1: friend, 2: public, 3: only you
    private String userId;
    private String userName;
    private String[] fileNames;
    private java.util.List<String> fileNameOther;
    private java.util.List<String> fileNameImgOrVideo;
    private String[] fileTypes;
    private String[] fileIds;
    private java.util.List<String> fileIdOther;
    private java.util.List<String> tailOfFile;
    private java.util.List<String> tailOfOthersFile;
    private java.util.List<String> fileIdImgOrVideo;
    private int numberOfLikes;
    private int numberOfComments;
    private int numberOfShares;

    // share
    private String sharedUserId;
    private String sharedUserName;
    private String sharedPostId;

    // newFeed
    private String typeOfUser; // you or anotherUser.

    // group
    private int flagPostOwner;
    private int anonymous;
    private int flagLiked;
}
