package com.example.FriendZone.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;

@Repository
public interface RepositoryPost extends JpaRepository<Post, String> {
    @Query("SELECT u.idTagedUser FROM Post u WHERE u.id = :idPost")
    public String[] getListTagedFriendId(@Param("idPost") String idPost);

    @Query("SELECT u FROM Post u WHERE u.user = :arg1 and u.groupId is null ORDER BY u.time DESC")
    public List<Post> getListPost(@Param("arg1") User user);

    @Query("SELECT u FROM Post u WHERE u.user = :arg1 and u.scope != 3 and u.groupId is null ORDER BY u.time DESC")
    public List<Post> getListPostFromAnotherUser(@Param("arg1") User user);

    @Query(value = "select count(*) from post p where p.shared_post_id = :postId", nativeQuery = true)
    public int numberOfShare(String postId);

    @Query("select p from Post p where p.confirm is null and p.groupId = :groupId order by p.time desc")
    public List<Post> getPostInGroup(@Param("groupId") String groupId);

    @Query("select p from Post p where p.confirm = 1 and p.groupId = :groupId order by p.time desc")
    public List<Post> getPostNotConfirmInGroup(@Param("groupId") String groupId);
}
