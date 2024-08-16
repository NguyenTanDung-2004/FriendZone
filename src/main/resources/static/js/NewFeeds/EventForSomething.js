imgUser.addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone";
}
)

divImgAndNameInLeftSide.addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone";
}
)

// access all friends
document.querySelector('body > div.divMain > div.divLeft.divMainChild1.divMainChild1_1 > div.divFriends.divMainChild2').addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone/allFriend";
}
)

// event for displaying create group and page
iCreateGroupAndPage.addEventListener("click", () => 
{
    if (flagDisplayDivCreateGroupAndPage == 0){
        divCreateGroupAndPage.style.display = "flex";
        flagDisplayDivCreateGroupAndPage = 1;
    }
    else{
        divCreateGroupAndPage.style.display = "none";
        flagDisplayDivCreateGroupAndPage = 0;
    }
}
)