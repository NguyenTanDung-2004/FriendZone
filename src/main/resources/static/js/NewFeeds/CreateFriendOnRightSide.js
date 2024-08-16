function createDiv1Friend(imgSrc, userName, userId){
    // Create the main div element with class "div1Friend"
    var div1Friend = document.createElement("div");
    div1Friend.className = "div1Friend";

    // Create the img element and set its attributes
    var img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";

    // Create the p element and set its text content
    var p = document.createElement("p");
    p.textContent = userName;

    // Append the img and p elements to the div
    div1Friend.appendChild(img);
    div1Friend.appendChild(p);

    div1Friend.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + userId;
    }
    )

    return div1Friend;
}

setTimeout(function(){
    for (var i = 0; i < listAllFriendName.length; i++){
        divFriendAreaOnTheRightSide.appendChild(createDiv1Friend("../FileUser/Image/" + listAllFriendId[i] + "/avatar.jpg", listAllFriendName[i], listAllFriendId[i]));
    }
}, 500);