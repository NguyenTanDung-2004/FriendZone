package com.example.FriendZone.Entities;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;

import org.hibernate.mapping.List;
import org.hibernate.mapping.Set;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String caption;
    private String[] idTagedUser;
    @Column(columnDefinition = "smalldatetime") // Use columnDefinition to specify SQL Server type
    private LocalDateTime time;
    private int scope; // 1: friend, 2: public, 3: only you
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // share
    private String sharedUserId;
    private String sharedPostId;

    // group
    private String groupId;
    private Integer anonymousType; // 1 is anonymous, 0 is normal
    private Integer confirm; // 1 is confirming, null is confirmed, 2 edit post.
}
