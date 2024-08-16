package com.example.FriendZone.Mapper.Class;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Mapper.Interface.InterfaceMapperUser;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Request.RequestCreationUser;
import com.example.FriendZone.Request.RequestUpdateDetail;

@Component
public class MapperUser implements InterfaceMapperUser {

    @Autowired
    private RepositoryUser repositoryUser;

    @Override
    public User convertRequestUser(RequestCreationUser obj) {
        return User.builder()
                .email(obj.getEmail())
                .firstName(obj.getFirstName())
                .lastName(obj.getLastName())
                .gender(obj.getGender())
                .dateOfBirth(obj.getDateOfBirth())
                .build();
    }
    // private String email;
    // private String password;
    // private String firstName;
    // private String lastName;
    // private int gender;
    // private Date dateOfBirth;

    @Override
    public Object convertUserToEditDetailUser(User user) {
        java.util.Map<String, Object> hashMap = new HashMap<>();
        hashMap.put("firstName", user.getFirstName());
        hashMap.put("lastName", user.getLastName());
        hashMap.put("gender", user.getGender());
        hashMap.put("dayOfBirth", user.getDateOfBirth());
        hashMap.put("live", user.getLive());
        hashMap.put("from", user.getUserFrom());
        hashMap.put("study", user.getStudy());
        hashMap.put("work", user.getWork());
        return hashMap;
    }

    @Override
    public User convertRequestUpdate(RequestUpdateDetail requestUpdateDetail, String userId) {
        Optional option = this.repositoryUser.findById(userId);
        User user = (User) option.get();
        user.setFirstName(requestUpdateDetail.getFirstName());
        user.setLastName(requestUpdateDetail.getLastName());
        user.setGender(requestUpdateDetail.getGender());
        user.setDateOfBirth(requestUpdateDetail.getDateOfBirth());
        user.setLive(requestUpdateDetail.getLive());
        user.setUserFrom(requestUpdateDetail.getFrom());
        user.setStudy(requestUpdateDetail.getStudy());
        user.setWork(requestUpdateDetail.getWork());
        return user;
    }

}
