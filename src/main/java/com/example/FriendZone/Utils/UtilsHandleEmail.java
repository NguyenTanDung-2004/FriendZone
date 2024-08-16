package com.example.FriendZone.Utils;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Exception.ExceptionErrorCode;
import com.example.FriendZone.Exception.ExceptionUser;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Response.ResponseCode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Component
public class UtilsHandleEmail {
    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private JavaMailSender javaMailSender; // use an object of the lib of mail in maven.
    @Value("${spring.mail.username}")
    private String sender; // get sender from file application.properties

    private String recipient;
    private String msgBody;
    private String subject;

    // send email
    public ResponseCode sendSimpleEmail() {
        try {
            SimpleMailMessage mailmessage = new SimpleMailMessage(); // create SimpleMailMessage. This is an object in
                                                                     // lib mail.
            mailmessage.setFrom(sender);
            mailmessage.setTo(this.recipient);
            mailmessage.setSubject(this.subject);
            mailmessage.setText(this.msgBody);
            this.javaMailSender.send(mailmessage);
            return ResponseCode.sendEmailSuccessfully;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionUser(ExceptionErrorCode.sendEmailFail);
        }
    }

    // function create Random code
    public String createRandom() {
        Random rd = new Random();
        int x1 = rd.nextInt(9 - 1 + 1) + 1;
        int x2 = rd.nextInt(9 - 0 + 0) + 0;
        int x3 = rd.nextInt(9 - 0 + 0) + 0;
        int x4 = rd.nextInt(9 - 0 + 0) + 0;

        String code = x1 + "" + x2 + "" + x3 + "" + x4;

        User user = this.repositoryUser.getUserByEmail(recipient);
        user.setCode(code);
        this.repositoryUser.save(user);
        return code;
    }
}
