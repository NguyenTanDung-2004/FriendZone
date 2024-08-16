package com.example.FriendZone.Utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UtilsEncryptPassword {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public int checkPassword(String passwordWithOutHash, String hashedPassword) {
        if (passwordEncoder.matches(passwordWithOutHash, hashedPassword) == true) {
            return 1;
        }
        return 0;
    }
}
