package com.example.FriendZone.Response;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ResponseCode {
    // create some enums
    createUserSuccessfully(1000, "User is created successfully!", HttpStatus.valueOf(201)),
    createPostSuccessfully(1000, "Post is created successfully!", HttpStatus.valueOf(201)),
    sendTokenSuccessfully(1000, "Token JWT is sent successfully!", HttpStatus.valueOf(201)),
    sendEmailSuccessfully(1000, "Email is sent successfully!", HttpStatus.ACCEPTED),
    checkCodeTrue(1000, "Your code is right", HttpStatus.ACCEPTED),
    updateCodeSuccessfully(1000, "Update Password successfully!", HttpStatus.ACCEPTED),
    getDetailUserSuccessfully(1000, "Get detail user successfully!", HttpStatus.ACCEPTED),
    updateDetailSuccessfully(1000, "Update detail successfully!", HttpStatus.ACCEPTED),
    saveFileSuccessfully(1000, "Save file successfully!", HttpStatus.ACCEPTED),
    addFriendSuccessfully(1000, "Add friend successfully!", HttpStatus.ACCEPTED),
    deleteFriendSuccessfully(1000, "Delete friend successfully!", HttpStatus.ACCEPTED),
    confirmFriendSuccessfully(1000, "Confirm friend successfully!", HttpStatus.ACCEPTED),
    get15NotificationsSuccessfully(1000, "Get 15 notifications successfully!", HttpStatus.ACCEPTED),
    getFriendSuccessfully(1000, "Get friend successfully!", HttpStatus.ACCEPTED),
    markReadNotificationsSuccessfully(1000, "Mark read notifications successfully!", HttpStatus.ACCEPTED),
    savePostSuccessfully(1000, "Save post successfully", HttpStatus.ACCEPTED),
    getPostSuccessfully(1000, "Get post successfully", HttpStatus.ACCEPTED),
    likePostSuccessfully(1000, "Like post successfully", HttpStatus.ACCEPTED),
    deleteLikePostSuccessfully(1000, "Delete like post successfully", HttpStatus.ACCEPTED),
    deletePostSuccessfully(1000, "Delete post successfully!", HttpStatus.ACCEPTED),
    commentSuccessfully(1000, "Comment successfully!", HttpStatus.ACCEPTED),
    getCommentSuccessfully(1000, "Get comment successfully!", HttpStatus.ACCEPTED),
    likeCommentSuccessfully(1000, "Like comment successfully!", HttpStatus.ACCEPTED),
    deleteLikeCommentSuccessfully(1000, "Delete likeComment successfully!", HttpStatus.ACCEPTED),
    getCommentChildSuccessfully(1000, "Get comment child successfully!", HttpStatus.ACCEPTED),
    editCommentSuccessfully(1000, "Edit comment successfully!", HttpStatus.ACCEPTED),
    deleteCommentSuccessfully(1000, "Delete comment successfully!", HttpStatus.ACCEPTED),
    createListStatusOfUnknown(1000, "Create list status of unknown!", HttpStatus.ACCEPTED),
    getUserName(1000, "Get user name successfully!", HttpStatus.ACCEPTED),
    createGroupSuccessfully(1000, "Create group successfully!", HttpStatus.ACCEPTED),
    acceptInviteGroup(1000, "Accept successfully!", HttpStatus.ACCEPTED),
    cancelRequestJoinGroup(1000, "Cancel request join group", HttpStatus.ACCEPTED),
    sentRequestJoinGroup(1000, "Sent request join group", HttpStatus.ACCEPTED),
    updateBackgroundImageGroup(1000, "Update background successfully!", HttpStatus.ACCEPTED),
    getAllMembersInGroup(1000, "Get all members successfully!", HttpStatus.ACCEPTED),
    deleteRequestJoin(1000, "Delete request join successfully!", HttpStatus.ACCEPTED),
    acceptRequest(1000, "Accept request successfully!", HttpStatus.ACCEPTED),
    confirmPost(1000, "Confirm post successfully!", HttpStatus.ACCEPTED);

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
