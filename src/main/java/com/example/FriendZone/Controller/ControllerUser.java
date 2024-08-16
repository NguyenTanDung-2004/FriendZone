package com.example.FriendZone.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Repository.RepositoryFile;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Request.RequestAuthenticationUser;
import com.example.FriendZone.Request.RequestCheckCode;
import com.example.FriendZone.Request.RequestCreationUser;
import com.example.FriendZone.Request.RequestSendCodeEmail;
import com.example.FriendZone.Request.RequestUpdateDetail;
import com.example.FriendZone.Request.RequestUpdatePassword;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Service.ServiceController;
import com.example.FriendZone.Service.ServiceUser;
import com.example.FriendZone.Utils.UtilsHandleFile;

import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class ControllerUser {

    @Autowired
    private ServiceUser serviceUser;

    @PostMapping("/create_user")
    public ResponseEntity createUser(@RequestBody RequestCreationUser request) {
        return this.serviceUser.createUser(request);
    }

    @PostMapping("/login_without_jwtToken")
    public ResponseEntity loginWithoutJwtToken(@RequestBody RequestAuthenticationUser requestAuthenticationUser,
            HttpServletRequest request, HttpServletResponse response) {
        return this.serviceUser.loginWithOutJwtToken(requestAuthenticationUser, request, response);
    }

    @PostMapping("/sendCodeResetPassword")
    public ResponseEntity sendCodeResetPassword(@RequestBody RequestSendCodeEmail request) {
        return this.serviceUser.sendCodeForgot(request.getEmail());
    }

    @PostMapping("/checkCode")
    public ResponseEntity checkCode(@RequestBody RequestCheckCode requestCheckCode) {
        System.out.println(requestCheckCode);
        return this.serviceUser.checkCode(requestCheckCode.getEmail(), requestCheckCode.getCode());
    }

    @PostMapping("/updatePassword")
    public ResponseEntity updatePassword(@RequestBody RequestUpdatePassword requestUpdatePassword) {
        return this.serviceUser.updatePassword(requestUpdatePassword.getEmail(),
                requestUpdatePassword.getNewPassword());
    }

    @GetMapping("/getEditDetail")
    public ResponseEntity getEditDetail(HttpServletRequest httpServletRequest) {
        return this.serviceUser.getEditDetail(httpServletRequest);
    }

    @GetMapping("/getEditDetailOfAntotherUser")
    public ResponseEntity getEditDetail(@RequestParam(name = "urlId") String urlId) {
        return this.serviceUser.getEditDetailOfAnotherClient(urlId);
    }

    @PostMapping("/updateDetail")
    public ResponseEntity updateDetail(HttpServletRequest httpServletRequest,
            @RequestBody RequestUpdateDetail requestUpdateDetail) {
        return this.serviceUser.updateEditDetail(httpServletRequest, requestUpdateDetail);
    }

    @PostMapping("/addFriend")
    public ResponseEntity addFriend(HttpServletRequest httpServletRequest,
            @RequestParam(name = "friendId") String friendId) {
        return this.serviceUser.addFriend(httpServletRequest, friendId);
    }

    @PostMapping("/deleteFriend")
    public ResponseEntity deleteFriend(HttpServletRequest httpServletRequest,
            @RequestParam(name = "friendId") String friendId) {
        return this.serviceUser.deleteFriend(httpServletRequest, friendId);
    }

    @PostMapping("/confirmFriend")
    public ResponseEntity confirmFriend(HttpServletRequest httpServletRequest,
            @RequestParam(name = "friendId") String friendId) {
        return this.serviceUser.confirmFriend(httpServletRequest, friendId);
    }

    @GetMapping("/getTop15Notifications")
    public ResponseEntity getTop15Notifications(HttpServletRequest httpServletRequest) {
        return this.serviceUser.getTop15Notifications(httpServletRequest);
    }

    @GetMapping("/get6Friend")
    public ResponseEntity getFriend(HttpServletRequest httpServletRequest,
            @RequestParam(name = "urlId", required = false) String urlId) {
        return this.serviceUser.get6Friend(httpServletRequest, urlId);
    }

    @PostMapping("/markReadNotifications")
    public ResponseEntity markReadNotifications(HttpServletRequest httpServletRequest) {
        return this.serviceUser.markReadNotifications(httpServletRequest);
    }

    @PostMapping("/uploadFile")
    public ResponseEntity abc(@RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam(name = "scope", required = false) int scope,
            @RequestParam(name = "caption", required = false) String caption,
            @RequestParam(name = "listIdTaged", required = false) String[] listIdTagged,
            HttpServletRequest httpServletRequest) {

        return this.serviceUser.savePost(files, listIdTagged, scope, caption, httpServletRequest);
    }

    @GetMapping("/getAllFriend")
    public ResponseEntity getAllFriend(HttpServletRequest httpServletRequest) {
        return this.serviceUser.getAllFriend(httpServletRequest);
    }

    // test
    @Autowired
    private RepositoryPost repositoryPost;
    @Autowired
    private RepositoryUser repositoryUser;
    @Autowired
    private RepositoryFile repositoryFile;

    @GetMapping("/getPost")
    public ResponseEntity getPost(HttpServletRequest httpServletRequest,
            @RequestParam(name = "urlId") String urlId) {
        System.out.println(urlId);
        return this.serviceUser.getPost(httpServletRequest, urlId);
    }

    @PostMapping("/likePost")
    public ResponseEntity likePost(HttpServletRequest httpServletRequest,
            @RequestParam(name = "postId") String postId) {
        return this.serviceUser.likePost(httpServletRequest, postId);
    }

    // test
    @GetMapping("/getFile")
    public String[][] getFile(@RequestParam(name = "postId") String postId) {
        Optional optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();
        return this.repositoryFile.getFileOfPost(post);
    }

    // test
    @GetMapping("/getSetComment")
    public ResponseEntity<Response> getComment(@RequestParam(name = "userId") String userId) {
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        Response response = Response.builder()
                .object(user.getListComment())
                .build();
        return ResponseEntity.status(ResponseCode.getCommentSuccessfully.getStatus())
                .body(response);
    }

}
