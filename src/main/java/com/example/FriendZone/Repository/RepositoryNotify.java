package com.example.FriendZone.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.Notify;

import jakarta.transaction.Transactional;

@Repository
public interface RepositoryNotify extends JpaRepository<Notify, String> {
    @Query(value = "SELECT TOP 15 * FROM notify u WHERE u.user_id = :arg1 ORDER BY u.time DESC", nativeQuery = true)
    List<Notify> getTop15Notify(@Param("arg1") String userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE notify SET flag = 2 WHERE user_id = :userId", nativeQuery = true)
    void markReadNotifications(@Param("userId") String userId);
}
