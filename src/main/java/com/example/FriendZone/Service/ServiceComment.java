package com.example.FriendZone.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.Comment;
import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Class.MapperComment;
import com.example.FriendZone.Mapper.Class.MapperFile;
import com.example.FriendZone.Mapper.Class.MapperNotify;
import com.example.FriendZone.Repository.RepositoryComment;
import com.example.FriendZone.Repository.RepositoryFile;
import com.example.FriendZone.Repository.RepositoryNotify;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Response.ResponseComment;
import com.example.FriendZone.Utils.UtilsHandleFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class ServiceComment {

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private RepositoryPost repositoryPost;

    @Autowired
    private MapperFile mapperFile;

    @Autowired
    private RepositoryFile repositoryFile;

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private RepositoryComment repositoryComment;

    @Autowired
    private MapperComment mapperComment;

    @Autowired
    private MapperNotify mapperNotify;

    @Autowired
    private RepositoryNotify repositoryNotify;

    public ResponseEntity<ResponseCode> uploadComment(MultipartFile file,
            String[] tagedId,
            String content,
            int level,
            String postId,
            String parentCommentId,
            HttpServletRequest httpServletRequest) {

        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional1 = this.repositoryUser.findById(userId);
        User user = (User) optional1.get();
        // get post
        Optional optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();

        Comment comment = new Comment();

        if (file != null) {
            String fileId = this.utilsHandleFile.createUUID();
            String typeFile = this.utilsHandleFile.getComparableFolder(file);
            File f = this.mapperFile.createFile(fileId, file.getOriginalFilename(), typeFile, null);
            this.utilsHandleFile.saveFile(file, userId, fileId, typeFile);
            this.repositoryFile.save(f);
            comment.setF(f);
        }

        if (tagedId != null) {
            comment.setTagedUserId(tagedId);
        }

        comment.setTime(LocalDateTime.now());
        comment.setContent(content);
        comment.setIdParentComment(parentCommentId);
        comment.setLevel(level);
        comment.setNumberOfLikes(0);
        comment.setUser(user);
        comment.setPost(post);

        Comment comment1 = this.repositoryComment.save(comment);

        if (tagedId != null) {
            for (int i = 0; i < tagedId.length; i++) {
                sendNotifyTagedInComment(6, parentCommentId, comment1.getId(), user, tagedId[i],
                        "mentioned you in a comment.", post.getId());
            }
        }
        return ResponseEntity.status(ResponseCode.commentSuccessfully.getStatus())
                .body(ResponseCode.commentSuccessfully);
    }

    public void sendNotifyTagedInComment(int type, String parentCommentId, String commentId, User sentUser,
            String receivedUserId, String content, String postId) {
        String idObject = "parentCommentId=";
        if (parentCommentId.equals("") == false) {
            idObject = idObject + parentCommentId;
        } else {
            idObject = idObject + "1";
        }
        idObject = idObject + ",commentId=" + commentId;
        idObject = "postId=" + postId + "," + idObject;
        String createdUserName = sentUser.getFirstName() + " " + sentUser.getLastName();
        String createdUserId = sentUser.getId();

        Notify notify = this.mapperNotify.createNotify(type, idObject, receivedUserId, createdUserName, content,
                createdUserId);

        this.repositoryNotify.save(notify);
    }

    public ResponseEntity<Response> getComment(String postId, HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional<User> optional1 = this.repositoryUser.findById(userId);
        User userSendRequest = optional1.get();

        Optional optional = this.repositoryPost.findById(postId);
        Post post = (Post) optional.get();
        List<List<Object>> object = this.repositoryComment.getAllInfoComment(post);
        List<ResponseComment> listResponseComment = new ArrayList<>();
        for (int i = 0; i < object.size(); i++) {
            ResponseComment responseComment = this.mapperComment.createResponseComment((User) object.get(i).get(0),
                    (String[]) object.get(i).get(1), (String) object.get(i).get(2), (Integer) object.get(i).get(3),
                    (LocalDateTime) object.get(i).get(4), (Integer) object.get(i).get(5),
                    (String) object.get(i).get(6), (String) object.get(i).get(7), (String) object.get(i).get(8),
                    (String) object.get(i).get(9), userSendRequest);
            listResponseComment.add(responseComment);
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.getCommentSuccessfully)
                .object(listResponseComment)
                .build();
        return ResponseEntity.status(ResponseCode.getCommentSuccessfully.getStatus())
                .body(response);
    }

    @Transactional
    public ResponseEntity<ResponseCode> likeComment(HttpServletRequest httpServletRequest, String commentId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        Optional optional1 = this.repositoryComment.findById(commentId);
        Comment comment = (Comment) optional1.get();
        comment.setNumberOfLikes(comment.getNumberOfLikes() + 1);
        user.getListComment().add(comment);

        this.repositoryUser.save(user);
        comment.getListUser().add(user);
        this.repositoryComment.save(comment);
        return ResponseEntity.status(ResponseCode.likeCommentSuccessfully.getStatus())
                .body(ResponseCode.likeCommentSuccessfully);
    }

    @Transactional
    public ResponseEntity<ResponseCode> deleteLikeComment(HttpServletRequest httpServletRequest, String commentId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        Optional optional1 = this.repositoryComment.findById(commentId);
        Comment comment = (Comment) optional1.get();
        comment.setNumberOfLikes(comment.getNumberOfLikes() - 1);
        user.getListComment().remove(comment);
        comment.getListUser().remove(user);

        this.repositoryUser.save(user);
        this.repositoryComment.save(comment);
        return ResponseEntity.status(ResponseCode.deleteLikeCommentSuccessfully.getStatus())
                .body(ResponseCode.deleteLikeCommentSuccessfully);
    }

    public ResponseEntity<Response> getCommentChild(HttpServletRequest httpServletRequest, String commentParentId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        // get list comment
        List<Comment> listComment = this.repositoryComment.getCommentChild(commentParentId);
        List<ResponseComment> listResponseComment = new ArrayList<>();

        for (int i = 0; i < listComment.size(); i++) {
            ResponseComment responseComment = this.mapperComment.createResponseComment(listComment.get(i), user);
            listResponseComment.add(responseComment);
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.getCommentSuccessfully)
                .object(listResponseComment)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    public ResponseEntity<ResponseCode> editComment(HttpServletRequest httpServletRequest, String commentId,
            MultipartFile file, String[] listTagedFriendId, String content, int deleteFile, int deleteTag) {

        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryComment.findById(commentId);
        Comment comment = (Comment) optional.get();
        comment.setContent(content);
        File deletedFile = null;
        if (file != null) {
            if (comment.getF() != null) {
                this.utilsHandleFile.delete1File(comment.getF().getId(), comment.getF().getName(),
                        comment.getF().getType(),
                        userId);
                deletedFile = comment.getF();
            }
            String fileId = this.utilsHandleFile.createUUID();
            String typeFile = this.utilsHandleFile.getComparableFolder(file);
            File f = this.mapperFile.createFile(fileId, file.getOriginalFilename(), typeFile, null);
            this.utilsHandleFile.saveFile(file, userId, fileId, typeFile);
            this.repositoryFile.save(f);
            comment.setF(f);
        } else {
            if (deleteFile == 1) {
                if (comment.getF() != null) {
                    this.utilsHandleFile.delete1File(comment.getF().getId(), comment.getF().getName(),
                            comment.getF().getType(),
                            userId);
                    deletedFile = comment.getF();
                    comment.setF(null);
                }
            }
        }
        if (listTagedFriendId != null) {
            comment.setTagedUserId(listTagedFriendId);
        } else {
            if (deleteTag == 1) {
                comment.setTagedUserId(listTagedFriendId);
            }
        }
        this.repositoryComment.save(comment);
        if (deletedFile != null) {
            this.repositoryFile.delete(deletedFile);
        }
        return ResponseEntity.status(ResponseCode.editCommentSuccessfully.getStatus())
                .body(ResponseCode.editCommentSuccessfully);
    }

    @Transactional
    public ResponseEntity<ResponseCode> deleteComment(String commentId, HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optional = this.repositoryComment.findById(commentId);
        Comment comment = (Comment) optional.get();

        File f = comment.getF();
        this.repositoryComment.delete(comment);
        if (f != null) {
            this.repositoryFile.delete(f);
            this.utilsHandleFile.delete1File(f.getId(), f.getName(), f.getType(), userId);
        }

        return ResponseEntity.status(ResponseCode.deleteCommentSuccessfully.getStatus())
                .body(ResponseCode.deleteCommentSuccessfully);
    }

}
