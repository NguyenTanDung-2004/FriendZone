package com.example.FriendZone.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.management.Notification;
import javax.swing.text.html.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.LikePost;
import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Exception.ExceptionErrorCode;
import com.example.FriendZone.Exception.ExceptionUser;
import com.example.FriendZone.Mapper.Class.MapperFile;
import com.example.FriendZone.Mapper.Class.MapperFriend;
import com.example.FriendZone.Mapper.Class.MapperNotify;
import com.example.FriendZone.Mapper.Class.MapperPost;
import com.example.FriendZone.Mapper.Class.MapperUser;
import com.example.FriendZone.Repository.RepositoryComment;
import com.example.FriendZone.Repository.RepositoryFile;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryLike;
import com.example.FriendZone.Repository.RepositoryNotify;
import com.example.FriendZone.Repository.RepositoryPost;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Request.RequestAuthenticationUser;
import com.example.FriendZone.Request.RequestCreationUser;
import com.example.FriendZone.Request.RequestUpdateDetail;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Response.ResponseNotify;
import com.example.FriendZone.Response.ResponsePost;
import com.example.FriendZone.Utils.UtilsEncryptPassword;
import com.example.FriendZone.Utils.UtilsHandleEmail;
import com.example.FriendZone.Utils.UtilsHandleFile;
import com.example.FriendZone.Utils.UtilsHandleJwtToken;

