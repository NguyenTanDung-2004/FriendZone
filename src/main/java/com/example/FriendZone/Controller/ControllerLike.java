package com.example.FriendZone.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.FriendZone.Service.ServiceLike;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/likePost")
public class ControllerLike {
    @Autowired
    private ServiceLike serviceLike;

    @GetMapping("/getListLike")
    public int[] getListLike(HttpServletRequest httpServletRequest,
            @RequestParam(name = "arrayPostId") String[] postIds) {

        return this.serviceLike.getListNumberOfLikes(postIds, httpServletRequest);
    }

    @GetMapping("/getListLiked")
    public int[] getListLiked(HttpServletRequest httpServletRequest,
            @RequestParam(name = "arrayPostId") String[] postIds) {

        return this.serviceLike.getListLiked(postIds, httpServletRequest);
    }

    @PostMapping("/deleteLikePost")
    public ResponseEntity deleteLikePost(HttpServletRequest httpServletRequest,
            @RequestParam(name = "postId") String postId) {
        return this.serviceLike.deleteLikePost(httpServletRequest, postId);
    }

}
