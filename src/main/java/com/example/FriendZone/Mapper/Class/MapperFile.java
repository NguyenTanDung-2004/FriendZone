package com.example.FriendZone.Mapper.Class;

import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Mapper.Interface.IntefaceMapperFile;

@Component
public class MapperFile implements IntefaceMapperFile {

    @Override
    public File createFile(String id, String name, String type, Post post) {
        return File.builder()
                .id(id)
                .name(name)
                .type(type)
                .post(post)
                .build();
    }

}
