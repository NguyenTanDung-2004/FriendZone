divJoinGroup.addEventListener("click", () => 
{
    if (statusOfRequestJoinGroup == 1){
        divJoinGroup.querySelector("p").innerHTML = "Cancel request";
        sendRequestJoinGroup();
    }
    else if (statusOfRequestJoinGroup == 2){
        divJoinGroup.querySelector("p").innerHTML = "Join group";
        sendRequestCancelRequest();
    }
    else if (statusOfRequestJoinGroup == 3){
        sendRequestAcceptRequest();
    }
}
)

function setDataForPInJoinGroup(){
    if (statusOfRequestJoinGroup == 1){
        divJoinGroup.querySelector("p").innerHTML = "Join group";
    }
    else if (statusOfRequestJoinGroup == 2){
        divJoinGroup.querySelector("p").innerHTML = "Cancel request";
    }
    else if (statusOfRequestJoinGroup == 3){
        divJoinGroup.querySelector("p").innerHTML = "Accept request";
    }
}

setDataForPInJoinGroup();

// send request join group
function sendRequestJoinGroup(){
    const formData = new FormData();
    const token = getCookie("jwtToken");
    formData.append("groupId", getParam("groupId"));
    fetch('/handleGroup/joinGroup', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        setTimeout(function(){
            location.reload();
        }, 300)
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// send request join group
function sendRequestCancelRequest(){
    const formData = new FormData();
    const token = getCookie("jwtToken");
    formData.append("groupId", getParam("groupId"));
    fetch('/handleGroup/cancelRequest', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        setTimeout(function(){
            location.reload();
        }, 300)
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// send request accept request
function sendRequestAcceptRequest(){
    const formData = new FormData();
    const token = getCookie("jwtToken");
    formData.append("groupId", getParam("groupId"));
    fetch('/handleGroup/acceptRequest', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        setTimeout(function(){
            location.reload();
        }, 300)
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
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

// create list 10 members
if (list10MemberIds.length == 0){
    iSeeAll.style.display = "none";
}
else{
    for (var i = 0; i < list10MemberIds.length; i++){
        var img = document.createElement("img");
        img.src = "../FileUser/Image/" + list10MemberIds[i] + "/avatar.jpg";
        divImgGroupMembers.insertBefore(img, divImgGroupMembers.firstChild);
    }
}