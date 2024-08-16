package com.example.FriendZone.Mapper.Interface;

import java.util.List;

import com.example.FriendZone.Entities.Friend;

public interface InterfaceMapperFriend {
    public Friend createAddFriend(String sentId, String receivedId);

    public List<String> createListUserId(List<Friend> list1, List<Friend> list2, String userId);

    public List<String> createListUserName(List<String> listrUserId);

}
