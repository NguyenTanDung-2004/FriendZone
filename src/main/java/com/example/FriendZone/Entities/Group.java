package com.example.FriendZone.Entities;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
@Table(name = "GroupPeople")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String groupId;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String groupName;
    private String createdUserId;
    @Column(columnDefinition = "varbinary(max)") // Specify nvarchar column type
    private HashMap<String, Integer> listMemberIds;
    @Column(columnDefinition = "varbinary(max)") // Specify nvarchar column type
    private HashMap<String, Integer> listUserRequestJoinIds;
    @Column(columnDefinition = "varbinary(max)") // Specify nvarchar column type
    private HashMap<String, Integer> listUserInvitedByAdminIds;
    private String nameOfBackgroundImage;
}
