
if (checkFriend == 0){
    divAddFriend.style.display = "flex";
    pContentAddFriend.innerHTML = "Add friend";
    divAddFriend.style.backgroundColor = "#0866ff";
    divAddFriend.style.color = "white";
}
else if (checkFriend == 1){
    divAddFriend.style.display = "flex";
    pContentAddFriend.innerHTML = "Cancel request";
    divAddFriend.style.backgroundColor = "#0866ff";
    divAddFriend.style.color = "white";
}
else if (checkFriend == 2){
    divAddFriend.style.display = "flex";
    pContentAddFriend.innerHTML = "unFriend";
    divAddFriend.style.backgroundColor = "#e4e6eb";
    divAddFriend.style.color = "black";
}
else if (checkFriend == 11){
    divAddFriend.style.display = "flex";
    pContentAddFriend.innerHTML = "Confirm";
    divAddFriend.style.backgroundColor = "#0866ff";
    divAddFriend.style.color = "white";
}
else if (checkFriend == 12){
    divAddFriend.style.display = "flex";
    pContentAddFriend.innerHTML = "unFriend";
    divAddFriend.style.backgroundColor = "#e4e6eb";
    divAddFriend.style.color = "black";
}
else if (checkFriend == -1){
    divAddFriend.style.display = "none";
}

divAddFriend.addEventListener("click", () => 
    {
        if (checkFriend == 0){
            sendRequestAddFriend();
        }
        else if (checkFriend == 1){
            sendRequestDeleteFriend();
        }
        else if (checkFriend == 11){
            sendRequestConfirmFriend();
        }
        else if (checkFriend == 2 || checkFriend == 12){
            sendRequestDeleteFriend();
        }
    }
)

function sendRequestAddFriend(){
    const token = getCookie("jwtToken");
    var friendId = getParam("id");
    fetch('/user/addFriend?friendId=' + friendId, {
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
        divAddFriend.style.display = "flex";
        pContentAddFriend.innerHTML = "Cancel request";
        divAddFriend.style.backgroundColor = "#0866ff";
        divAddFriend.style.color = "white";
        setTimeout(function() {
            window.location.reload();
        }, 500); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function delete friend
function sendRequestDeleteFriend(){
    const token = getCookie("jwtToken");
    var friendId = getParam("id");
    fetch('/user/deleteFriend?friendId=' + friendId, {
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
        divAddFriend.style.display = "flex";
        pContentAddFriend.innerHTML = "Add friend";
        divAddFriend.style.backgroundColor = "#0866ff";
        divAddFriend.style.color = "white";
        setTimeout(function() {
            window.location.reload();
        }, 500); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function confrim friend
function sendRequestConfirmFriend(){
    const token = getCookie("jwtToken");
    var friendId = getParam("id");
    fetch('/user/confirmFriend?friendId=' + friendId, {
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
        console.log(data1);
        divAddFriend.style.display = "flex";
        pContentAddFriend.innerHTML = "unFriend";
        divAddFriend.style.backgroundColor = "#e4e6eb";
        divAddFriend.style.color = "black";
        // setTimeout(function() {
        //     window.location.reload();
        // }, 500); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

