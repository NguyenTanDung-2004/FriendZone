package com.example.FriendZone.Response;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseNotify {
    private String idObject;
    private int type;
    private LocalDateTime time;
    private String createdNotifyUserName;
    private String createdNotifyUserId;
    private String content;
    private int flag;
}
