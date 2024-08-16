package com.example.FriendZone.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.File;
import com.example.FriendZone.Entities.Post;

import jakarta.transaction.Transactional;

@Repository
public interface RepositoryFile extends JpaRepository<File, String> {
    @Query("select f.name, f.id, f.type from File f where f.post = :post")
    public String[][] getFileOfPost(@Param("post") Post post);

    @Transactional
    @Modifying
    @Query("delete from File f where f.post = :post")
    public void deleteAllFileInPost(Post post);
}
