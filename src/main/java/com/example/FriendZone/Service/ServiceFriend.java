package com.example.FriendZone.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.Response;
import com.example.FriendZone.Response.ResponseCode;
import com.example.FriendZone.Response.ResponseFriend;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ServiceFriend {
    @Autowired
    private RepositoryFriend repositoryFriend;

    @Autowired
    private ServiceUser serviceUser;

    @Autowired
    private RepositoryUser repositoryUser;

    public ResponseEntity<Response> getAllFriendInAllFriend(HttpServletRequest httpServletRequest, String urlId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        if (urlId.equals("") == false) {
            userId = urlId;
        }

        List<Friend> listFriends1 = this.repositoryFriend.getAllFriendWithSentUserId(userId);
        List<Friend> listFriends2 = this.repositoryFriend.getAllFriendWithReceivedUserId(userId);

        List<String> listFriendUserIds = new ArrayList<>();
        createListUserId(listFriendUserIds, listFriends2, 0);
        createListUserId(listFriendUserIds, listFriends1, 1);

        List<ResponseFriend> listResponseFriends = new ArrayList<>();

        for (int i = 0; i < listFriendUserIds.size(); i++) {
            Optional optional = this.repositoryUser.findById(listFriendUserIds.get(i));
            User user = (User) optional.get();

            int numberOfFriends = this.repositoryFriend.getNumberOfFriend(user.getId());

            ResponseFriend responseFriend = ResponseFriend.builder()
                    .userId(user.getId())
                    .userName(user.getFirstName() + " " + user.getLastName())
                    .numberOfFriends(numberOfFriends)
                    .build();

            listResponseFriends.add(responseFriend);
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.getFriendSuccessfully)
                .object(listResponseFriends)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);

    }

    public void createListUserId(List<String> listUserIds, List<Friend> listFriends, int flag) {
        for (int i = 0; i < listFriends.size(); i++) {
            if (flag == 0) {
                listUserIds.add(listFriends.get(i).getSentUserId());
            } else {
                listUserIds.add(listFriends.get(i).getReceivedUserId());
            }
        }
    }

    public ResponseEntity<Response> getAllFriendIncludedMutualAndUnknow(HttpServletRequest httpServletRequest,
            String urlId) {

        String requestUserId = this.serviceUser.checkJwt(httpServletRequest);

        List<ResponseFriend> listResponseFriendsRequest = getListResponseFriendsBasedOnUserId(requestUserId);
        List<ResponseFriend> listResponseFriendsUrl = getListResponseFriendsBasedOnUserId(urlId);

        Map<ResponseFriend, Integer> mapResult = new HashMap<>();
        for (int i = 0; i < listResponseFriendsUrl.size(); i++) {
            if (listResponseFriendsUrl.get(i).getUserId().equals(requestUserId) == false) {
                mapResult.put(listResponseFriendsUrl.get(i), 0);
            }
        }
        for (int i = 0; i < listResponseFriendsRequest.size(); i++) {
            if (mapResult.get(listResponseFriendsRequest.get(i)) == null) {
                mapResult.put(listResponseFriendsRequest.get(i), 2);
            } else {
                int x = mapResult.get(listResponseFriendsRequest.get(i));
                mapResult.put(listResponseFriendsRequest.get(i), x + 1);
            }
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.getFriendSuccessfully)
                .object(mapResult)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    public List<ResponseFriend> getListResponseFriendsBasedOnUserId(String userId) {
        List<Friend> listFriends1 = this.repositoryFriend.getAllFriendWithSentUserId(userId);
        List<Friend> listFriends2 = this.repositoryFriend.getAllFriendWithReceivedUserId(userId);

        List<String> listFriendUserIds = new ArrayList<>();
        createListUserId(listFriendUserIds, listFriends2, 0);
        createListUserId(listFriendUserIds, listFriends1, 1);

        List<ResponseFriend> listResponseFriends = new ArrayList<>();

        for (int i = 0; i < listFriendUserIds.size(); i++) {
            Optional optional = this.repositoryUser.findById(listFriendUserIds.get(i));
            User user = (User) optional.get();

            int numberOfFriends = this.repositoryFriend.getNumberOfFriend(user.getId());

            ResponseFriend responseFriend = ResponseFriend.builder()
                    .userId(user.getId())
                    .userName(user.getFirstName() + " " + user.getLastName())
                    .numberOfFriends(numberOfFriends)
                    .build();

            listResponseFriends.add(responseFriend);
        }

        return listResponseFriends;
    }

    public ResponseEntity<Response> getStatusOfUnknowFriend(HttpServletRequest httpServletRequest,
            String[] listUnknownUserId) {
        String userId = this.serviceUser.checkJwt(httpServletRequest);

        List<Integer> listStatusOfUnknown = new ArrayList<>();

        for (int i = 0; i < listUnknownUserId.length; i++) {
            Friend sent = this.repositoryFriend.getFriendWithStatus1InAllFriend(userId, listUnknownUserId[i]);
            Friend received = this.repositoryFriend.getFriendWithStatus1InAllFriend(listUnknownUserId[i], userId);

            if (sent == null && received == null) {
                listStatusOfUnknown.add(1);
            } else if (sent != null) {
                listStatusOfUnknown.add(2);
            } else {
                listStatusOfUnknown.add(3);
            }
        }

        Response response = Response.builder()
                .responseCode(ResponseCode.createListStatusOfUnknown)
                .object(listStatusOfUnknown)
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

    public ResponseEntity<Response> getUserName(String uerId) {
        Optional optional = this.repositoryUser.findById(uerId);
        User user = (User) optional.get();

        Response response = Response.builder()
                .responseCode(ResponseCode.getUserName)
                .object(user.getFirstName() + " " + user.getLastName())
                .build();

        return ResponseEntity.status(response.getResponseCode().getStatus())
                .body(response);
    }

}
