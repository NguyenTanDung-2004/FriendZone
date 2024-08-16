package com.example.FriendZone.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FriendZone.Entities.Group;

@Repository
public interface RepositoryGroup extends JpaRepository<Group, String> {

}
