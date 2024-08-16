package com.example.FriendZone.Mapper.Interface;

import java.time.LocalDateTime;

import com.example.FriendZone.Entities.Comment;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Response.ResponseComment;

public interface InterfaceMapperComment {
    public ResponseComment createResponseComment(User user, String[] tagedUserId, String content, int numberOfLikes,
            LocalDateTime time, int level, String fileId, String fileType, String fileName, String commentId,
            User userSendRequest);

    public ResponseComment createResponseComment(Comment comment, User userSendRequest);
}