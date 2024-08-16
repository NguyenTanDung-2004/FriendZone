function createDiv1FriendInInviteFriendBox(userId, userName){
    const div1Friend = document.createElement("div");
    div1Friend.id = "div1Result";
    div1Friend.addEventListener("click", () => 
    {
        if (checkElementExistInMap(userId)){
            mapUserId.set(userId, 1);
            createDiv1Friend(userId, userName);
        }
    }
    )

    var img = document.createElement("img");
    img.src = "../FileUser/Image/" + userId + "/avatar.jpg";

    var p = document.createElement("p");
    p.innerHTML = userName;

    div1Friend.appendChild(img)
    div1Friend.appendChild(p);

    divInviteFriendBox.appendChild(div1Friend);
}

function checkElementExistInMap(userId){
    if (mapUserId.get(userId) != 1){
        return true;
    }
    else{
        return false;
    }
}