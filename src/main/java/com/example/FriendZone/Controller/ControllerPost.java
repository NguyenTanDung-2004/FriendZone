package com.example.FriendZone.Controller;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Request.RequestCreationPost;
import com.example.FriendZone.Service.ServicePost;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/post")
public class ControllerPost {
    @Autowired
    private ServicePost servicePost;

    @PostMapping("/create_post")
    public ResponseEntity createPost(@RequestBody RequestCreationPost request) {
        return this.servicePost.createPost(request);
    }

    @GetMapping("/getPost")
    public ResponseEntity getPostFromPostDetail(HttpServletRequest httpServletRequest,
            @RequestParam(name = "postId") String postId) {
        return this.servicePost.getPostFromPostDetail(httpServletRequest, postId);
    }

    @PostMapping("/updatePost")
    public ResponseEntity updatePost(@RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam(name = "scope", required = false) int scope,
            @RequestParam(name = "caption", required = false) String caption,
            @RequestParam(name = "listIdTaged", required = false) String[] listIdTagged,
            HttpServletRequest httpServletRequest,
            @RequestParam(name = "deleteTaged", required = false) int flagTaged,
            @RequestParam(name = "deleteAttached", required = false) int flagAttached,
            @RequestParam(name = "postId", required = false) String postId) {

        System.out.println(caption);
        return this.servicePost.updatePost(files, scope, caption, listIdTagged,
                httpServletRequest, flagTaged,
                flagAttached, postId);

    }

    @PostMapping("/deletePost")
    public ResponseEntity deletePost(@RequestParam(name = "postId") String postId,
            HttpServletRequest httpServletRequest) {
        return this.servicePost.deletePost(postId, httpServletRequest);
    }

    @PostMapping("/uploadSharedPost")
    public ResponseEntity uploadSharedPost(@RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam(name = "scope", required = false) int scope,
            @RequestParam(name = "caption", required = false) String caption,
            @RequestParam(name = "listIdTaged", required = false) String[] listIdTagged,
            HttpServletRequest httpServletRequest,
            @RequestParam(name = "sharedPostId") String sharedPostId,
            @RequestParam(name = "sharedUserName") String sharedUserName,
            @RequestParam(name = "sharedUserId") String sharedUserId) {

        return this.servicePost.saveSharedPost(files, listIdTagged, scope, caption,
                httpServletRequest, sharedUserId,
                sharedUserName, sharedPostId);
    }

    @GetMapping("/getPostInNewFeed")
    public ResponseEntity getPostFromNewFeed(HttpServletRequest httpServletRequest) {
        return this.servicePost.getPostFromNewFeed(httpServletRequest);
    }
}
