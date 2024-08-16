package com.example.FriendZone.Mapper.Class;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.Friend;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperFriend;
import com.example.FriendZone.Repository.RepositoryFriend;
import com.example.FriendZone.Repository.RepositoryUser;

@Component
public class MapperFriend implements InterfaceMapperFriend {

    @Autowired
    private RepositoryUser repositoryUser;

    @Override
    public Friend createAddFriend(String sentId, String receivedId) {
        return Friend.builder()
                .sentUserId(sentId)
                .receivedUserId(receivedId)
                .status(1)
                .build();
    }

    @Override
    public List<String> createListUserId(List<Friend> list1, List<Friend> list2, String userId) {
        List<String> listResult = new ArrayList<>();

        for (int i = 0; i < list1.size(); i++) {
            if (list1.get(i).getSentUserId().equals(userId)) {
                listResult.add(list1.get(i).getReceivedUserId());
            } else {
                listResult.add(list1.get(i).getSentUserId());
            }
        }
        for (int i = 0; i < list2.size(); i++) {
            if (list2.get(i).getSentUserId().equals(userId)) {
                listResult.add(list2.get(i).getReceivedUserId());
            } else {
                listResult.add(list2.get(i).getSentUserId());
            }
        }
        return listResult;
    }

    @Override
    public List<String> createListUserName(List<String> listUserId) {
        List<String> listResult = new ArrayList<>();

        for (int i = 0; i < listUserId.size(); i++) {
            Optional optional = this.repositoryUser.findById(listUserId.get(i));
            User user = (User) optional.get();
            listResult.add(user.getFirstName() + " " + user.getLastName());
        }

        return listResult;
    }

}
