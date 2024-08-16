package com.example.FriendZone.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.LikePost;
import com.example.FriendZone.Entities.Post;
import com.example.FriendZone.Entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface RepositoryLike extends JpaRepository<LikePost, String> {
    @Query("select count(u) from LikePost u where u.post = :post")
    public int getNumberOfLikes(Post post);

    @Query("select u from LikePost u where u.post = :post and u.user = :user")
    public LikePost getLikePost(Post post, User user);

    @Transactional
    @Modifying
    @Query("delete from LikePost l where l.post = :post")
    public void deleteAllLikeInPost(Post post);
}
