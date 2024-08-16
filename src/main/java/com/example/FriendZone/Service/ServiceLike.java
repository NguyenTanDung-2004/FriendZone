package com.example.FriendZone.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.FriendZone.Entities.LikePost;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Repository.RepositoryLike;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.ResponseCode;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ServiceLike {
    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private RepositoryLike repositoryLike;

    @Autowired
    private RepositoryPost repositoryPost;

    @Autowired
    private RepositoryUser repositoryUser;

    public int[] getListNumberOfLikes(String[] arrayPostId, HttpServletRequest httpServletRequest) {
        // String userId = this.serviceUser.checkJwt(httpServletRequest);
        int[] listNumberOfLikes = new int[arrayPostId.length];

        for (int i = 0; i < arrayPostId.length; i++) {
            Optional optional = this.repositoryPost.findById(arrayPostId[i]);
            Post post = (Post) optional.get();
            listNumberOfLikes[i] = this.repositoryLike.getNumberOfLikes(post);
        }

        return listNumberOfLikes;
    }

    public int[] getListLiked(String[] arrayPostId, HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        int[] listLiked = new int[arrayPostId.length];

        for (int i = 0; i < arrayPostId.length; i++) {
            Optional optional1 = this.repositoryPost.findById(arrayPostId[i]);
            Post post = (Post) optional1.get();
            LikePost likePost = this.repositoryLike.getLikePost(post, user);
            if (likePost == null) {
                listLiked[i] = 0;
            } else {
                listLiked[i] = 1;
            }
        }

        return listLiked;

    }

    public ResponseEntity<ResponseCode> deleteLikePost(HttpServletRequest httpServletRequest, String postId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();

        LikePost likePost = this.repositoryLike.getLikePost(post, user);

        this.repositoryLike.delete(likePost);

        return ResponseEntity.status(ResponseCode.deleteLikePostSuccessfully.getStatus())
                .body(ResponseCode.deleteLikePostSuccessfully);
    }
}
