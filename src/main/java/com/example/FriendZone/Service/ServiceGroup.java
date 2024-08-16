package com.example.FriendZone.Service;

import java.io.File;
import java.lang.StackWalker.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.Comment;
import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.Group;
import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Class.MapperFile;
import com.example.FriendZone.Mapper.Class.MapperGroup;
import com.example.FriendZone.Mapper.Class.MapperNotify;
import com.example.FriendZone.Mapper.Class.MapperPost;
import com.example.FriendZone.Repository.RepositoryComment;
import com.example.FriendZone.Repository.RepositoryFile;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryGroup;
import com.example.FriendZone.Repository.RepositoryLike;
import com.example.FriendZone.Repository.RepositoryNotify;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Response.ResponsePost;
import com.example.FriendZone.Utils.UtilsHandleFile;

import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class ServiceGroup {
        @Autowired
        private MapperGroup mapperGroup;

        @Autowired
        private ServiceUser serviceUser;

        @Autowired
        private RepositoryGroup repositoryGroup;

        @Autowired
        private MapperNotify mapperNotify;

        @Autowired
        private RepositoryUser repositoryUser;

        @Autowired
        private RepositoryNotify repositoryNotify;

        @Autowired
        private UtilsHandleFile utilsHandleFile;

        @Autowired
        private MapperPost mapperPost;

        @Autowired
        private RepositoryPost repositoryPost;

        @Autowired
        private MapperFile mapperFile;

        @Autowired
        private RepositoryFile repositoryFile;

        @Autowired
        private RepositoryLike repositoryLike;

        @Autowired
        private RepositoryComment repositoryComment;

        @Autowired
        private RepositoryFriend repositoryFriend;

        public ResponseEntity<Response> createGroup(HttpServletRequest httpServletRequest, String groupName,
                        String[] arrayUserIdsInvitedByAdmin) {

                String userId = this.serviceUser.checkJwt(httpServletRequest);
                Optional optional = this.repositoryUser.findById(userId);
                User user = (User) optional.get();

                Group group = this.mapperGroup.createGroupFromRequest(groupName, userId, arrayUserIdsInvitedByAdmin);
                group.getListMemberIds().put(userId, 1);
                group = this.repositoryGroup.save(group);

                // create notify
                if (arrayUserIdsInvitedByAdmin != null) {
                        for (int i = 0; i < arrayUserIdsInvitedByAdmin.length; i++) {
                                Notify notify = this.mapperNotify.createNotify(8,
                                                "/group?groupId=" + group.getGroupId(),
                                                arrayUserIdsInvitedByAdmin[i],
                                                user.getFirstName() + " " + user.getLastName(),
                                                "invites you to join a group", userId);
                                this.repositoryNotify.save(notify);
                        }
                }

                // copy file background
                this.utilsHandleFile.copyFile(
                                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\Img\\backgrounGroup.avif",
                                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image\\"
                                                + user.getId() + "\\" + group.getGroupId() + ".avif");

                Response response = Response.builder()
                                .responseCode(ResponseCode.createGroupSuccessfully)
                                .object(group.getGroupId())
                                .build();

                return ResponseEntity.status(ResponseCode.createGroupSuccessfully.getStatus())
                                .body(response);
        }

        public ResponseEntity<ResponseCode> acceptRequest(HttpServletRequest httpServletRequest, String groupId) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                group.getListUserInvitedByAdminIds().remove(userId);
                group.getListMemberIds().put(userId, 1);
                this.repositoryGroup.save(group);

                return ResponseEntity.status(ResponseCode.acceptInviteGroup.getStatus())
                                .body(ResponseCode.acceptInviteGroup);
        }

        public ResponseEntity<ResponseCode> cancelRequest(HttpServletRequest httpServletRequest, String groupId) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                group.getListUserRequestJoinIds().remove(userId);
                this.repositoryGroup.save(group);

                return ResponseEntity.status(ResponseCode.cancelRequestJoinGroup.getStatus())
                                .body(ResponseCode.cancelRequestJoinGroup);
        }

        public ResponseEntity<ResponseCode> joinGroup(HttpServletRequest httpServletRequest, String groupId) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();
                group.getListUserRequestJoinIds().put(userId, 1);
                this.repositoryGroup.save(group);

                return ResponseEntity.status(ResponseCode.sentRequestJoinGroup.getStatus())
                                .body(ResponseCode.sentRequestJoinGroup);
        }

        public ResponseEntity<ResponseCode> uploadBackground(String groupId, MultipartFile multipart) {
                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                // old backgroundPath
                String oldPath = "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image\\"
                                + group.getCreatedUserId() + "\\" + group.getGroupId()
                                + group.getNameOfBackgroundImage();

                // delete old file.
                File f = new File(oldPath);
                boolean deleted = f.delete();
                if (deleted) {
                        System.out.println("deleted " + oldPath);
                }

                // save new file.
                this.utilsHandleFile.saveBackgroundGroup(multipart, groupId,
                                "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image\\"
                                                + group.getCreatedUserId());

                // update group in database
                group.setNameOfBackgroundImage(this.utilsHandleFile.getTailOfFile(multipart.getOriginalFilename()));
                this.repositoryGroup.save(group);

                return ResponseEntity.status(ResponseCode.updateBackgroundImageGroup.getStatus())
                                .body(ResponseCode.updateBackgroundImageGroup);
        }

        public ResponseEntity<Response> getAllMembersInGroup(String groupId, HttpServletRequest httpServletRequest) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                List<String> listUserId = new ArrayList<>();
                List<String> listUserName = new ArrayList<>();

                for (Map.Entry<String, Integer> entry : group.getListMemberIds().entrySet()) {
                        if (entry.getKey().equals(userId) == false) {
                                Optional optional1 = this.repositoryUser.findById(entry.getKey());
                                User user = (User) optional1.get();
                                listUserId.add(user.getId());
                                listUserName.add(user.getFirstName() + " " + user.getLastName());
                        }
                }

                List<List<String>> objectOfResponse = new ArrayList<>();
                objectOfResponse.add(listUserId);
                objectOfResponse.add(listUserName);

                Response response = Response.builder()
                                .responseCode(ResponseCode.getAllMembersInGroup)
                                .object(objectOfResponse)
                                .build();

                return ResponseEntity.status(ResponseCode.getAllMembersInGroup.getStatus())
                                .body(response);
        }

        // support directly
        public ResponseEntity<ResponseCode> createPost(MultipartFile[] files, String[] listIdTagged,
                        String caption,
                        HttpServletRequest httpServletRequest, int anonymous, String groupId) {

                String userId = this.serviceUser.checkJwt(httpServletRequest);
                Optional optional = this.repositoryUser.findById(userId);
                User user = (User) optional.get();

                // create post instance from request
                Post post = this.mapperPost.convertRequestPostInGroup(caption, listIdTagged, user, (Integer) anonymous,
                                groupId);

                Optional optionalGroup = this.repositoryGroup.findById(groupId);
                Group group = (Group) optionalGroup.get();
                if (group.getCreatedUserId().equals(userId) == false) {
                        post.setConfirm((Integer) 1);
                }

                post = this.repositoryPost.save(post);

                // save file
                if (files != null) {
                        List<String> listFileId = this.utilsHandleFile.createListUUID(files.length);
                        List<String> listTypeOfFile = this.utilsHandleFile.createListTypeOfFile(files);
                        for (int i = 0; i < files.length; i++) {
                                this.utilsHandleFile.saveFile(files[i], userId, listFileId.get(i),
                                                listTypeOfFile.get(i));
                                com.example.FriendZone.Entities.File file = this.mapperFile.createFile(
                                                listFileId.get(i),
                                                files[i].getOriginalFilename(),
                                                listTypeOfFile.get(i),
                                                post);
                                this.repositoryFile.save(file);
                        }
                }

                if (anonymous != 1) {
                        // create notify for user.
                        if (listIdTagged != null) {
                                for (int i = 0; i < listIdTagged.length; i++) {
                                        Notify notify = this.mapperNotify.createNotify(9,
                                                        "groupId=" + groupId + ",postId=" + post.getId(),
                                                        listIdTagged[i],
                                                        user.getFirstName() + " " + user.getLastName(),
                                                        "taged you in a post in group", user.getId());
                                        this.repositoryNotify.save(notify);
                                }
                        }
                }

                return ResponseEntity.status(ResponseCode.savePostSuccessfully.getStatus())
                                .body(ResponseCode.savePostSuccessfully);

        }

        public ResponseEntity<Response> getPost(HttpServletRequest httpServletRequest, String groupId) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                List<Post> listPost = this.repositoryPost.getPostInGroup(groupId);

                String[][][] listFiles = new String[listPost.size()][][];
                for (int i = 0; i < listPost.size(); i++) {
                        String[][] listFileOfPost = this.repositoryFile.getFileOfPost(listPost.get(i));
                        listFiles[i] = listFileOfPost;
                }

                List<ResponsePost> listResponsePosts = new ArrayList<>();
                for (int i = 0; i < listPost.size(); i++) {
                        int numberOfLikes = this.repositoryLike.getNumberOfLikes(listPost.get(i));
                        int numberOfComments = this.repositoryComment.numberOfCommentInPost(listPost.get(i));
                        ResponsePost responsePost = this.mapperPost.createResponsePostInGroup(listPost.get(i),
                                        listFiles[i],
                                        numberOfLikes, numberOfComments, 0, userId);
                        listResponsePosts.add(responsePost);
                }

                Response response = Response.builder()
                                .responseCode(ResponseCode.getPostSuccessfully)
                                .object(listResponsePosts)
                                .build();

                return ResponseEntity.status(response.getResponseCode().getStatus())
                                .body(response);
        }

        public ResponseEntity<ResponseCode> updateAdminPost(
                        MultipartFile[] files, int anonymous, String caption,
                        String[] listIdTagged, HttpServletRequest httpServletRequest,
                        int flagTaged, int flagAttached, String postId) {

                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryPost.findById(postId);
                Post post = (Post) optional.get();
                post.setCaption(caption);
                post.setAnonymousType(anonymous);

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
                                this.utilsHandleFile.saveFile(files[i], userId, listFileId.get(i),
                                                listTypeOfFile.get(i));
                                com.example.FriendZone.Entities.File file = this.mapperFile.createFile(
                                                listFileId.get(i),
                                                files[i].getOriginalFilename(),
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

        public ResponseEntity<ResponseCode> updateMemberPost(
                        MultipartFile[] files, int anonymous, String caption,
                        String[] listIdTagged, HttpServletRequest httpServletRequest,
                        int flagTaged, int flagAttached, String postId) {

                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryPost.findById(postId);
                Post post = (Post) optional.get();
                post.setCaption(caption);
                post.setAnonymousType(anonymous);
                post.setConfirm(2);

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
                                this.utilsHandleFile.saveFile(files[i], userId, listFileId.get(i),
                                                listTypeOfFile.get(i));
                                com.example.FriendZone.Entities.File file = this.mapperFile.createFile(
                                                listFileId.get(i),
                                                files[i].getOriginalFilename(),
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

        public ResponseEntity<ResponseCode> uploadComment(MultipartFile file,
                        String[] tagedId,
                        String content,
                        int level,
                        String postId,
                        String parentCommentId,
                        HttpServletRequest httpServletRequest, String groupId) {

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
                        com.example.FriendZone.Entities.File f = this.mapperFile.createFile(fileId,
                                        file.getOriginalFilename(), typeFile, null);
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
                                sendNotifyTagedInComment(10, parentCommentId, comment1.getId(), user, tagedId[i],
                                                "mentioned you in a comment of group.", post.getId(), groupId);
                        }
                }
                return ResponseEntity.status(ResponseCode.commentSuccessfully.getStatus())
                                .body(ResponseCode.commentSuccessfully);
        }

        public void sendNotifyTagedInComment(int type, String parentCommentId, String commentId, User sentUser,
                        String receivedUserId, String content, String postId, String groupId) {
                String idObject = "parentCommentId=";
                if (parentCommentId.equals("") == false) {
                        idObject = idObject + parentCommentId;
                } else {
                        idObject = idObject + "1";
                }
                idObject = idObject + ",commentId=" + commentId;
                idObject = "postId=" + postId + "," + idObject;
                idObject = "groupId=" + groupId + "," + idObject;
                String createdUserName = sentUser.getFirstName() + " " + sentUser.getLastName();
                String createdUserId = sentUser.getId();

                Notify notify = this.mapperNotify.createNotify(type, idObject, receivedUserId, createdUserName, content,
                                createdUserId);

                this.repositoryNotify.save(notify);
        }

        public ResponseEntity<Response> getMember(String groupId, HttpServletRequest httpServletRequest) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                List<String> listMutualMember = new ArrayList<>();
                createFriend(listMutualMember, group.getListMemberIds(), true, userId);

                List<String> listUnknowMember = new ArrayList<>();
                createFriend(listUnknowMember, group.getListMemberIds(), false, userId);

                List<String> listRequestMember = new ArrayList<>();
                setDataForList(group.getListUserRequestJoinIds(), listRequestMember);

                List<List<String>> responseObject = new ArrayList<>();
                responseObject.add(listMutualMember);
                responseObject.add(listUnknowMember);
                responseObject.add(listRequestMember);
                responseObject.add(createListUserName(listMutualMember));
                responseObject.add(createListUserName(listUnknowMember));
                responseObject.add(createListUserName(listRequestMember));

                Response response = Response.builder()
                                .responseCode(ResponseCode.getAllMembersInGroup)
                                .object(responseObject)
                                .build();

                return ResponseEntity.status(response.getResponseCode().getStatus())
                                .body(response);
        }

        public void setDataForList(Map<String, Integer> map, List<String> list) {
                for (Map.Entry<String, Integer> entry : map.entrySet()) {
                        list.add(entry.getKey());
                }
        }

        public boolean checkFriend(String userId, String memberId) {
                Friend friend1 = this.repositoryFriend.getFriendBySentIdAndReceivedId(userId, memberId);
                Friend friend2 = this.repositoryFriend.getFriendBySentIdAndReceivedId(memberId, userId);

                if (friend1 == null && friend2 == null) {
                        return false;
                } else {
                        return true;
                }
        }

        public void createFriend(List<String> list, Map<String, Integer> map, boolean b, String userId) {
                for (Map.Entry<String, Integer> entry : map.entrySet()) {
                        if (userId.equals(entry.getKey()) == true) {
                                continue;
                        }
                        if (checkFriend(userId, entry.getKey()) == b) {
                                list.add(entry.getKey());
                        }
                }
        }

        public List<String> createListUserName(List<String> listUserId) {
                List<String> listUserName = new ArrayList<>();
                for (int i = 0; i < listUserId.size(); i++) {
                        Optional optional = this.repositoryUser.findById(listUserId.get(i));
                        User user = (User) optional.get();
                        listUserName.add(user.getFirstName() + " " + user.getLastName());
                }
                return listUserName;
        }

        public ResponseEntity<ResponseCode> deleteRequest(String groupId, String userId) {
                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                Optional optional1 = this.repositoryUser.findById(group.getCreatedUserId());
                User user = (User) optional1.get();

                group.getListUserRequestJoinIds().remove(userId);
                this.repositoryGroup.save(group);

                // create notify
                Notify notify = this.mapperNotify.createNotify(11, "groupId=" + groupId, userId,
                                user.getFirstName() + " " + user.getLastName(), "deleted your request to join group.",
                                user.getId());

                this.repositoryNotify.save(notify);

                return ResponseEntity.status(ResponseCode.deleteRequestJoin.getStatus())
                                .body(ResponseCode.deleteRequestJoin);
        }

        public ResponseEntity<ResponseCode> acceptRequest(String groupId, String userId) {
                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                Optional optional1 = this.repositoryUser.findById(group.getCreatedUserId());
                User user = (User) optional1.get();

                group.getListUserRequestJoinIds().remove(userId);
                group.getListMemberIds().put(userId, 1);
                this.repositoryGroup.save(group);

                // create notify
                Notify notify = this.mapperNotify.createNotify(12, "groupId=" + groupId, userId,
                                user.getFirstName() + " " + user.getLastName(), "accepted your request to join group.",
                                user.getId());

                this.repositoryNotify.save(notify);

                return ResponseEntity.status(ResponseCode.acceptRequest.getStatus())
                                .body(ResponseCode.acceptRequest);
        }

        public ResponseEntity<ResponseCode> kickMember(String groupId, String userId) {
                Optional optional = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional.get();

                Optional optional1 = this.repositoryUser.findById(group.getCreatedUserId());
                User user = (User) optional1.get();

                group.getListMemberIds().remove(userId);
                this.repositoryGroup.save(group);

                // create notify
                Notify notify = this.mapperNotify.createNotify(13, "groupId=" + groupId, userId,
                                user.getFirstName() + " " + user.getLastName(), "kicked you out of a group.",
                                user.getId());

                this.repositoryNotify.save(notify);

                return ResponseEntity.status(ResponseCode.acceptRequest.getStatus())
                                .body(ResponseCode.acceptRequest);
        }

        public ResponseEntity<Response> getPostToConfirm(HttpServletRequest httpServletRequest, String groupId) {
                String userId = this.serviceUser.checkJwt(httpServletRequest);

                List<Post> listPost = this.repositoryPost.getPostNotConfirmInGroup(groupId);

                String[][][] listFiles = new String[listPost.size()][][];
                for (int i = 0; i < listPost.size(); i++) {
                        String[][] listFileOfPost = this.repositoryFile.getFileOfPost(listPost.get(i));
                        listFiles[i] = listFileOfPost;
                }

                List<ResponsePost> listResponsePosts = new ArrayList<>();
                for (int i = 0; i < listPost.size(); i++) {
                        int numberOfLikes = this.repositoryLike.getNumberOfLikes(listPost.get(i));
                        int numberOfComments = this.repositoryComment.numberOfCommentInPost(listPost.get(i));
                        ResponsePost responsePost = this.mapperPost.createResponsePostInGroup(listPost.get(i),
                                        listFiles[i],
                                        numberOfLikes, numberOfComments, 0, userId);
                        listResponsePosts.add(responsePost);
                }

                Response response = Response.builder()
                                .responseCode(ResponseCode.getPostSuccessfully)
                                .object(listResponsePosts)
                                .build();

                return ResponseEntity.status(response.getResponseCode().getStatus())
                                .body(response);
        }

        public ResponseEntity<ResponseCode> confirmPost(String postId, String groupId) {
                Optional optional = this.repositoryPost.findById(postId);
                Post post = (Post) optional.get();
                post.setConfirm(null);
                this.repositoryPost.save(post);

                Optional optional1 = this.repositoryGroup.findById(groupId);
                Group group = (Group) optional1.get();

                Optional optional2 = this.repositoryUser.findById(group.getCreatedUserId());
                User user = (User) optional2.get();

                Notify notify = this.mapperNotify.createNotify(14, "groupId=" + groupId + ",postId=" + postId,
                                post.getUser().getId(),
                                user.getFirstName() + " " + user.getLastName(), "accepted your post in a group.",
                                group.getCreatedUserId());
                this.repositoryNotify.save(notify);

                return ResponseEntity.status(ResponseCode.confirmPost.getStatus())
                                .body(ResponseCode.confirmPost);
        }

        public ResponseEntity<ResponseCode> deletePost(String postId) {
                Optional optional = this.repositoryPost.findById(postId);
                Post post = (Post) optional.get();

                String userId = post.getUser().getId();

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

}
