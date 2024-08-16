package com.example.FriendZone.DispatcherView;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.FriendZone.Entities.Group;
import com.example.FriendZone.Entities.User;
import com.example.FriendZone.Repository.RepositoryGroup;
import com.example.FriendZone.Repository.RepositoryUser;
import com.example.FriendZone.Service.ServiceController;
import com.example.FriendZone.Service.ServiceUser;
import com.example.FriendZone.Utils.UtilsHandleFile;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/FriendZone")
public class controller {

	@Autowired
	private ServiceUser serviceUser;

	@Autowired
	private RepositoryUser repositoryUser;

	@Autowired
	private UtilsHandleFile utilsHandleFile;

	@Autowired
	private ServiceController serviceController;

	@Autowired
	private RepositoryGroup repositoryGroup;

	@GetMapping("/Login")
	public String hienThi() {
		return "Login/Login";
	}

	@GetMapping("/LoginFail")
	public String hienThi1() {
		return "LoginFail/LoginFail";
	}

	@GetMapping("/ForgotPassword")
	public String hienthi2() {
		return "ForgotPassword/ForgotPassword";
	}

	@GetMapping("")
	public String hienthi3(HttpServletRequest httpServletRequest, org.springframework.ui.Model model,
			@RequestParam(name = "id", required = false, defaultValue = "1") String id) {
		String userId = this.serviceUser.checkJwt(httpServletRequest); // get userId in jwtToken
		if (userId.equals("notFound")) { // if not found return login page
			return "Login/Login";
		} else { // if found userId in jwtToken
			if (id.equals("1")) {
				this.serviceController.setAttributePersonalPage(model, userId, null, null, userId);
				return "PersonalPage/PersonalPage";
			} else {
				Optional optional = this.repositoryUser.findById(id);
				User user = (User) optional.get();
				if (user == null) { // check urlId, fail return login page
					return "Login/Login";
				} else {
					this.serviceController.setAttributePersonalPage(model, id, userId, id, userId);
					return "PersonalPage/PersonalPage";
				}
			}
		}
	}

	@GetMapping("/SignUp")
	public String hienthi4() {
		return "SignUp/SignUp";
	}

	@GetMapping("/test")
	public String hienthiTest() {
		return "Test/test";
	}

	@GetMapping("/postDetail")
	public String postDetail(HttpServletRequest httpServletRequest, org.springframework.ui.Model model) {
		String userId = this.serviceController.checkJwtToken(httpServletRequest);
		if (userId.equals("notFound") == true) {
			return "Login/Login";
		}
		this.serviceController.setAttributeForPostDetail(model, userId);
		return "PostDetail/PostDetail";
	}

	@GetMapping("/newFeed")
	public String newFeed(HttpServletRequest httpServletRequest, org.springframework.ui.Model model) {
		String userId = this.serviceController.checkJwtToken(httpServletRequest);
		if (userId.equals("notFound") == true) {
			return "Login/Login";
		}
		this.serviceController.setAttributeForNewFeed(httpServletRequest, model);
		return "NewFeeds/NewFeeds";
	}

	@GetMapping("/allFriend")
	public String allFriend(HttpServletRequest httpServletRequest, org.springframework.ui.Model model) {
		String userId = this.serviceController.checkJwtToken(httpServletRequest);
		if (userId.equals("notFound") == true) {
			return "Login/Login";
		}
		this.serviceController.setAttributeForAllFriend(httpServletRequest, model);
		return "AllFriend/AllFriend";
	}

	@GetMapping("/createGroup")
	public String createGroup(HttpServletRequest httpServletRequest, org.springframework.ui.Model model) {
		String userId = this.serviceController.checkJwtToken(httpServletRequest);
		if (userId.equals("notFound") == true) {
			return "Login/Login";
		}
		this.serviceController.setAttributeForCreateGroup(httpServletRequest, model);
		return "CreateGroup/CreateGroup";
	}

	@GetMapping("/group")
	public String group(HttpServletRequest httpServletRequest, @RequestParam(name = "groupId") String groupId,
			org.springframework.ui.Model model) {
		// check cookie
		String userId = this.serviceController.checkJwtToken(httpServletRequest);

		if (userId.equals("notFound") == true) {
			return "Login/Login";
		} else {
			return this.serviceController.setAttributeForGroup(httpServletRequest, groupId, model);
		}
	}

	@GetMapping("/requestJoinGroup")
	public String requestJoinGroup() {
		return "RequestJoinGroup/RequestJoinGroup";
	}

	@GetMapping("/allMember")
	public String allMember(HttpServletRequest httpServletRequest, @RequestParam(name = "groupId") String groupId,
			org.springframework.ui.Model model) {

		return this.serviceController.setAttributeForAllMember(httpServletRequest, groupId, model);
	}

	@GetMapping("/getPostToConfirm")
	public String getPostToConfirm(HttpServletRequest httpServletRequest,
			@RequestParam(name = "groupId") String groupId, org.springframework.ui.Model model) {
		return this.serviceController.setAttributeForConfirmPost(httpServletRequest, groupId, model);
	}

	@GetMapping("/media")
	public String allMediaInGroup(HttpServletRequest httpServletRequest,
			@RequestParam(name = "groupId") String groupId, org.springframework.ui.Model model) {
		return this.serviceController.setAttributeForMedia(httpServletRequest, groupId, model);
	}

	@GetMapping("/allFile")
	public String allFileInGroup(HttpServletRequest httpServletRequest,
			@RequestParam(name = "groupId") String groupId, org.springframework.ui.Model model) {
		return this.serviceController.setAttributeForAllFile(httpServletRequest, groupId, model);
	}
}
