function getFriend(){
    const token = getCookie("jwtToken");
    var userId = getParam("userId");
    fetch('/controllerFriend/getAllFriend?userId=' + userId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        listAllFriend = data1.object;
        console.log(listAllFriend);
        createAllFriends();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function getFriendIncludedMutualAndUnknow(){
    const token = getCookie("jwtToken");
    var userId = getParam("userId");
    fetch('/controllerFriend/getAllFriend?userId=' + userId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        const map = new Map(Object.entries(data1.object));
        console.log(map);
        for (const [key, value] of map) {
            createDataForListAllMutualOrUnknowFriends(key, value);
        }
        createAllMutualFriends();
        getListStatusOfUnknown();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function create listStatusOfUnknown
function getListStatusOfUnknown(){
    const token = getCookie("jwtToken");
    const formData = new FormData();
    for (var i = 0; i < listAllUnknowFriend.length; i++){
        formData.append("listUnknownUserId", listAllUnknowFriend[i].userId);
    }
    fetch('/controllerFriend/getStatusOfUnknowFriend', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        listStatusOfUnknown = data1.object;
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function getUserName
function getUserName(){
    const token = getCookie("jwtToken");
    var userId = getParam("userId");
    fetch('/controllerFriend/getUserName?userId=' + userId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        pUserName.innerHTML = data1.object;
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}


if (getParam("userId") == ""){
    getFriend();
    divFilter.style.display = "none";
}
else{
    getFriendIncludedMutualAndUnknow();
    getUserName();
    pUserName.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + getParam("userId");
    }
    )
}

//function get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//function get param from url
function getParam(name){
    const url = new URL(window.location.href);

    // Create a URLSearchParams object
    const params = new URLSearchParams(url.search);

    // Get the value of the 'id' parameter
    const value = params.get(name);
    if (value == null){
        return "";
    }
    return value;
}

// function extract value
function extractString(nameOfPart, responseString){

    const regex = /userId=([^,]+), userName=([^,]+), numberOfFriends=([^,)]+)/;

    const match = responseString.match(regex);

    if (match) {
        const userId = match[1];
        const userName = match[2];
        const numberOfFriends = parseInt(match[3], 10);

        if (nameOfPart == "userId"){
            return userId;
        }
        else if (nameOfPart == "userName"){
            return userName;
        }
        else{
            return numberOfFriends;
        }
    } else {
        console.log('No match found');
    }
}

// function create 1 data for list 
function create1Data(userId, userName, numberOfFriends){
    const data = {
        userId,
        userName,
        numberOfFriends
    }
    return data;
}

// function create data for listAllMutualOrUnknowFriends
function createDataForListAllMutualOrUnknowFriends(key, value){
    if (value == 0){
        listAllUnknowFriend.push(create1Data(
            extractString("userId", key),
            extractString("userName", key),
            parseInt(extractString("numberOfFriends", key))
        ))
    }
    else if (value == 1){
        listAllMutualFriend.push(create1Data(
            extractString("userId", key),
            extractString("userName", key),
            parseInt(extractString("numberOfFriends", key))
        ))
    }
}

// function set status for unknow
function setStatusForUnknown(){
    for (var i = 0; i < listStatusOfUnknown.length; i++){
        if (listStatusOfUnknown[i] == 1){
            arrayDivUnfriend1[i].innerHTML = "Add friend";
        }
        else if (listStatusOfUnknown[i] == 2){
            arrayDivUnfriend1[i].innerHTML = "Cancel request";
        }
        else{
            arrayDivUnfriend1[i].innerHTML = "Confirm request";
        }
    }
}