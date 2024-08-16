package com.example.FriendZone.Entities;

import java.sql.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "[User]")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private String id;
    private String email;
    private String password;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String firstName;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String lastName;
    private int gender; // 1: female, 2: male, 3: others
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String live;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String userFrom;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String study;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String work;
    private Date dateOfBirth;
    private String code;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String img;

    @ManyToMany(mappedBy = "listUser", cascade = CascadeType.PERSIST)
    private Set<Comment> listComment = new HashSet<>();
}
