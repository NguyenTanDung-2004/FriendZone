package com.example.FriendZone.Mapper.Interface;

import com.example.FriendZone.Entities.Group;

public interface InterfaceMapperGroup {

    public Group createGroupFromRequest(String groupName, String createdUserId, String[] arrayUserIdsInvitedByAdmin);
}