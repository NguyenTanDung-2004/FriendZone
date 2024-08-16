tabMember.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/allMember?groupId=" + groupId;
}
)

tabConfirm.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/getPostToConfirm?groupId=" + groupId;
}
)

tabMedia.addEventListener("click", () =>
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/media?groupId=" + groupId;
}
)

tabFiles.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/allFile?groupId=" + groupId;
}
)