package com.example.FriendZone.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.User;

@Repository
public interface RepositoryUser extends JpaRepository<User, String> {
    @Query("SELECT u.id FROM User u WHERE u.email = :arg1")
    String getUserIdFromEmail(@Param("arg1") String email);

    @Query("select u from User u where u.email = :arg1")
    User getUserByEmail(@Param("arg1") String email);
}
