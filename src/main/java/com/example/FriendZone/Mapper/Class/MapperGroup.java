package com.example.FriendZone.Mapper.Class;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.Group;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperGroup;

@Component
public class MapperGroup implements InterfaceMapperGroup {

    @Override
    public Group createGroupFromRequest(String groupName, String createdUserId, String[] arrayUserIdsInvitedByAdmin) {
        return Group.builder()
                .groupName(groupName)
                .createdUserId(createdUserId)
                .listMemberIds(new HashMap<>())
                .listUserInvitedByAdminIds(convertArrayToMap(arrayUserIdsInvitedByAdmin))
                .listUserRequestJoinIds(new HashMap<>())
                .nameOfBackgroundImage(".avif")
                .build();
    }

    public HashMap<String, Integer> convertArrayToMap(String[] array) {
        if (array == null) {
            return new HashMap<>();
        }
        HashMap<String, Integer> map = new HashMap<>();

        for (int i = 0; i < array.length; i++) {
            map.put(array[i], 1);
        }

        return map;
    }

}
