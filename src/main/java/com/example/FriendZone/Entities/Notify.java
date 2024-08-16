package com.example.FriendZone.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "notify")
public class Notify {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private int flag; // this variable is used to notify this notify is seen or not.: 1: not seen, 2:
                      // seen
    private String idObject; // this variable save id of comment or like, mention, addFriend or acceptFriend.
    private int type; // 1: comment, 2: like, 3: mentioned you in a post, 4: addFriend, 5:
                      // acceptFriend
                      // 6: mentioned in a comment.
                      // 7: shared your post.
                      // 8: Invited by group's admin.
                      // 9: taged you in a post of group.
                      // 10: mentioned you in a comment of group.
                      // 11: delete request to join group.
    @Column(columnDefinition = "smalldatetime") // Use columnDefinition to specify SQL Server type
    private LocalDateTime time;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(columnDefinition = "nvarchar(max)")
    private String createdNotifyUserName;
    private String createdNotifyUserId;
    private String content;

}
