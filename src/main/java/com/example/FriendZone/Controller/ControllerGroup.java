package com.example.FriendZone.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.Group;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Repository.RepositoryGroup;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Service.ServiceGroup;
import com.example.FriendZone.Service.ServiceUser;

import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/handleGroup")
public class ControllerGroup {

    @Autowired
    private ServiceGroup serviceGroup;

    @Autowired
    private RepositoryGroup repositoryGroup;

    @Autowired
    private ServiceUser serviceUser;

    @PostMapping("/createGroup")
    public ResponseEntity createGroup(HttpServletRequest httpServletRequest,
            @RequestParam(name = "groupName") String groupName,
            @RequestParam(name = "arrayUserIdsInvitedByAdmin", required = false) String[] arrayUserIdsInvitedByAdmin) {

        return this.serviceGroup.createGroup(httpServletRequest, groupName, arrayUserIdsInvitedByAdmin);
    }

    @PostMapping("/acceptRequest")
    public ResponseEntity acceptRequest(HttpServletRequest httpServletRequest,
            @RequestParam(name = "groupId") String groupId) {

        return this.serviceGroup.acceptRequest(httpServletRequest, groupId);

    }

    @PostMapping("/joinGroup")
    public ResponseEntity joinGroup(HttpServletRequest httpServletRequest,
            @RequestParam(name = "groupId") String groupId) {
        return this.serviceGroup.joinGroup(httpServletRequest, groupId);
    }

    @PostMapping("/cancelRequest")
    public ResponseEntity cancelRequest(HttpServletRequest httpServletRequest,
            @RequestParam(name = "groupId") String groupId) {
        return this.serviceGroup.cancelRequest(httpServletRequest, groupId);
    }

    @PostMapping("/uploadBackgroundImage")
    public ResponseEntity uploadBackgroundImage(@RequestParam(name = "groupId") String groupId,
            @RequestParam(name = "file") MultipartFile multipart) {
        return this.serviceGroup.uploadBackground(groupId, multipart);
    }

    @GetMapping("/getAllMembersInGroup")
    public ResponseEntity getAllMembersInGroup(@RequestParam(name = "groupId") String groupId,
            HttpServletRequest httpServletRequest) {
        return this.serviceGroup.getAllMembersInGroup(groupId, httpServletRequest);
    }

    @PostMapping("/createPost")
    public ResponseEntity createPost(@RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam(name = "anonymous", required = false) int anonymous,
            @RequestParam(name = "caption", required = false) String caption,
            @RequestParam(name = "listIdTaged", required = false) String[] listIdTagged,
            @RequestParam(name = "groupId") String groupId,
            HttpServletRequest httpServletRequest) {

        return this.serviceGroup.createPost(files, listIdTagged, caption, httpServletRequest, anonymous, groupId);
    }

    @GetMapping("/getPost")
    public ResponseEntity getPost(@RequestParam(name = "groupId") String groupId,
            HttpServletRequest httpServletRequest) {
        return this.serviceGroup.getPost(httpServletRequest, groupId);
    }

    @PostMapping("/updatePost")
    public ResponseEntity updatePost(@RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam(name = "caption", required = false) String caption,
            @RequestParam(name = "listIdTaged", required = false) String[] listIdTagged,
            HttpServletRequest httpServletRequest,
            @RequestParam(name = "anonymous") int anonymous,
            @RequestParam(name = "deleteTaged", required = false) int flagTaged,
            @RequestParam(name = "deleteAttached", required = false) int flagAttached,
            @RequestParam(name = "postId", required = false) String postId,
            @RequestParam(name = "groupId") String groupId) {

        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        if (group.getCreatedUserId().equals(userId) == false) {
            return this.serviceGroup.updateMemberPost(files, anonymous, caption, listIdTagged, httpServletRequest,
                    flagTaged, flagAttached, postId);
        } else {
            return this.serviceGroup.updateAdminPost(files, anonymous, caption, listIdTagged, httpServletRequest,
                    flagTaged, flagAttached, postId);
        }
    }

    @PostMapping("/uploadComment")
    public ResponseEntity uploadComment(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "listTagedId", required = false) String[] TagedId,
            @RequestParam(name = "content") String content,
            @RequestParam(name = "level") int level,
            @RequestParam(name = "postId") String postId,
            @RequestParam(name = "parentCommentId") String parentCommentId,
            HttpServletRequest httpServletRequest,
            @RequestParam(name = "groupId") String groupId) {
        return serviceGroup.uploadComment(file, TagedId, content, level, postId, parentCommentId, httpServletRequest,
                groupId);
    }

    @GetMapping("/getMember")
    public ResponseEntity getMember(@RequestParam(name = "groupId") String groupId,
            HttpServletRequest httpServletRequest) {
        return this.serviceGroup.getMember(groupId, httpServletRequest);
    }

    @PostMapping("/deleteRequest")
    public ResponseEntity deleteRequest(@RequestParam(name = "groupId") String groupId,
            @RequestParam(name = "userId") String userId) {
        return this.serviceGroup.deleteRequest(groupId, userId);
    }

    @PostMapping("/acceptRequest1")
    public ResponseEntity acceptRequest(@RequestParam(name = "groupId") String groupId,
            @RequestParam(name = "userId") String userId) {
        return this.serviceGroup.acceptRequest(groupId, userId);
    }

    @PostMapping("/kickMember")
    public ResponseEntity kickMember(@RequestParam(name = "userId") String userId,
            @RequestParam(name = "groupId") String groupId) {
        return this.serviceGroup.kickMember(groupId, userId);
    }

    @PostMapping("/confirmPost")
    public ResponseEntity confirmPost(@RequestParam(name = "postId") String postId,
            @RequestParam(name = "groupId") String groupId) {
        return this.serviceGroup.confirmPost(postId, groupId);
    }

    @GetMapping("/getPostToConfirm")
    public ResponseEntity getPostToConfirm(@RequestParam(name = "groupId") String groupId,
            HttpServletRequest httpServletRequest) {
        return this.serviceGroup.getPostToConfirm(httpServletRequest, groupId);
    }

    @PostMapping("/deletePost")
    public ResponseEntity deletePost(@RequestParam(name = "groupId") String groupId) {
        return this.serviceGroup.deletePost(groupId);
    }
}
