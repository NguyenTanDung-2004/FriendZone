package com.example.FriendZone.Mapper.Class;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.Comment;
import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperComment;
import com.example.FriendZone.Repository.RepositoryComment;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.ResponseComment;
import com.example.FriendZone.Utils.UtilsHandleFile;

@Component
public class MapperComment implements InterfaceMapperComment {

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private RepositoryComment repositoryComment;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Override
    public ResponseComment createResponseComment(User user, String[] tagedUserId, String content,
            int numberOfLikes,
            LocalDateTime time, int level, String fileId, String fileType, String fileName, String commentId,
            User userSendRequest) {

        return ResponseComment.builder()
                .userId(user.getId())
                .userName(user.getFirstName() + " " + user.getLastName())
                .listTagedUserId(tagedUserId)
                .listTagedUserName(createTagedUserName(tagedUserId))
                .content(content)
                .numberOfLikes(numberOfLikes)
                .time(time)
                .level(level)
                .linkFile(createLinkFile(fileId, user.getId(), fileType, fileName))
                .typeImgOrVideo(createTypeImgOrVideo(fileType))
                .commentId(commentId)
                .numberOfReplies(this.repositoryComment.getNumberOfCommentChild(commentId))
                .flagLike(checkUserLiked(userSendRequest, commentId))
                .build();
    }

    public String[] createTagedUserName(String[] tagedUserId) {
        if (tagedUserId != null) {
            String[] result = new String[tagedUserId.length];
            for (int i = 0; i < result.length; i++) {
                Optional optional = this.repositoryUser.findById(tagedUserId[i]);
                User user = (User) optional.get();
                result[i] = user.getFirstName() + " " + user.getLastName();
            }
            return result;
        } else {
            return null;
        }
    }

    public String createLinkFile(String fileId, String userId, String fileType, String fileName) {
        if (fileId == null) {
            return "";
        } else {
            String tailOfFile = this.utilsHandleFile.getTailOfFile(fileName);
            String absolutePath = fileType + "/" + userId + "/" + fileId + tailOfFile;
            absolutePath = absolutePath.replace(
                    "C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static",
                    "..");
            return absolutePath;
        }
    }

    public String createTypeImgOrVideo(String fileType) {
        if (fileType == null) {
            return "";
        } else {
            if (fileType.charAt(fileType.length() - 1) == 'o') {
                return "Video";
            } else {
                return "Img";
            }
        }
    }

    public int checkUserLiked(User user, String commentId) {
        Optional optional = this.repositoryComment.findById(commentId);
        Comment comment = (Comment) optional.get();
        if (user.getListComment().contains(comment)) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public ResponseComment createResponseComment(Comment comment, User userSendRequest) {
        User user = comment.getUser();
        String[] tagedUserId = comment.getTagedUserId();
        String content = comment.getContent();
        int numberOfLikes = comment.getNumberOfLikes();
        LocalDateTime time = comment.getTime();
        int level = comment.getLevel();
        File f = comment.getF();
        String fileId = "";
        String fileType = "";
        String fileName = "";
        if (f != null) {
            fileId = f.getId();
            fileType = f.getType();
            fileName = f.getName();
        }
        String commentId = comment.getId();
        String linkFile = "";
        if (f != null) {
            linkFile = createLinkFile(fileId, user.getId(), fileType, fileName);
        }
        String typeImgOrVideo = "";
        if (f != null) {
            typeImgOrVideo = createTypeImgOrVideo(fileType);
        }
        return ResponseComment.builder()
                .userId(user.getId())
                .userName(user.getFirstName() + " " + user.getLastName())
                .listTagedUserId(tagedUserId)
                .listTagedUserName(createTagedUserName(tagedUserId))
                .content(content)
                .numberOfLikes(numberOfLikes)
                .time(time)
                .level(level)
                .linkFile(linkFile)
                .typeImgOrVideo(typeImgOrVideo)
                .commentId(commentId)
                .numberOfReplies(this.repositoryComment.getNumberOfCommentChild(commentId))
                .flagLike(checkUserLiked(userSendRequest, commentId))
                .build();
    }
}
