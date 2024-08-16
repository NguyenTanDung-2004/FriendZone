//function unfriend
function unfriend(){
    for (let i = 0; i < arrayDivUnfriend.length; i++){
        arrayDivUnfriend[i].addEventListener("click", (e) => 
        {
            currentUserId = listAllFriend[i].userId;
            if (confirm("Are you sure you want to unfriend?")) {
                sendRequestDeleteFriend();
            } else {
            }
            e.stopPropagation();
        }
        )
    }
}

//function un mutual friend
function unMutualFriend(){
    for (let i = 0; i < arrayDivUnfriend.length; i++){
        arrayDivUnfriend[i].addEventListener("click", (e) => 
        {
            currentUserId = listAllMutualFriend[i].userId;
            if (confirm("Are you sure you want to unfriend?")) {
                sendRequestDeleteFriend();
            } else {
            }
            e.stopPropagation();
        }
        )
    }
}

//function addUnknowFriend
function addUnknowFriend(){
    for (let i = 0; i < arrayDivUnfriend1.length; i++){
        arrayDivUnfriend1[i].addEventListener("click", (e) => 
        {
            currentUserId = listAllUnknowFriend[i].userId;
            if (arrayDivUnfriend1[i].innerHTML == "Add friend"){
                sendRequestAddFriend(arrayDivUnfriend1[i]);
            }
            else if (arrayDivUnfriend1[i].innerHTML == "Cancel request"){
                sendRequestDeleteFriend();
            }
            else if (arrayDivUnfriend1[i].innerHTML == "Confirm request"){
                sendRequestConfirmFriend();
            }
            e.stopPropagation();
        }
        )
    }
}

function eventHovering(){
        // event hovering img
    for (let i = 0; i < arrayImg.length; i++){
        arrayImg[i].addEventListener("mouseenter", () => 
        {
            arrayDivBottom[i].style.display = "none";
            arrayImg[i].style.height = "100%";
            arrayImg[i].style.borderBottomLeftRadius = "10px";
            arrayImg[i].style.borderBottomRightRadius = "10px";
            arrayDiv1Friend[i].style.paddingBottom = "0";
        }
        )
        arrayImg[i].addEventListener("mouseout", () => 
        {
            arrayImg[i].style.height = "35vh";
            arrayDiv1Friend[i].style.paddingBottom = "10px";
            arrayImg[i].style.borderBottomLeftRadius = "0px";
            arrayImg[i].style.borderBottomRightRadius = "0px";
            setTimeout(function(){
                arrayDivBottom[i].style.display = "block";
            }, 300)
        }
        )
    }
}

//function access to personal page
function accessToPersonalPage(){
    for (let i = 0; i < arrayDiv1Friend.length; i++){
        if (getParam("userId") == ""){
            arrayDiv1Friend[i].addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?id=" + listAllFriend[i].userId;
            }
            )
        }
    }
}

// back to newfeed
document.querySelector("body > div > div.header > div.left").addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone/newFeed";
}
)   

// back to personal page
document.querySelector("#imgUser").addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone";
}
)

// function delete friend
function sendRequestDeleteFriend(){
    const token = getCookie("jwtToken");
    fetch('/user/deleteFriend?friendId=' + currentUserId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: ""
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
       setTimeout(function(){
            if (getParam("userId") == ""){
                window.location = "http://localhost:8080/FriendZone/allFriend";
            }
            else{
                window.location = "http://localhost:8080/FriendZone/allFriend?userId=" + getParam("userId");
            }
       }, 300);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// animation for filter
pRight.addEventListener("click", () => 
{
    divYourChoice.style.width = "50%";
    divYourChoice.style.left = "50%";
    pRight.style.color = "white";
    pLeft.style.color = "black";
    divAllFriends.innerHTML = "";
    createAllUnknowFriends();
    setStatusForUnknown();
}
)

pLeft.addEventListener("click", () => 
{
    divYourChoice.style.width = "45%";
    divYourChoice.style.left = "0%";
    pRight.style.color = "black";
    pLeft.style.color = "white";
    divAllFriends.innerHTML = "";
    createAllMutualFriends();
}
)

//function add friend
function sendRequestAddFriend(div){
    const token = getCookie("jwtToken");
    fetch('/user/addFriend?friendId=' + currentUserId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: ""
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        div.innerHTML = "Cancel request";
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// // function delete friend
// function sendRequestDeleteFriend(){
//     const token = getCookie("jwtToken");
//     var friendId = getParam("id");
//     fetch('/user/deleteFriend?friendId=' + friendId, {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer ' + token
//         },
//         body: ""
//     })
//     .then(response => {
//         // if (!response.ok) {
//         //     throw new Error('Network response was not ok ' + response.statusText);
//         // }
//         return response.json(); // Change this to response.json() if the response is JSON
//     })
//     .then(data1 => {
//         divAddFriend.style.display = "flex";
//         pContentAddFriend.innerHTML = "Add friend";
//         divAddFriend.style.backgroundColor = "#0866ff";
//         divAddFriend.style.color = "white";
//         setTimeout(function() {
//             window.location.reload();
//         }, 500); // 1000 milliseconds = 1 second
//     })
//     .catch(error => {
//         console.error('Error during fetch operation:', error);
//     });
// }

// function confrim friend
function sendRequestConfirmFriend(){
    const token = getCookie("jwtToken");
    fetch('/user/confirmFriend?friendId=' + currentUserId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: ""
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        
        setTimeout(function(){
            if (getParam("userId") == ""){
                window.location = "http://localhost:8080/FriendZone/allFriend";
            }
            else{
                window.location = "http://localhost:8080/FriendZone/allFriend?userId=" + getParam("userId");
            }
       }, 0);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}