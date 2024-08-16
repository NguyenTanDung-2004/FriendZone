package com.example.FriendZone.Mapper.Class;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.LikePost;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperPost;
import com.example.FriendZone.Repository.RepositoryLike;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Request.RequestCreationPost;
import com.example.FriendZone.Response.ResponsePost;
import com.example.FriendZone.Utils.UtilsHandleFile;

@Component
public class MapperPost implements InterfaceMapperPost {
        @Autowired
        private RepositoryUser repositoryUser;

        @Autowired
        private UtilsHandleFile utilsHandleFile;

        @Autowired
        private RepositoryLike repositoryLike;

        @Override
        public Post convertRequestPost(int Scope, String caption, String[] id_taged_user, User user) {
                return Post.builder()
                                .scope(Scope)
                                .caption(caption)
                                .time(LocalDateTime.now())
                                .idTagedUser(id_taged_user)
                                .user(user)
                                .build();

        }
        // private String caption;
        // private HashSet<String> idTagedUser;
        // private Date time;
        // private int scope; // 1: friend, 2: public, 3: only you
        // private ArrayList<String> linkFile;
        // private String userId;

        @Override
        public ResponsePost createResponsePost(Post post, String[][] fileNameIdType,
                        int numberOfLikes, int numberOfComments, int numberOfShares) {
                return ResponsePost.builder()
                                .id(post.getId())
                                .caption(post.getCaption())
                                .idTagedUser(post.getIdTagedUser())
                                .nameTagedUser(createArrayUserName(post.getIdTagedUser()))
                                .time(post.getTime())
                                .scope(post.getScope())
                                .userId(post.getUser().getId())
                                .userName(post.getUser().getFirstName() + " " + post.getUser().getLastName())
                                .fileNames(getSpecificArray(fileNameIdType, 0))
                                .fileNameOther(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileNameImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .fileTypes(getSpecificArray(fileNameIdType, 2))
                                .fileIds(getSpecificArray(fileNameIdType, 1))
                                .fileIdOther(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileIdImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .tailOfFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video")))
                                .tailOfOthersFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                "")))
                                .numberOfLikes(numberOfLikes)
                                .numberOfComments(numberOfComments)
                                .numberOfShares(numberOfShares)
                                // shared
                                .sharedUserId(post.getSharedUserId())
                                .sharedUserName(createUserNameFromUserId(post.getSharedUserId()))
                                .sharedPostId(post.getSharedPostId())
                                .build();
        }

        private String createUserNameFromUserId(String userId) {
                if (userId == null) {
                        return null;
                }
                Optional optional = this.repositoryUser.findById(userId);
                User user = (User) optional.get();
                return user.getFirstName() + " " + user.getLastName();
        }

        private String[] createArrayUserName(String[] idTagedUser) {
                if (idTagedUser == null) {
                        return null;
                }
                String[] arrayUserName = new String[idTagedUser.length];
                for (int i = 0; i < idTagedUser.length; i++) {
                        arrayUserName[i] = createUserNameFromUserId(idTagedUser[i]);
                }
                return arrayUserName;
        }

        private String[] getSpecificArray(String[][] fileNameIdType, int index) {
                String[] array = new String[fileNameIdType.length];
                for (int i = 0; i < array.length; i++) {
                        array[i] = fileNameIdType[i][index];
                }
                return array;
        }

        private List<String> categorizeOtherAndVideoOrImg(String[] fileNameOrId, String[] types, String specificType1,
                        String specificType2) {
                List<String> result = new ArrayList<>();
                for (int i = 0; i < fileNameOrId.length; i++) {
                        if (types[i].equals(specificType1) || types[i].equals(specificType2)) {
                                result.add(fileNameOrId[i]);
                        }
                }
                return result;
        }

        private List<String> getTailOfFile(List<String> fileName) {
                List<String> result = new ArrayList<>();
                for (int i = 0; i < fileName.size(); i++) {
                        result.add(this.utilsHandleFile.getTailOfFile(fileName.get(i)));
                }
                return result;
        }

        @Override
        public ResponsePost createResponsePostForNewFeed(Post post, String[][] fileNameIdType, int numberOfLikes,
                        int numberOfComments, int numberOfShares, String typeOfUser) {
                return ResponsePost.builder()
                                .id(post.getId())
                                .caption(post.getCaption())
                                .idTagedUser(post.getIdTagedUser())
                                .nameTagedUser(createArrayUserName(post.getIdTagedUser()))
                                .time(post.getTime())
                                .scope(post.getScope())
                                .userId(post.getUser().getId())
                                .userName(post.getUser().getFirstName() + " " + post.getUser().getLastName())
                                .fileNames(getSpecificArray(fileNameIdType, 0))
                                .fileNameOther(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileNameImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .fileTypes(getSpecificArray(fileNameIdType, 2))
                                .fileIds(getSpecificArray(fileNameIdType, 1))
                                .fileIdOther(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileIdImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .tailOfFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video")))
                                .tailOfOthersFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                "")))
                                .numberOfLikes(numberOfLikes)
                                .numberOfComments(numberOfComments)
                                .numberOfShares(numberOfShares)
                                // shared
                                .sharedUserId(post.getSharedUserId())
                                .sharedUserName(createUserNameFromUserId(post.getSharedUserId()))
                                .sharedPostId(post.getSharedPostId())
                                // newFeed
                                .typeOfUser(typeOfUser)
                                .build();
        }

        @Override
        public Post convertRequestPostInGroup(String caption, String[] id_taged_user, User user, Integer anonymous,
                        String groupId) {
                return Post.builder()
                                .caption(caption)
                                .anonymousType(anonymous)
                                .user(user)
                                .idTagedUser(id_taged_user)
                                .time(LocalDateTime.now())
                                .groupId(groupId)
                                .build();
        }

        @Override
        public ResponsePost createResponsePostInGroup(Post post, String[][] fileNameIdType, int numberOfLikes,
                        int numberOfComments, int numberOfShares, String userId) {
                return ResponsePost.builder()
                                .id(post.getId())
                                .caption(post.getCaption())
                                .idTagedUser(post.getIdTagedUser())
                                .nameTagedUser(createArrayUserName(post.getIdTagedUser()))
                                .time(post.getTime())
                                .scope(post.getScope())
                                .userId(post.getUser().getId())
                                .userName(post.getUser().getFirstName() + " " + post.getUser().getLastName())
                                .fileNames(getSpecificArray(fileNameIdType, 0))
                                .fileNameOther(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileNameImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .fileTypes(getSpecificArray(fileNameIdType, 2))
                                .fileIds(getSpecificArray(fileNameIdType, 1))
                                .fileIdOther(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                ""))
                                .fileIdImgOrVideo(categorizeOtherAndVideoOrImg(getSpecificArray(fileNameIdType, 1),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video"))
                                .tailOfFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image",
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Video")))
                                .tailOfOthersFile(getTailOfFile(categorizeOtherAndVideoOrImg(
                                                getSpecificArray(fileNameIdType, 0),
                                                getSpecificArray(fileNameIdType, 2),
                                                "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Others",
                                                "")))
                                .numberOfLikes(numberOfLikes)
                                .numberOfComments(numberOfComments)
                                .numberOfShares(numberOfShares)
                                // shared
                                .sharedUserId(post.getSharedUserId())
                                .sharedUserName(createUserNameFromUserId(post.getSharedUserId()))
                                .sharedPostId(post.getSharedPostId())
                                // group
                                .flagPostOwner(createFlagPostOwner(post, userId)) // id of user request
                                .anonymous(post.getAnonymousType())
                                .flagLiked(createFlagLiked(post, userId))
                                .build();
        }

        public int createFlagPostOwner(Post post, String userId) {
                if (post.getUser().getId().equals(userId)) {
                        return 1; // own
                } else {
                        return 0;
                }
        }

        public int createFlagLiked(Post post, String userId) {
                Optional optionalUser = this.repositoryUser.findById(userId);
                User user = (User) optionalUser.get();

                LikePost likePost = this.repositoryLike.getLikePost(post, user);

                if (likePost != null) {
                        return 1;
                } else {
                        return 0;
                }
        }

}
