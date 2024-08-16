
function createDiv1Notification(imgLink, classIcon, name, time, color, content) {
    // Create the main notification div
    var divNotification = document.createElement('div');
    divNotification.className = 'div1Notification';
    divNotification.style.display = 'flex';
    divNotification.style.gap = '15px';
    divNotification.style.cursor = 'pointer';
    divNotification.style.alignItems = "center";
    divNotification.style.borderRadius = "10px"
    divNotification.style.padding = "10px 10px"
    divNotification.addEventListener("mouseenter", () => 
        {
            divNotification.style.backgroundColor = "#e4e6eb";
        }
    )
    divNotification.addEventListener("mouseleave", () => 
        {
            divNotification.style.backgroundColor = "initial";
        }
    )
    // Create the left part of the notification item
    var divNotificationLeft = document.createElement('div');
    divNotificationLeft.className = 'div1NotificationLeft';
    divNotificationLeft.style.position = 'relative';
    divNotificationLeft.style.width = 'fit-content';

    // Create the image element
    var imgElement = document.createElement('img');
    imgElement.src = imgLink;
    imgElement.style.height = '80px';
    imgElement.style.width = '80px';
    imgElement.style.objectFit = 'cover';
    imgElement.style.borderRadius = '50%';
    imgElement.alt = '';
    
    // Create the thumbs-up icon
    var iconElement = document.createElement('i');
    iconElement.className = classIcon;
    iconElement.style.position = 'absolute';
    iconElement.style.fontSize = '23px';
    iconElement.style.color = 'white';
    iconElement.style.padding = '7px';
    iconElement.style.backgroundColor = color;//'#508D4E' green; //'#1877f2' blue;
    iconElement.style.borderRadius = '50%';
    iconElement.style.bottom = '4px';
    iconElement.style.right = '-8px';

    divNotificationLeft.appendChild(imgElement);
    divNotificationLeft.appendChild(iconElement);

    // Create the right part of the notification item
    var divNotificationRight = document.createElement('div');
    divNotificationRight.className = 'div1NotificationRight';

    var textElement1 = document.createElement('p');
    textElement1.style.fontSize = '18px';
    textElement1.style.margin = '0';
    textElement1.innerHTML = '<span style="font-weight: 600;">' + name + '</span> ' + content;

    var textElement2 = document.createElement('p');
    textElement2.style.margin = '0';
    textElement2.textContent = time;

    divNotificationRight.appendChild(textElement1);
    divNotificationRight.appendChild(textElement2);

    divNotification.appendChild(divNotificationLeft);
    divNotification.appendChild(divNotificationRight);

    return divNotification;
}

iBell.addEventListener("click", () => 
    {
        if (flagTurnOnTurnOfNotifications == 0){
            divNotifications.style.display = "block";
            flagTurnOnTurnOfNotifications = 1;
            markReadNotifications();
        }
        else{
            divNotifications.style.display = "none";
            flagTurnOnTurnOfNotifications = 0;
        }
    }
)

