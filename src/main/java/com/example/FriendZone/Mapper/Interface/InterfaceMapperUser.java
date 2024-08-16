package com.example.FriendZone.Mapper.Interface;

import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Request.RequestCreationUser;
import com.example.FriendZone.Request.RequestUpdateDetail;

public interface InterfaceMapperUser {
    public User convertRequestUser(RequestCreationUser obj);

    public Object convertUserToEditDetailUser(User user);

    public User convertRequestUpdate(RequestUpdateDetail requestUpdateDetail, String userId);
}
