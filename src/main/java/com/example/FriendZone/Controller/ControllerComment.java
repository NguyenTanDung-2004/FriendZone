package com.example.FriendZone.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Service.ServiceComment;

import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/comment")
public class ControllerComment {

    @Autowired
    private ServiceComment serviceComment;

    @PostMapping("/uploadComment")
    public ResponseEntity uploadComment(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "listTagedId", required = false) String[] TagedId,
            @RequestParam(name = "content") String content,
            @RequestParam(name = "level") int level,
            @RequestParam(name = "postId") String postId,
            @RequestParam(name = "parentCommentId") String parentCommentId,
            HttpServletRequest httpServletRequest) {
        return serviceComment.uploadComment(file, TagedId, content, level, postId, parentCommentId, httpServletRequest);
    }

    @GetMapping("/getComment")
    public ResponseEntity getComment(@RequestParam(name = "postId") String postId,
            HttpServletRequest httpServletRequest) {
        return this.serviceComment.getComment(postId, httpServletRequest);
    }

    @PostMapping("/likeComment")
    public ResponseEntity likeComment(HttpServletRequest httpServletRequest,
            @RequestParam(name = "commentId") String commentId) {
        return this.serviceComment.likeComment(httpServletRequest, commentId);
    }

    @PostMapping("/deleteLikeComment")
    public ResponseEntity deleteLikeComment(HttpServletRequest httpServletRequest,
            @RequestParam(name = "commentId") String commentIdString) {

        return this.serviceComment.deleteLikeComment(httpServletRequest, commentIdString);
    }

    @GetMapping("/getCommentChild")
    public ResponseEntity getCommentChild(HttpServletRequest httpServletRequest,
            @RequestParam(name = "commentParentId") String commentParentId) {

        return this.serviceComment.getCommentChild(httpServletRequest, commentParentId);
    }

    @PostMapping("/editComment")
    public ResponseEntity editComment(HttpServletRequest httpServletRequest,
            @RequestParam(name = "commentId") String commentId,
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "listTagedFriendId", required = false) String[] listTagedFriendId,
            @RequestParam(name = "content") String content,
            @RequestParam(name = "deleteFile") int deleteFile,
            @RequestParam(name = "deleteTag") int deletTag) {

        return this.serviceComment.editComment(httpServletRequest, commentId, file,
                listTagedFriendId, content,
                deleteFile, deletTag);
    }

    @PostMapping("/deleteComment")
    public ResponseEntity deleteComment(@RequestParam(name = "commentId") String commentId,
            HttpServletRequest httpServletRequest) {
        return this.serviceComment.deleteComment(commentId, httpServletRequest);
    }
}
