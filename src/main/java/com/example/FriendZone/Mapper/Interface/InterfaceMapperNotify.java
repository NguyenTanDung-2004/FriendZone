package com.example.FriendZone.Mapper.Interface;

import java.util.List;

import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Response.ResponseNotify;

public interface InterfaceMapperNotify {
    public Notify createNotify(int type, String idObject, String receivedUserId, String createdUserName,
            String content, String createdUserId);

    public ResponseNotify createResponseNotifyFromNotify(Notify notify);

    public List<ResponseNotify> createListResponseNotify(List<Notify> listNotify);
}