import jakarta.mail.Multipart;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class ServiceUser {
    // value in application.properties
    @Value("${cookie.jwt.time}")
    private int jwtTime;

    // dependencies injection
    @Autowired
    private RepositoryComment repositoryComment;

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private MapperUser mapperUser;

    @Autowired
    private UtilsEncryptPassword utilsEncryptPassword;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private RepositoryFriend repositoryFriend;

    @Autowired
    private MapperFriend mapperFriend;

    @Autowired
    private MapperNotify mapperNotify;

    @Autowired
    private RepositoryNotify repositoryNotify;

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

    // support directly
    public ResponseEntity<ResponseCode> createUser(RequestCreationUser request) {
        // check email exist in database
        String email = request.getEmail();
        String id = this.repositoryUser.getUserIdFromEmail(email);
        if (id == null) { // if email not exist
            User user = this.mapperUser.convertRequestUser(request);
            user.setPassword(this.utilsEncryptPassword.encryptPassword(request.getPassword()));
            user.setImg("../Img/ImgUserFriendZone.png");
            this.repositoryUser.save(user);
            this.utilsHandleFile.createFolder(user.getId());
            this.utilsHandleFile.copyFile(
                    "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\Img\\ImgUserFriendZone.png",
                    "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image\\"
                            + user.getId() + "\\avatar.jpg");
            this.utilsHandleFile.copyFile(
                    "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\Img\\ImageBackground.jpg",
                    "C:\\Users\\user\\Downloads\\TaiLieuHocTap\\Project_FriendZone\\FriendZone\\FriendZone\\src\\main\\resources\\static\\FileUser\\Image\\"
                            + user.getId() + "\\background.jpg");
            return ResponseEntity.status(ResponseCode.createUserSuccessfully.getStatus())
                    .body(ResponseCode.createUserSuccessfully);
        } else { // if email exist
            throw new ExceptionUser(ExceptionErrorCode.emailExistInDatabase);
        }
    }

    // support directly
    public ResponseEntity<ResponseCode> loginWithOutJwtToken(RequestAuthenticationUser requestAuthenticationUser,
            HttpServletRequest req, HttpServletResponse resp) {
        String userID = checkUserPassword(requestAuthenticationUser);
        if (userID.equals("notFound")) {
            throw new ExceptionUser(ExceptionErrorCode.emailOrPasswordWrong);
        } else {
            String jwtToken = this.utilsHandleJwtToken.createToken(userID);
            setCookie(resp, "jwtToken", jwtToken);
            return ResponseEntity.status(ResponseCode.sendTokenSuccessfully.getStatus())
                    .body(ResponseCode.sendTokenSuccessfully);
        }
    }

    // suport of support
    public void setCookie(HttpServletResponse resp, String nameCookie, String valueCookie) {
        Cookie cookie = new Cookie(nameCookie, valueCookie);
        cookie.setHttpOnly(false); // it is used to access cookie from client
        cookie.setSecure(true); // Ensure the cookie is only sent over HTTPS
        cookie.setMaxAge(jwtTime);
        cookie.setPath("/"); // Cookie will be available to the entire application
        resp.addCookie(cookie);
    }

    // support of support
    public String getCookie(HttpServletRequest req, String nameCk) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (nameCk.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return "notFound";
    }

    // suport of support
    public String checkUserPassword(RequestAuthenticationUser request) {
        User user = this.repositoryUser.getUserByEmail(request.getUserName());
        if (user != null) {
            if (this.utilsEncryptPassword.checkPassword(request.getPassword(), user.getPassword()) == 1) {
                return user.getId();
            }
        }
        return "notFound";
    }

    // support directly
    public ResponseEntity<ResponseCode> sendCodeForgot(String email) {
        User user = this.repositoryUser.getUserByEmail(email);
        if (user == null) {
            throw new ExceptionUser(ExceptionErrorCode.emailIsNotExistInDatabase);
        } else {
            this.utilsHandleEmail.setRecipient(email);
            this.utilsHandleEmail.setSubject("This is code to reset your Password in FriendZone!");
            this.utilsHandleEmail.setMsgBody("Your code is: " + this.utilsHandleEmail.createRandom());
            return ResponseEntity.status(this.utilsHandleEmail.sendSimpleEmail().getStatus())
                    .body(this.utilsHandleEmail.sendSimpleEmail());
        }
    }

    // support directly
    public ResponseEntity<ResponseCode> checkCode(String email, String code) {
        User user = this.repositoryUser.getUserByEmail(email);
        if (user.getCode().equals(code)) {
            return ResponseEntity.status(ResponseCode.checkCodeTrue.getStatus())
                    .body(ResponseCode.checkCodeTrue);
        } else {
            throw new ExceptionUser(ExceptionErrorCode.checkCodeWrong);
        }
    }

    // support directly
    public ResponseEntity<ResponseCode> updatePassword(String email, String password) {
        User user = this.repositoryUser.getUserByEmail(email);
        String encryptedPassword = this.utilsEncryptPassword.encryptPassword(password);
        user.setPassword(encryptedPassword);
        this.repositoryUser.save(user);
        return ResponseEntity.status(ResponseCode.updateCodeSuccessfully.getStatus())
                .body(ResponseCode.updateCodeSuccessfully);
    }

    // support directly
    public String checkJwt(HttpServletRequest httpServletRequest) {
        try {
            String jwtToken = this.getCookie(httpServletRequest, "jwtToken");
            if (jwtToken.equals("notFound") == true) {
                return "notFound";
            } else {
                String userId = this.utilsHandleJwtToken.verifyToken(jwtToken);
                return userId;
            }
        } catch (Exception e) {
            return "notFound";
        }
    }

    // support directly
    public ResponseEntity<Response> getEditDetail(HttpServletRequest httpServletRequest) {
        String userId = checkJwt(httpServletRequest);
        if (userId != "notFound") {
            Optional option = this.repositoryUser.findById(userId);
            User user = (User) option.get();
            Response response = new Response();
            response.setResponseCode(ResponseCode.getDetailUserSuccessfully);
            response.setObject(this.mapperUser.convertUserToEditDetailUser(user));
            return ResponseEntity.status(response.getResponseCode().getStatus())
                    .body(response);
        } else {
            throw new ExceptionUser(ExceptionErrorCode.verifyTokenFail);
        }
    }

    // support directly
    public ResponseEntity<Response> getEditDetailOfAnotherClient(String urlId) {
        String userId = urlId;
        Optional option = this.repositoryUser.findById(userId);
        User user = (User) option.get();
        Response response = new Response();
        response.setResponseCode(ResponseCode.getDetailUserSuccessfully);
        response.setObject(this.mapperUser.convertUserToEditDetailUser(user));
        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    // support directly
    public ResponseEntity<ResponseCode> updateEditDetail(HttpServletRequest httpServletRequest,
            RequestUpdateDetail requestUpdateDetail) {
        String userId = checkJwt(httpServletRequest);
        if (userId != "notFound") {
            User user = this.mapperUser.convertRequestUpdate(requestUpdateDetail, userId);
            user.setId(userId);
            this.repositoryUser.save(user);
            return ResponseEntity.status(ResponseCode.updateDetailSuccessfully.getStatus())
                    .body(ResponseCode.updateDetailSuccessfully);
        } else {
            throw new ExceptionUser(ExceptionErrorCode.verifyTokenFail);
        }
    }

    // support directly
    public ResponseEntity<ResponseCode> addFriend(HttpServletRequest httpServletRequest, String urlId) {
        String userId = checkJwt(httpServletRequest);
        Friend friend = this.mapperFriend.createAddFriend(userId, urlId);
        this.repositoryFriend.save(friend);
        // create notification
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        String createdUserName = user.getFirstName() + " " + user.getLastName();
        String content = "sent you a friend request.";
        Notify notify = this.mapperNotify.createNotify(4, userId, urlId, createdUserName, content, userId);
        this.repositoryNotify.save(notify);
        // create notification
        return ResponseEntity.status(ResponseCode.addFriendSuccessfully.getStatus())
                .body(ResponseCode.addFriendSuccessfully);
    }

    // support directly
    public ResponseEntity<ResponseCode> deleteFriend(HttpServletRequest httpServletRequest, String urlId) {
        String userId = checkJwt(httpServletRequest);
        Friend friend = this.repositoryFriend.getFriendBySentIdAndReceivedId(userId, urlId);
        if (friend == null) {
            Friend friend1 = this.repositoryFriend.getFriendBySentIdAndReceivedId(urlId, userId);
            this.repositoryFriend.delete(friend1);
        } else {
            this.repositoryFriend.delete(friend);
        }
        return ResponseEntity.status(ResponseCode.deleteFriendSuccessfully.getStatus())
                .body(ResponseCode.deleteFriendSuccessfully);
    }

    // support directly
    public ResponseEntity<ResponseCode> confirmFriend(HttpServletRequest httpServletRequest, String urlId) {
        String userId = checkJwt(httpServletRequest);
        Friend friend = this.repositoryFriend.getFriendBySentIdAndReceivedId(urlId, userId);
        friend.setStatus(2);
        this.repositoryFriend.save(friend);
        // create notification
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        String createdUserName = user.getFirstName() + " " + user.getLastName();
        String content = "confirmed your friend request.";
        Notify notify = this.mapperNotify.createNotify(5, userId, urlId, createdUserName, content, userId);
        this.repositoryNotify.save(notify);
        // create notification
        return ResponseEntity.status(ResponseCode.confirmFriendSuccessfully.getStatus())
                .body(ResponseCode.confirmFriendSuccessfully);
    }

    // support directly
    public ResponseEntity<Response> getTop15Notifications(HttpServletRequest httpServletRequest) {
        String userId = checkJwt(httpServletRequest);
        Response response = new Response();
        List<ResponseNotify> listResponseNotify = this.mapperNotify
                .createListResponseNotify(this.repositoryNotify.getTop15Notify(userId));
        response.setResponseCode(ResponseCode.get15NotificationsSuccessfully);
        response.setObject(listResponseNotify);
        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    // support directly
    public ResponseEntity<Response> get6Friend(HttpServletRequest httpServletRequest,
            String urlId) {

        String userId = "";

        if (urlId.equals("") == false) {
            userId = urlId;
        } else {
            userId = checkJwt(httpServletRequest);
        }
        List<Friend> listFriendWithSentUserId = this.repositoryFriend.getTop6FriendWithSentUserId(userId);
        List<Friend> listFriendWithReceivedUserId = this.repositoryFriend.getTop6FriendWithReceivedUserId(userId);

        List<Friend> listResult = createListResult(listFriendWithSentUserId, listFriendWithReceivedUserId);
        List<String> listFriendId = createListFriendId(userId, listResult);
        List<String> listFriendName = createListFriendName(listFriendId);
        List<List<String>> listResponse = new ArrayList<>();
        listResponse.add(listFriendId);
        listResponse.add(listFriendName);

        Response response = Response.builder()
                .responseCode(ResponseCode.getFriendSuccessfully)
                .object(listResponse)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    // support of support
    public List<Friend> createListResult(List<Friend> listFriendWithSentUserId,
            List<Friend> listFriendWithReceivedUserId) {
        List<Friend> listResult = new ArrayList<>();
        int count = 0;
        for (int i = 0; i < listFriendWithReceivedUserId.size(); i++) {
            count++;
            listResult.add(listFriendWithReceivedUserId.get(i));
            if (count == 6) {
                return listResult;
            }
        }
        for (int i = 0; i < listFriendWithSentUserId.size(); i++) {
            count++;
            listResult.add(listFriendWithSentUserId.get(i));
            if (count == 6) {
                return listResult;
            }
        }
        return listResult;
    }

    // support of support
    public List<String> createListFriendId(String userId, List<Friend> Result) {
        List<String> listFriendId = new ArrayList<>();
        for (int i = 0; i < Result.size(); i++) {
            if (Result.get(i).getReceivedUserId().equals(userId) == true) {
                listFriendId.add(Result.get(i).getSentUserId());
            } else {
                listFriendId.add(Result.get(i).getReceivedUserId());
            }
        }
        return listFriendId;
    }

    // support of support
    public List<String> createListFriendName(List<String> friendId) {
        List<String> listFriendName = new ArrayList<>();
        for (int i = 0; i < friendId.size(); i++) {
            Optional optional = this.repositoryUser.findById(friendId.get(i));
            User user = (User) optional.get();
            String userName = user.getFirstName() + " " + user.getLastName();
            listFriendName.add(userName);
        }
        return listFriendName;
    }

    // support directly
    public ResponseEntity<ResponseCode> markReadNotifications(HttpServletRequest httpServletRequest) {
        String userId = checkJwt(httpServletRequest);
        this.repositoryNotify.markReadNotifications(userId);
        return ResponseEntity.status(ResponseCode.markReadNotificationsSuccessfully.getStatus())
                .body(ResponseCode.markReadNotificationsSuccessfully);
    }

    // support directly
    public ResponseEntity<ResponseCode> savePost(MultipartFile[] files, String[] listIdTagged, int scope,
            String caption,
            HttpServletRequest httpServletRequest) {
        String userId = checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        Post post = this.mapperPost.convertRequestPost(scope, caption, listIdTagged, user);
        this.repositoryPost.save(post);
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

        return ResponseEntity.status(ResponseCode.savePostSuccessfully.getStatus())
                .body(ResponseCode.savePostSuccessfully);

    }

    public ResponseEntity<Response> getPost(HttpServletRequest httpServletRequest, String urlId) {
        String userId = "";
        if (urlId.equals("")) {
            userId = checkJwt(httpServletRequest);
        } else {
            userId = urlId;
        }
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        List<Post> listPost = new ArrayList<>();
        if (userId.equals(urlId) == false) {
            listPost = this.repositoryPost.getListPost(user);
        } else {
            listPost = this.repositoryPost.getListPostFromAnotherUser(user);
        }
        String[][][] listFile = new String[listPost.size()][][];
        for (int i = 0; i < listPost.size(); i++) {
            String[][] listFileOfPost = this.repositoryFile.getFileOfPost(listPost.get(i));
            listFile[i] = listFileOfPost;
        }
        List<ResponsePost> listResponsePost = new ArrayList<>();
        for (int i = 0; i < listPost.size(); i++) {
            int numerOfComment = this.repositoryComment.numberOfCommentInPost(listPost.get(i));
            int numberOfShares = this.repositoryPost.numberOfShare(listPost.get(i).getId());
            ResponsePost responsePost = this.mapperPost.createResponsePost(listPost.get(i), listFile[i],
                    0, numerOfComment, numberOfShares);
            listResponsePost.add(responsePost);
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.getPostSuccessfully)
                .object(listResponsePost)
                .build();
        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    public ResponseEntity<ResponseCode> likePost(HttpServletRequest httpServletRequest, String postId) {
        String userId = checkJwt(httpServletRequest);
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();

        Optional optional1 = this.repositoryPost.findById(postId);
        Post post = (Post) optional1.get();

        LikePost likePost = LikePost.builder()
                .user(user)
                .post(post)
                .time(LocalDateTime.now())
                .build();

        this.repositoryLike.save(likePost);

        // create Notify
        User user1 = post.getUser();
        if (userId.equals(user1.getId()) == false) {
            Notify notify = this.mapperNotify.createNotify(2, postId, user1.getId(),
                    user.getFirstName() + " " + user.getLastName(), "liked your Post.", userId);
            this.repositoryNotify.save(notify);
        }
        // create Notify
        return ResponseEntity.status(ResponseCode.likePostSuccessfully.getStatus())
                .body(ResponseCode.likePostSuccessfully);
    }

    // support directly
    public ResponseEntity<Response> getAllFriend(HttpServletRequest httpServletRequest) {
        // String userId = "";
        // if (urlId.equals("")) {
        // userId = checkJwt(httpServletRequest);
        // } else {
        // userId = urlId;
        // }

        String userId = checkJwt(httpServletRequest);

        List<Friend> listUserId1 = this.repositoryFriend.getAllFriendWithReceivedUserId(userId);
        List<Friend> listUserId2 = this.repositoryFriend.getAllFriendWithSentUserId(userId);

        List<String> listUserId = this.mapperFriend.createListUserId(listUserId1,
                listUserId2, userId);
        List<String> listUserName = this.mapperFriend.createListUserName(listUserId);

        List<List<String>> listResult = new ArrayList<>();
        listResult.add(listUserId);
        listResult.add(listUserName);

        Response response = Response.builder()
                .responseCode(ResponseCode.getFriendSuccessfully)
                .object(listResult)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }
}
