package com.example.FriendZone.Entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.mapping.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "comment")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private String id;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String content;
    private String[] tagedUserId;
    private int numberOfLikes;
    private int level; // 1: parent comment, 2: sub comment.
    private LocalDateTime time;
    private String idParentComment;
    @ManyToOne
    private Post post;
    @ManyToOne
    private User user;
    @OneToOne
    private File f;
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "UserComment", joinColumns = @JoinColumn(name = "commentId"), inverseJoinColumns = @JoinColumn(name = "userId"))
    private Set<User> listUser = new HashSet<>();
}
