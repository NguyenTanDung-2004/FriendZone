divSeeAllKnownFriend.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/allMember?groupId=" + groupId + "&action=seeAllKnownFriend";
}
)

divSeeAllUnKnownFriend.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/allMember?groupId=" + groupId + "&action=seeAllUnknownFriend";
}
)

divSeeAllRequestFriend.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/allMember?groupId=" + groupId + "&action=seeAllRequestFriend";
}
)

function handleParam(){
    var action = getParam("action");

    if (action == "seeAllKnownFriend"){
        divSeeAllKnownFriend.remove();
        divRequestFriend.remove();
        divUnknowFriend.remove();
        divContentMutualFriend.innerHTML = "";
        createMutualFriend1();
    }

    else if (action == "seeAllUnknownFriend"){
        divSeeAllUnKnownFriend.remove();
        divRequestFriend.remove();
        divMutualFriend.remove();
        divContentUnknowFriend.innerHTML = "";
        createUnknowFriend1();
    }

    else if (action == "seeAllRequestFriend"){
        divSeeAllRequestFriend.remove();
        divUnknowFriend.remove();
        divMutualFriend.remove();
        divContentRequestFriend.innerHTML = "";
        createRequestMember1();
    }
}

setTimeout(function(){
    handleParam();
}, 300);

function createMutualFriend1(){
    for (var i = 0; i < listMutualFriendsId.length; i++){
        createMutualFriend(listMutualFriendsName[i], listMutualFriendsId[i]);
    }
}

function createUnknowFriend1(){
    for (var i = 0; i < listUnknowFriendsId.length; i++){
        createUnknowFriend(listUnknowFriendsName[i], listUnknowFriendsId[i]);
    }
}

function createRequestMember1(){
    for (var i = 0; i < listRequestFriendsId.length; i++){
        createRequestMember(listRequestFriendsName[i], listRequestFriendsId[i]);
    }
}