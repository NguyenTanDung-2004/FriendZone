package com.example.FriendZone.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.Comment;
import com.example.FriendZone.Entities.Post;

import jakarta.transaction.Transactional;

@Repository
public interface RepositoryComment extends JpaRepository<Comment, String> {

    @Query("select c.user, c.tagedUserId, c.content, c.numberOfLikes, c.time, c.level, f.id, f.type, f.name, c.id from Comment c left join File f on c.f = f where f.post is null and c.post = :post and c.level = 1 order by c.time desc")
    public List<List<Object>> getAllInfoComment(Post post);

    @Query("select count(*) from Comment c where c.idParentComment = :idParentComment")
    public int getNumberOfCommentChild(String idParentComment);

    @Query(value = "select * from comment where comment.id_parent_comment = :commentParentId order by comment.time desc", nativeQuery = true)
    public List<Comment> getCommentChild(String commentParentId);

    @Query("select count(*) from Comment c where c.post = :post")
    public int numberOfCommentInPost(Post post);

    @Transactional
    @Modifying
    @Query("delete from Comment c where c.post = :post")
    public void deleteAllCommentInPost(Post post);
}
