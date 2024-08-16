package com.example.FriendZone.Service;

import java.lang.module.ModuleDescriptor.Builder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.Group;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Exception.ExceptionErrorCode;
import com.example.FriendZone.Exception.ExceptionUser;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryGroup;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.ResponseGroup;
import com.example.FriendZone.Utils.UtilsHandleFile;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class ServiceController {
    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private UtilsHandleFile utilsHandleFile;

    @Autowired
    private RepositoryFriend repositoryFriend;

    @Autowired
    private RepositoryGroup repositoryGroup;

    // public int checkFriend(HttpServletRequest httpServletRequest, String
    // friendId) {
    // String userId = this.serviceUser.checkJwt(httpServletRequest);
    // if (userId.equals("notFound")) {
    // throw new ExceptionUser(ExceptionErrorCode.verifyTokenFail);
    // } else {
    // Optional optional = this.repositoryUser.findById(userId);
    // User user = (User) optional.get();
    // Integer result = user.getFriends().get(friendId);
    // if (result == null) {
    // return -1;
    // } else {
    // return result;
    // }
    // }
    // }

    public String createNameUser(User user) {
        return user.getFirstName() + " " + user.getLastName();
    }

    public void setAttributePersonalPage(Model model, String userId, String jwtTokenId, String urlId, String userId1) {
        Optional optional = this.repositoryUser.findById(userId);
        User user = (User) optional.get();
        model.addAttribute("imgPath", user.getImg());
        model.addAttribute("live", user.getLive());
        model.addAttribute("from", user.getUserFrom());
        model.addAttribute("study", user.getStudy());
        model.addAttribute("work", user.getWork());
        model.addAttribute("dateOfBirth", user.getDateOfBirth());
        model.addAttribute("userId", userId);
        model.addAttribute("listFileImage", this.utilsHandleFile.getFileNameInDirectoryOfUser(userId, "Image"));
        model.addAttribute("userName", createNameUser(user));
        model.addAttribute("userId1", userId1);
        model.addAttribute("numberOfFriends", getNumberOfFriend(userId));
        if (urlId == null) {
            model.addAttribute("checkFriend", -1);
        } else {
            model.addAttribute("checkFriend", checkStatusFriend(jwtTokenId, urlId));
        }
    }

    public int checkStatusFriend(String jwtTokenId, String urlId) {
        Friend friend = this.repositoryFriend.getFriendBySentIdAndReceivedId(jwtTokenId, urlId);
        if (friend == null) {
            Friend friend1 = this.repositoryFriend.getFriendBySentIdAndReceivedId(urlId, jwtTokenId);
            if (friend1 == null) {
                return 0; // display "add friend"
            } else {
                // if friend1 is not null, urlId is sent Id
                // display "confirm", "unfriend"
                return friend1.getStatus() + 10; // it can be return 11 or 12
            }
        } else {
            // if friend is not null, jwtTokenId is sent Id, urlId is received id.
            // display "cancel request", "unfriend".
            return friend.getStatus(); // ot cam ne return 1 or 2
        }
    }

    public int getNumberOfFriend(String userId) {
        return this.repositoryFriend.getNumberOfFriend(userId);
    }

    public String checkJwtToken(HttpServletRequest httpServletRequest) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        return userId;
    }

    public void setAttributeForPostDetail(Model model, String userId) {
        model.addAttribute("userId", userId);
    }

    // support directly
    public void setAttributeForNewFeed(HttpServletRequest httpServletRequest, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optionalUser = this.repositoryUser.findById(userId);
        User user = (User) optionalUser.get();

        model.addAttribute("userName", user.getFirstName() + " " + user.getLastName());
        model.addAttribute("userId", userId);
        model.addAttribute("listResponseGroups", createResponseGroup(userId));
        model.addAttribute("yourGroups", createYourGroup(userId));
    }

    public List<ResponseGroup> createResponseGroup(String userId) {
        List<ResponseGroup> listResponseGroups = new ArrayList<>();

        List<Group> listGroups = this.repositoryGroup.findAll();

        for (int i = 0; i < listGroups.size(); i++) {
            if (listGroups.get(i).getListMemberIds().get(userId) != null) {
                ResponseGroup responseGroup = ResponseGroup.builder()
                        .groupId(listGroups.get(i).getGroupId())
                        .groupName(listGroups.get(i).getGroupName())
                        .groupBackground("../FileUser/Image/" + listGroups.get(i).getCreatedUserId() + "/"
                                + listGroups.get(i).getGroupId()
                                + listGroups.get(i).getNameOfBackgroundImage())
                        .build();
                listResponseGroups.add(responseGroup);
            }
        }

        return listResponseGroups;
    }

    public List<ResponseGroup> createYourGroup(String userId) {
        List<ResponseGroup> listResponseGroups = new ArrayList<>();

        List<Group> listGroups = this.repositoryGroup.findAll();

        for (int i = 0; i < listGroups.size(); i++) {
            if (listGroups.get(i).getCreatedUserId().equals(userId)) {
                ResponseGroup responseGroup = ResponseGroup.builder()
                        .groupId(listGroups.get(i).getGroupId())
                        .groupName(listGroups.get(i).getGroupName())
                        .groupBackground("../FileUser/Image/" + listGroups.get(i).getCreatedUserId() + "/"
                                + listGroups.get(i).getGroupId()
                                + listGroups.get(i).getNameOfBackgroundImage())
                        .build();
                listResponseGroups.add(responseGroup);
            }
        }

        return listResponseGroups;
    }

    // suport directly
    public void setAttributeForAllFriend(HttpServletRequest httpServletRequest, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optionalUser = this.repositoryUser.findById(userId);
        User user = (User) optionalUser.get();
        model.addAttribute("userName", user.getFirstName() + " " + user.getLastName());

        model.addAttribute("userId", userId);
    }

    // support directly
    public void setAttributeForCreateGroup(HttpServletRequest httpServletRequest, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optionalUser = this.repositoryUser.findById(userId);
        User user = (User) optionalUser.get();
        model.addAttribute("userName", user.getFirstName() + " " + user.getLastName());

        model.addAttribute("userId", userId);
    }

    // support directly
    public String setAttributeForGroup(HttpServletRequest httpServletRequest, String groupId, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);
        Optional optionalUser = this.repositoryUser.findById(userId);
        User user = (User) optionalUser.get();

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        model.addAttribute("numberOfMembers", group.getListMemberIds().size());
        model.addAttribute("nameOfGroup", group.getGroupName());
        model.addAttribute("backgrounPath",
                "../FileUser/Image/" + group.getCreatedUserId() + "/" + group.getGroupId()
                        + group.getNameOfBackgroundImage());
        model.addAttribute("statusOfRequestJoinGroup", createStatusOfRequestJoinGroup(userId, group));
        model.addAttribute("list10MemberIds", listTenMemberIds(group.getListMemberIds()));
        model.addAttribute("userId", userId);
        model.addAttribute("admin", createAdminFlag(userId, group.getCreatedUserId()));
        model.addAttribute("userName", user.getFirstName() + " " + user.getLastName());

        if (group.getListMemberIds().get(userId) == null) {
            return "RequestJoinGroup/RequestJoinGroup";
        } else {
            return "Group/Group";
        }
    }

    public int createStatusOfRequestJoinGroup(String userId, Group group) {
        if (group.getListMemberIds().get(userId) == null && group.getListUserRequestJoinIds().get(userId) == null
                && group.getListUserInvitedByAdminIds().get(userId) == null) {
            return 1; // Join group
        } else if (group.getListUserRequestJoinIds().get(userId) != null
                && group.getListUserRequestJoinIds().get(userId) == 1) {
            return 2; // cancel Request
        } else if (group.getListUserInvitedByAdminIds().get(userId) != null
                && group.getListUserInvitedByAdminIds().get(userId) == 1) {
            return 3; // Accept Request
        } else if (group.getListMemberIds().get(userId) == 1) {
            return 4; // Out group
        } else {
            return 0;
        }
    }

    public List<String> listTenMemberIds(HashMap<String, Integer> hashMap) {
        int x = Math.min(10, hashMap.size());
        int count = 0;
        List<String> list = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            count++;
            if (count == 11) {
                break;
            }
            list.add(entry.getKey());
        }

        return list;
    }

    public int createAdminFlag(String userId, String createdUserId) {
        if (userId.equals(createdUserId)) {
            return 1; // admin
        } else {
            return 0;
        }
    }

    public String setAttributeForAllMember(HttpServletRequest httpServletRequest, String groupId, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        if (group.getListMemberIds().get(userId) == null) {
            return "FriendZone/Login";
        }

        model.addAttribute("backgrounPath",
                "../FileUser/Image/" + group.getCreatedUserId() + "/" + group.getGroupId()
                        + group.getNameOfBackgroundImage());

        model.addAttribute("flagAdmin", createAdminFlag(userId, group.getCreatedUserId()));
        return "AllMember/AllMember";
    }

    public String setAttributeForConfirmPost(HttpServletRequest httpServletRequest, String groupId, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        if (group.getCreatedUserId().equals(userId) == false) {
            return "FriendZone/Login";
        }

        model.addAttribute("backgrounPath",
                "../FileUser/Image/" + group.getCreatedUserId() + "/" + group.getGroupId()
                        + group.getNameOfBackgroundImage());

        return "ConfirmPost/ConfirmPost";
    }

    public String setAttributeForMedia(HttpServletRequest httpServletRequest, String groupId, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        if (group.getListMemberIds().get(userId) == null) {
            return "FriendZone/Login";
        }

        model.addAttribute("backgrounPath",
                "../FileUser/Image/" + group.getCreatedUserId() + "/" + group.getGroupId()
                        + group.getNameOfBackgroundImage());

        return "Media/Media";
    }

    public String setAttributeForAllFile(HttpServletRequest httpServletRequest, String groupId, Model model) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        Optional optional = this.repositoryGroup.findById(groupId);
        Group group = (Group) optional.get();

        if (group.getListMemberIds().get(userId) == null) {
            return "FriendZone/Login";
        }

        model.addAttribute("backgrounPath",
                "../FileUser/Image/" + group.getCreatedUserId() + "/" + group.getGroupId()
                        + group.getNameOfBackgroundImage());

        return "AllFile/AllFile";
    }

}
