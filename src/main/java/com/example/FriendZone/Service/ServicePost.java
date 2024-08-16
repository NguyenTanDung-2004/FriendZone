package com.example.FriendZone.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Class.MapperFile;
import com.example.FriendZone.Mapper.Class.MapperNotify;
import com.example.FriendZone.Mapper.Class.MapperPost;
import com.example.FriendZone.Repository.RepositoryComment;
import com.example.FriendZone.Repository.RepositoryFile;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryLike;
import com.example.FriendZone.Repository.RepositoryNotify;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Request.RequestCreationPost;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Response.ResponsePost;
import com.example.FriendZone.Utils.UtilsHandleFile;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ServicePost {
    @Autowired
    private RepositoryPost repositoryPost;

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private MapperPost mapperPost;

    @Autowired
    private RepositoryFile repositoryFile;

    @Autowired
    private RepositoryLike repositoryLike;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private RepositoryComment repositoryComment;

    @Autowired
    private MapperFile mapperFile;

    @Autowired
    private MapperNotify mapperNotify;

    @Autowired
    private RepositoryNotify repositoryNotify;

    @Autowired
    private RepositoryFriend repositoryFriend;

    public ResponseEntity<ResponseCode> createPost(RequestCreationPost request) {

        return ResponseEntity.status(ResponseCode.createPostSuccessfully.getStatus())
                .body(ResponseCode.createPostSuccessfully);
    }

    public ResponseEntity<ResponsePost> getPostFromPostDetail(HttpServletRequest httpServletRequest, String postId) {
        Optional optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();
        if (post == null) {
            throw new RuntimeException("Post id is not exist!");
        }
        String[][] listFileOfPost = this.repositoryFile.getFileOfPost(post);
        int numberOfLikes = this.repositoryLike.getNumberOfLikes(post);
        int numberOfCommentPost = this.repositoryComment.numberOfCommentInPost(post);
        int numberOfShares = this.repositoryPost.numberOfShare(postId);
        ResponsePost responsePost = this.mapperPost.createResponsePost(post, listFileOfPost, numberOfLikes,
                numberOfCommentPost, numberOfShares);

        return ResponseEntity.status(ResponseCode.createPostSuccessfully.getStatus())
                .body(responsePost);
    }

    public ResponseEntity<ResponseCode> updatePost(
            MultipartFile[] files, int scope, String caption,
            String[] listIdTagged, HttpServletRequest httpServletRequest,
            int flagTaged, int flagAttached, String postId) {

        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Post post = getPostUsingId(postId);
        post.setCaption(caption);
        post.setScope(scope);
        if (listIdTagged != null) {
            if (flagTaged == 1) {
                post.setIdTagedUser(listIdTagged);
            } else {
                post.setIdTagedUser(createListTagedFriend(post.getIdTagedUser(), listIdTagged));
            }
        } else {
            post.setIdTagedUser(null);
        }

        // update Post
        this.repositoryPost.save(post);

        if (files != null) {
            if (flagAttached == 1) {
                String[][] infoFiles = this.repositoryFile.getFileOfPost(post);
                this.utilsHandleFile.deleteManyFile(infoFiles, userId);
                this.repositoryFile.deleteAllFileInPost(post);
            }
            List<String> listFileId = this.utilsHandleFile.createListUUID(files.length);
            List<String> listTypeOfFile = this.utilsHandleFile.createListTypeOfFile(files);
            for (int i = 0; i < files.length; i++) {
                this.utilsHandleFile.saveFile(files[i], userId, listFileId.get(i), listTypeOfFile.get(i));
                File file = this.mapperFile.createFile(listFileId.get(i), files[i].getOriginalFilename(),
                        listTypeOfFile.get(i),
                        post);
                this.repositoryFile.save(file);
            }
        } else {
            if (flagAttached == 1) {
                String[][] infoFiles = this.repositoryFile.getFileOfPost(post);
                this.utilsHandleFile.deleteManyFile(infoFiles, userId);
                this.repositoryFile.deleteAllFileInPost(post);
            }
        }

        return ResponseEntity.status(ResponseCode.savePostSuccessfully.getStatus())
                .body(ResponseCode.savePostSuccessfully);
    }

    public Post getPostUsingId(String postId) {
        Optional optional = this.repositoryPost.findById(postId);
        return (Post) optional.get();
    }

    public String[] createListTagedFriend(String[] old, String[] new1) { // use new1 because new is a specific word
        if (old != null) {
            String result[] = new String[old.length + new1.length];
            for (int i = 0; i < old.length; i++) {
                result[i] = old[i];
            }
            for (int i = 0; i < new1.length; i++) {
                result[old.length - 1 + i] = new1[i];
            }
            return result;
        }
        return new1;
    }

    public User getUserUsingId(HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        return (User) optional.get();
    }

    public ResponseEntity<ResponseCode> deletePost(String postId, HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();
        String[][] infoFiles = this.repositoryFile.getFileOfPost(post);
        this.utilsHandleFile.deleteManyFile(infoFiles, userId);
        this.repositoryFile.deleteAllFileInPost(post);
        // delete Like
        this.repositoryLike.deleteAllLikeInPost(post);
        // delete Comment
        this.repositoryComment.deleteAllCommentInPost(post);

        this.repositoryPost.delete(post);

        return ResponseEntity.status(ResponseCode.deletePostSuccessfully.getStatus())
                .body(ResponseCode.deletePostSuccessfully);
    }

    public ResponseEntity<ResponseCode> saveSharedPost(MultipartFile[] files, String[] listIdTagged, int scope,
            String caption,
            HttpServletRequest httpServletRequest,
            String sharedUserId, String sharedUserName, String sharedPostId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        Post post = this.mapperPost.convertRequestPost(scope, caption, listIdTagged, user);
        post.setSharedPostId(sharedPostId);
        post.setSharedUserId(sharedUserId);
        Post post1 = this.repositoryPost.save(post);
        // save file
        if (files != null) {
            List<String> listFileId = this.utilsHandleFile.createListUUID(files.length);
            List<String> listTypeOfFile = this.utilsHandleFile.createListTypeOfFile(files);
            for (int i = 0; i < files.length; i++) {
                this.utilsHandleFile.saveFile(files[i], userId, listFileId.get(i), listTypeOfFile.get(i));
                File file = this.mapperFile.createFile(listFileId.get(i), files[i].getOriginalFilename(),
                        listTypeOfFile.get(i),
                        post);
                this.repositoryFile.save(file);
            }
        }

        if (listIdTagged != null && (scope == 1 || scope == 2)) {
            for (int i = 0; i < listIdTagged.length; i++) {
                Notify notify = this.mapperNotify.createNotify(3, post.getId(), listIdTagged[i],
                        user.getFirstName() + " " + user.getLastName(), "taged you in a post.", userId);
                this.repositoryNotify.save(notify);
            }
        }

        Notify notify = this.mapperNotify.createNotify(7, "id=" + userId + ",postId=" + post1.getId() + ",action=share",
                sharedUserId,
                user.getFirstName() + " " + user.getLastName(), "shared your post", userId);
        this.repositoryNotify.save(notify);

        return ResponseEntity.status(ResponseCode.savePostSuccessfully.getStatus())
                .body(ResponseCode.savePostSuccessfully);
    }

    public ResponseEntity<Response> getPostFromNewFeed(HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        // get all friend.
        List<Friend> friend1 = this.repositoryFriend.getAllFriendWithReceivedUserId(userId);
        List<Friend> friend2 = this.repositoryFriend.getAllFriendWithSentUserId(userId);

        List<User> listUser = getListUserFriend(friend1, friend2);

        // get Post in database
        List<Post> listPosts = new ArrayList<>();
        for (int i = 0; i < listUser.size(); i++) {
            listPosts.addAll(this.repositoryPost.getListPostFromAnotherUser(listUser.get(i)));
        }

        // get post of user
        List<Post> listPostOfUser = this.repositoryPost.getListPost(user);
        listPosts.addAll(listPostOfUser);

        // sort listPosts
        sortListPost(listPosts);

        // get files info
        String[][][] listFile = new String[listPosts.size()][][];
        for (int i = 0; i < listPosts.size(); i++) {
            String[][] listFileOfPost = this.repositoryFile.getFileOfPost(listPosts.get(i));
            listFile[i] = listFileOfPost;
        }

        // create listResponsePost.
        List<ResponsePost> listResponsePosts = new ArrayList<>();
        for (int i = 0; i < listPosts.size(); i++) {
            // get some number of like, share and comment in post.
            int numberOfLikes = this.repositoryLike.getNumberOfLikes(listPosts.get(i));
            int numberOfComments = this.repositoryComment.numberOfCommentInPost(listPosts.get(i));
            int numberOfShares = this.repositoryPost.numberOfShare(listPosts.get(i).getId());

            ResponsePost responsePost = this.mapperPost.createResponsePost(listPosts.get(i), listFile[i], numberOfLikes,
                    numberOfComments, numberOfShares);

            listResponsePosts.add(responsePost);
        }

        // create ResponseEntity
        Response response = Response.builder()
                .object(listResponsePosts)
                .responseCode(ResponseCode.getPostSuccessfully)
                .build();

        // return
        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    // sort post to new feed
    public void sortListPost(List<Post> listPosts) {
        Collections.sort(listPosts, new Comparator<Post>() {
            @Override
            public int compare(Post p1, Post p2) {
                if (p1.getTime().isBefore(p2.getTime())) {
                    return 1;
                } else if (p1.getTime().isAfter(p2.getTime())) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }

    public List<User> getListUserFriend(List<Friend> friend1, List<Friend> friend2) {
        List<User> listUser = new ArrayList<>();
        addUserToListUserFriend(friend2, 0, listUser);
        addUserToListUserFriend(friend1, 1, listUser);
        return listUser;
    }

    public void addUserToListUserFriend(List<Friend> listFriend, int flag, List<User> listUser) {
        for (int i = 0; i < listFriend.size(); i++) {
            if (flag == 0) { // flag == 0 <=> sentUserId
                Optional optional = this.repositoryUser.findById(listFriend.get(i).getReceivedUserId());
                User user = (User) optional.get();
                listUser.add(user);
            } else {
                Optional optional = this.repositoryUser.findById(listFriend.get(i).getSentUserId());
                User user = (User) optional.get();
                listUser.add(user);
            }
        }
    }
}
