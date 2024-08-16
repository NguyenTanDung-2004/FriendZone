package com.example.FriendZone.Mapper.Class;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.Notify;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperNotify;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.ResponseNotify;

@Component
public class MapperNotify implements InterfaceMapperNotify {
    @Autowired
    private RepositoryUser repositoryUser;

    @Override
    public Notify createNotify(int type, String idObject, String receivedUserId, String createdUserName,
            String content, String createdUserId) {
        Optional optional = this.repositoryUser.findById(receivedUserId);
        User user = (User) optional.get();
        return Notify.builder()
                .flag(1)
                .type(type)
                .idObject(idObject)
                .user(user)
                .time(LocalDateTime.now())
                .createdNotifyUserName(createdUserName)
                .content(content)
                .createdNotifyUserId(createdUserId)
                .build();
    }

    @Override
    public ResponseNotify createResponseNotifyFromNotify(Notify notify) {
        return ResponseNotify.builder()
                .idObject(notify.getIdObject())
                .type(notify.getType())
                .time(notify.getTime())
                .createdNotifyUserName(notify.getCreatedNotifyUserName())
                .content(notify.getContent())
                .flag(notify.getFlag())
                .createdNotifyUserId(notify.getCreatedNotifyUserId())
                .build();
    }

    @Override
    public List<ResponseNotify> createListResponseNotify(List<Notify> listNotify) {
        List<ResponseNotify> list = new ArrayList<>();
        for (int i = 0; i < listNotify.size(); i++) {
            list.add(createResponseNotifyFromNotify(listNotify.get(i)));
        }
        return list;
    }

}