// get 15 notifications.
function get15Notifications(){
    const token = getCookie("jwtToken");
    fetch('/user/getTop15Notifications', {
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
        var object = data1.object;
        listNofitications = object;
        console.log(object);
        for (let i = 0; i < object.length; i++){
            var classAndColor = createIconNotification(object[i].type);
            var div1Notification = createDiv1Notification("../FileUser/Image/" + object[i].createdNotifyUserId + "/avatar.jpg",
                                                        classAndColor[0],
                                                        object[i].createdNotifyUserName,
                                                        formatDate(object[i].time),
                                                        classAndColor[1],
                                                        object[i].content
                                                        );
            if (object[i].type == 4 || object[i].type == 5){
                div1Notification.addEventListener("click", () => 
                    {
                        window.location = "http://localhost:8080/FriendZone?id=" + object[i].idObject;
                    }
                )
            }
            if (object[i].type == 2 || object[i].type == 3){
                div1Notification.addEventListener("click", () => 
                    {
                        window.location = "http://localhost:8080/FriendZone/postDetail?postId=" + object[i].idObject;
                    }
                )
            }
            if (object[i].type == 6){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    let arr = idObject.split(",");
                    window.location = "http://localhost:8080/FriendZone/postDetail?" + arr[0] + "&" 
                                    + arr[1] + "&" + arr[2];
                })
            }
            if (object[i].type == 7){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    let arr = idObject.split(",");
                    window.location = "http://localhost:8080/FriendZone?" + arr[0] + "&" + arr[1] + "&" + arr[2];
                })
            }
            if (object[i].type == 8){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    window.location = "http://localhost:8080/FriendZone" + idObject;
                })
            }
            if (object[i].type == 9){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    let arr = idObject.split(",");
                    window.location = "http://localhost:8080/FriendZone/group?" + arr[0] + "&" + arr[1] + "&action=scrollToPost";
                })
            }
            if (object[i].type == 10){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    let arr = idObject.split(",");
                    window.location = "http://localhost:8080/FriendZone/group?" + arr[0] + "&" + arr[1] + "&" + arr[2] + "&" + arr[3] + "&action=tagedInComment";
                })
            }
            if (object[i].type == 11){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    window.location = "http://localhost:8080/FriendZone/group?" + idObject;
                })
            }
            if (object[i].type == 12){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    window.location = "http://localhost:8080/FriendZone/group?" + idObject;
                })
            }
            if (object[i].type == 13){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    window.location = "http://localhost:8080/FriendZone/group?" + idObject;
                })
            }
            if (object[i].type == 14){
                div1Notification.addEventListener("click", () => {
                    var idObject = object[i].idObject;
                    let arr = idObject.split(",");
                    window.location = "http://localhost:8080/FriendZone/group?" + arr[0] + "&" + arr[1] + "&action=scrollToPost";
                })
            }
            

            if (object[i].flag == 1){
                numberOfNotifications++;
            }

            divNotificationWithScroll.appendChild(div1Notification);
        }
        document.querySelector("#iBell > p").innerHTML = numberOfNotifications;
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
get15Notifications();





// function setup icon based on type of notification
function createIconNotification(type){
    var classAndColor = [];
    if (type == 4 || type == 5){ // friend
        classAndColor.push("fa-solid fa-user-group");
        classAndColor.push("#1877f2")
    }
    else if (type == 3){
        classAndColor.push("fa-solid fa-tags");
        classAndColor.push("#1877f2")
    }
    else if (type == 2){
        classAndColor.push("fa-solid fa-thumbs-up");
        classAndColor.push("#1877f2")
    }
    else if (type == 6){
        classAndColor.push("fa-solid fa-comment");
        classAndColor.push("#508D4E")
    }
    else if (type == 7){
        classAndColor.push("fa-solid fa-share");
        classAndColor.push("#1877f2")
    }
    else if (type == 8){
        classAndColor.push("fa-solid fa-user-group");
        classAndColor.push("#1877f2")
    }
    else if (type == 9){
        classAndColor.push("fa-solid fa-tags");
        classAndColor.push("#1877f2")
    }
    else if (type == 10){
        classAndColor.push("fa-solid fa-comment");
        classAndColor.push("#508D4E")
    }
    else if (type == 11){
        classAndColor.push("fa-solid fa-ban");
        classAndColor.push("red")
    }
    else if (type == 12){
        classAndColor.push("fa-solid fa-check");
        classAndColor.push("#1877f2")
    }
    else if (type == 13){
        classAndColor.push("fa-solid fa-ban");
        classAndColor.push("red")
    }
    else if (type == 14){
        classAndColor.push("fa-solid fa-check");
        classAndColor.push("#1877f2")
    }
    return classAndColor;
}

// function mark read notifications
function markReadNotifications(){
    const token = getCookie("jwtToken");
    fetch('/user/markReadNotifications', {
        method: 'POST',
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
        console.log(data1);
        document.querySelector("#iBell > p").innerHTML = "0";
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}