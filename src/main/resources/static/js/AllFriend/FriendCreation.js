function createDiv1Friend(imgSrc, userName, numberOfFriends, userId){
    // Create the main div element with class "div1Friend"
    var div1Friend = document.createElement("div");
    div1Friend.className = "div1Friend";

    // Create the img element and set its attributes
    var img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";

    // Create the div element with class "divBottom"
    var divBottom = document.createElement("div");
    divBottom.className = "divBottom";

    // Create the div element with class "divInfo"
    var divInfo = document.createElement("div");
    divInfo.className = "divInfo";

    // Create the p element with class "pName" and set its text content
    var pName = document.createElement("p");
    pName.className = "pName";
    pName.textContent = userName;

    // Create the p element with class "pNumberOfFriends" and set its text content
    var pNumberOfFriends = document.createElement("p");
    pNumberOfFriends.className = "pNumberOfFriends";
    pNumberOfFriends.textContent = numberOfFriends + " friends";

    // Append the p elements to the divInfo
    divInfo.appendChild(pName);
    divInfo.appendChild(pNumberOfFriends);

    // Create the div element with class "divButtonUnFriend" and set its text content
    var divButtonUnFriend = document.createElement("div");
    divButtonUnFriend.className = "divButtonUnFriend";
    divButtonUnFriend.textContent = "Unfriend";

    // Append the divInfo and divButtonUnFriend to the divBottom
    divBottom.appendChild(divInfo);
    divBottom.appendChild(divButtonUnFriend);

    // Append the img and divBottom to the main div1Friend
    div1Friend.appendChild(img);
    div1Friend.appendChild(divBottom);

    if (getParam("userId") != ""){
        img.addEventListener("click", () => 
        {
            window.location = "http://localhost:8080/FriendZone?id=" + userId;
        }
        )
    }

    return div1Friend;
}

function createDiv1FriendUnknow(imgSrc, userName, numberOfFriends, userId){
    // Create the main div element with class "div1Friend"
    var div1Friend = document.createElement("div");
    div1Friend.className = "div1Friend";

    // Create the img element and set its attributes
    var img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";

    // Create the div element with class "divBottom"
    var divBottom = document.createElement("div");
    divBottom.className = "divBottom";

    // Create the div element with class "divInfo"
    var divInfo = document.createElement("div");
    divInfo.className = "divInfo";

    // Create the p element with class "pName" and set its text content
    var pName = document.createElement("p");
    pName.className = "pName";
    pName.textContent = userName;

    // Create the p element with class "pNumberOfFriends" and set its text content
    var pNumberOfFriends = document.createElement("p");
    pNumberOfFriends.className = "pNumberOfFriends";
    pNumberOfFriends.textContent = numberOfFriends + " friends";

    // Append the p elements to the divInfo
    divInfo.appendChild(pName);
    divInfo.appendChild(pNumberOfFriends);

    // Create the div element with class "divButtonUnFriend" and set its text content
    var divButtonUnFriend = document.createElement("div");
    divButtonUnFriend.className = "divButtonUnFriend1";
    divButtonUnFriend.textContent = "Add friend";

    // Append the divInfo and divButtonUnFriend to the divBottom
    divBottom.appendChild(divInfo);
    divBottom.appendChild(divButtonUnFriend);

    // Append the img and divBottom to the main div1Friend
    div1Friend.appendChild(img);
    div1Friend.appendChild(divBottom);

    if (getParam("userId") != ""){
        img.addEventListener("click", () => 
        {
            window.location = "http://localhost:8080/FriendZone?id=" + userId;
        }
        )
    }

    return div1Friend;
}

// function create all friend
function createAllFriends(){
    for (var i = 0; i < listAllFriend.length; i++){
        divAllFriends.appendChild(createDiv1Friend(
            "../FileUser/Image/" + listAllFriend[i].userId + "/avatar.jpg",
            listAllFriend[i].userName,
            listAllFriend[i].numberOfFriends,
            listAllFriend[i].userId
        ))
    }
    setDataForVariable();
    eventHovering();
    accessToPersonalPage();
    unfriend();
}

function setDataForVariable(){
    arrayDivUnfriend = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div > div.divButtonUnFriend");
    arrayImg = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > img")
    arrayDivBottom = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div");
    arrayDiv1Friend = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div")
    arrayDivUnfriend1 = document.querySelectorAll("body > div > div.divMain > div.divAllFriend > div > div > div.divButtonUnFriend1");
}

// function create all mutual friend
function createAllMutualFriends(){
    for (var i = 0; i < listAllMutualFriend.length; i++){
        divAllFriends.appendChild(createDiv1Friend(
            "../FileUser/Image/" + listAllMutualFriend[i].userId + "/avatar.jpg",
            listAllMutualFriend[i].userName,
            listAllMutualFriend[i].numberOfFriends,
            listAllMutualFriend[i].userId
        ))
    }
    setDataForVariable();
    eventHovering();
    accessToPersonalPage();
    unMutualFriend();
}

// function create all unknow friend
function createAllUnknowFriends(){
    for (var i = 0; i < listAllUnknowFriend.length; i++){
        divAllFriends.appendChild(createDiv1FriendUnknow(
            "../FileUser/Image/" + listAllUnknowFriend[i].userId + "/avatar.jpg",
            listAllUnknowFriend[i].userName,
            listAllUnknowFriend[i].numberOfFriends,
            listAllUnknowFriend[i].userId
        ))
    }
    setDataForVariable();
    eventHovering();
    accessToPersonalPage();
    addUnknowFriend();
}