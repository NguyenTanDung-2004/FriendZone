package com.example.FriendZone.Entities;

import java.util.UUID;

import org.hibernate.annotations.ValueGenerationType;

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
@Table(name = "FileUser")
public class File {
    @Id
    private String id;
    @Column(columnDefinition = "nvarchar(max)") // Specify nvarchar column type
    private String name;
    private String type;
    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;
}
