package com.example.FriendZone.Mapper.Interface;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Post;

public interface IntefaceMapperFile {
    public File createFile(String id, String name, String type, Post post);

}
