package com.example.FriendZone.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.FriendZone.Service.ServiceFriend;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/controllerFriend")
public class ControllerAllFriend {

    @Autowired
    private ServiceFriend serviceFriend;

    @GetMapping("/getAllFriend")
    public ResponseEntity getAllFriendsInAllFriend(HttpServletRequest HttpServletRequest,
            @RequestParam(name = "userId", required = false, defaultValue = "") String urlId) {
        if (urlId.equals("")) {
            return this.serviceFriend.getAllFriendInAllFriend(HttpServletRequest, urlId);
        } else {
            return this.serviceFriend.getAllFriendIncludedMutualAndUnknow(HttpServletRequest, urlId);
        }
    }

    @PostMapping("/getStatusOfUnknowFriend")
    public ResponseEntity getStatusOfUnknowFriend(HttpServletRequest httpServletRequest,
            @RequestParam(name = "listUnknownUserId") String[] listUnknowUserId) {
        return this.serviceFriend.getStatusOfUnknowFriend(httpServletRequest, listUnknowUserId);
    }

    @GetMapping("/getUserName")
    public ResponseEntity getUserName(@RequestParam(name = "userId") String userId) {
        return this.serviceFriend.getUserName(userId);
    }

}
