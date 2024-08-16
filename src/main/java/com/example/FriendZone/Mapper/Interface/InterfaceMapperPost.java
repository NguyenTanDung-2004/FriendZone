package com.example.FriendZone.Mapper.Interface;

import java.util.List;

import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Request.RequestCreationPost;
import com.example.FriendZone.Response.ResponsePost;

public interface InterfaceMapperPost {
        public Post convertRequestPost(int Scope, String caption, String[] id_taged_user, User user);

        public ResponsePost createResponsePost(Post post, String[][] fileNameIdType,
                        int numberOfLikes, int numberOfComments, int numberOfShares);

        public ResponsePost createResponsePostForNewFeed(Post post, String[][] fileNameIdType,
                        int numberOfLikes, int numberOfComments, int numberOfShares, String typeOfUser);

        public Post convertRequestPostInGroup(String caption, String[] id_taged_user, User user, Integer anonymous,
                        String groupId);

        public ResponsePost createResponsePostInGroup(Post post, String[][] fileNameIdType,
                        int numberOfLikes, int numberOfComments, int numberOfShares, String userId);
}
