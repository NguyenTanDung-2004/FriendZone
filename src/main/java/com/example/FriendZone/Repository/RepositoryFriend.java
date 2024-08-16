package com.example.FriendZone.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.Friend;

@Repository
public interface RepositoryFriend extends JpaRepository<Friend, String> {
    @Query("select u from Friend u where u.sentUserId = :arg1 and u.receivedUserId = :arg2")
    Friend getFriendBySentIdAndReceivedId(@Param("arg1") String sentId, @Param("arg2") String receivedId);

    @Query(value = "SELECT TOP 6 * FROM Friend u WHERE u.sent_user_id = :arg1 and u.status = 2", nativeQuery = true)
    List<Friend> getTop6FriendWithSentUserId(@Param("arg1") String userId);

    @Query(value = "select top 6 * from friend u where u.received_user_id = :arg1 and u.status = 2", nativeQuery = true)
    List<Friend> getTop6FriendWithReceivedUserId(@Param("arg1") String userId);

    @Query("select count(*) from Friend f where (f.sentUserId = :userId or f.receivedUserId = :userId) and f.status = 2")
    public int getNumberOfFriend(String userId);

    @Query(value = "SELECT * FROM Friend u WHERE u.sent_user_id = :arg1 and u.status = 2", nativeQuery = true)
    List<Friend> getAllFriendWithSentUserId(@Param("arg1") String userId);

    @Query(value = "select * from Friend u where u.received_user_id = :arg1 and u.status = 2", nativeQuery = true)
    List<Friend> getAllFriendWithReceivedUserId(@Param("arg1") String userId);

    @Query("select f from Friend f where f.sentUserId = :requestUserId and f.receivedUserId = :unknownUserId and f.status = 1")
    Friend getFriendWithStatus1InAllFriend(String requestUserId, String unknownUserId);
}
