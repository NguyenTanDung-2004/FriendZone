function createMutualFriend(userName, userId){
   // Create the div element with the class "div1Friend"
    const div1Friend = document.createElement('div');
    div1Friend.classList.add('div1Friend');

    // Create the img element with the specified src and alt attributes
    const img = document.createElement('img');
    img.src = "../FileUser/Image/" + userId + "/avatar.jpg";
    img.alt = "";

    // Create the p element with the text content "Nguyễn Tấn Dũng"
    const p = document.createElement('p');
    p.textContent = userName;

    if (flagAdmin == 1){
        // Create the parent div element
        const divRemove = document.createElement('div');
        divRemove.className = 'divDelete divChild';

        // Create the <i> element with the font-awesome class
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-ban';

        // Create the <p> element with the text "Remove"
        const text = document.createElement('p');
        text.textContent = 'Remove';

        // Append the <i> and <p> elements to the parent <div>
        divRemove.appendChild(icon);
        divRemove.appendChild(text);
        div1Friend.appendChild(divRemove);

        divRemove.addEventListener("click", (event) => 
        {
            const confirm1 = confirm("Are you sure you want to kick this member?");
            if (confirm1){
                kickMember(div1Friend, userId);
            }
            event.stopPropagation();
        }
        )
    }

    // Append the img and p elements to the div1Friend
    div1Friend.appendChild(img);
    div1Friend.appendChild(p);

    div1Friend.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + userId;
    }
    )

    divContentMutualFriend.appendChild(div1Friend);
}

function createUnknowFriend(userName, userId){
    // Create the main div element with the class "div1Friend"
    const div1Friend = document.createElement('div');
    div1Friend.classList.add('div1Friend');

    // Create the img element with the specified src and alt attributes
    const img = document.createElement('img');
    img.src = "../FileUser/Image/" + userId + "/avatar.jpg";
    img.alt = "";

    // Create the p element with the text content "Nguyễn Tấn Dũng"
    const pName = document.createElement('p');
    pName.textContent = userName;

    // Create the div element with the class "divAddFriend"
    const divAddFriend = document.createElement('div');
    divAddFriend.classList.add('divAddFriend');

    // Create the i element with the specified styles
    const icon = document.createElement('i');
    icon.setAttribute('data-visualcompletion', 'css-img');
    icon.classList.add('x1b0d499', 'xep6ejk');
    icon.setAttribute('aria-hidden', 'true');
    icon.style.backgroundImage = 'url("https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/H4nyIGJiZy0.png")';
    icon.style.backgroundPosition = '0px -537px';
    icon.style.backgroundSize = '25px 708px';
    icon.style.width = '16px';
    icon.style.height = '16px';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.display = 'inline-block';

    // Create the p element with the text content "Add friend"
    const pAddFriend = document.createElement('p');
    pAddFriend.textContent = "Add friend";

    // Append the icon and text to the divAddFriend
    divAddFriend.appendChild(icon);
    divAddFriend.appendChild(pAddFriend);

    // Append the img, name, and add friend div to the main div1Friend
    div1Friend.appendChild(img);
    div1Friend.appendChild(pName);
    div1Friend.appendChild(divAddFriend);

    if (flagAdmin == 1){
        //------
        // Create the parent div element
        const divRemove = document.createElement('div');
        divRemove.className = 'divDelete divChild';

        // Create the <i> element with the font-awesome class
        const icon1 = document.createElement('i');
        icon1.className = 'fa-solid fa-ban';

        // Create the <p> element with the text "Remove"
        const text = document.createElement('p');
        text.textContent = 'Remove';

        // Append the <i> and <p> elements to the parent <div>
        divRemove.appendChild(icon1);
        divRemove.appendChild(text);
        div1Friend.appendChild(divRemove);
        divRemove.addEventListener("click", (event) => 
        {
            const confirm1 = confirm("Are you sure you want to kick this member?");
            if (confirm1){
                kickMember(div1Friend, userId);
            }
            event.stopPropagation();
        })
        //------
    }

    div1Friend.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + userId;
    }
    )

    divAddFriend.addEventListener("click", (event) => 
    {
        addFriend(userId);
        event.stopPropagation();
    }
    )

    divContentUnknowFriend.appendChild(div1Friend);
}

function createRequestMember(userName, userId){
    const div1Friend = document.createElement('div');
    div1Friend.classList.add('div1Friend');

    // Create the img element with the specified src and alt attributes
    const img = document.createElement('img');
    img.src = "../FileUser/Image/" + userId + "/avatar.jpg";
    img.alt = "";

    // Create the p element with the text content "Nguyễn Tấn Dũng"
    const pName = document.createElement('p');
    pName.textContent = userName;

    // Create the div element with the class "divConfirm divChild"
    const divConfirm = document.createElement('div');
    divConfirm.classList.add('divConfirm', 'divChild');

    // Create the i element with the specified class for the "Accept" button
    const iconCheck = document.createElement('i');
    iconCheck.classList.add('fa-solid', 'fa-check');

    // Create the p element with the text content "Accept"
    const pAccept = document.createElement('p');
    pAccept.textContent = "Accept";

    // Append the icon and text to the divConfirm
    divConfirm.appendChild(iconCheck);
    divConfirm.appendChild(pAccept);

    // Create the div element with the class "divDelete divChild"
    const divDelete = document.createElement('div');
    divDelete.classList.add('divDelete', 'divChild');

    // Create the i element with the specified class for the "Delete" button
    const iconBan = document.createElement('i');
    iconBan.classList.add('fa-solid', 'fa-ban');

    // Create the p element with the text content "Delete"
    const pDelete = document.createElement('p');
    pDelete.textContent = "Delete";

    // Append the icon and text to the divDelete
    divDelete.appendChild(iconBan);
    divDelete.appendChild(pDelete);

    // Append the img, name, and both buttons (Confirm and Delete) to the main div1Friend
    div1Friend.appendChild(img);
    div1Friend.appendChild(pName);
    div1Friend.appendChild(divConfirm);
    div1Friend.appendChild(divDelete);

    div1Friend.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + userId;
    }
    )

    divConfirm.addEventListener("click", (event) => 
    {
        const confirm1 = confirm("Are you sure you want to confirm this user?");
        if (confirm1){
            acceptRequest(userId);
        }
        event.stopPropagation();
    }
    )

    divDelete.addEventListener("click", (event) => 
    {
        const confirm1 = confirm("Are you sure you want to delete this request?");
        if (confirm1){
            deleteRequest(userId, div1Friend);
        }
        event.stopPropagation();
    }
    )

    divContentRequestFriend.appendChild(div1Friend);
}

// function get member
function getMember(){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    fetch('/handleGroup/getMember?groupId=' + groupId, {
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
        console.log(data1.object)
        listMutualFriendsId = data1.object[0];
        listUnknowFriendsId = data1.object[1];
        listRequestFriendsId = data1.object[2];
        listMutualFriendsName = data1.object[3];
        listUnknowFriendsName = data1.object[4];
        listRequestFriendsName = data1.object[5];
        create4MutualFriend();
        create4UnknowFriend();
        create4RequestMember();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getMember();

function create4MutualFriend(){
    for (var i = 0; i < minOfTwoNumbers(4, listMutualFriendsId.length); i++){
        createMutualFriend(listMutualFriendsName[i], listMutualFriendsId[i]);
    }
}

function create4UnknowFriend(){
    for (var i = 0; i < minOfTwoNumbers(4, listUnknowFriendsId.length); i++){
        createUnknowFriend(listUnknowFriendsName[i], listUnknowFriendsId[i]);
    }
}

function create4RequestMember(){
    for (var i = 0; i < minOfTwoNumbers(4, listRequestFriendsId.length); i++){
        createRequestMember(listRequestFriendsName[i], listRequestFriendsId[i]);
    }
}

function minOfTwoNumbers(a, b){
    if (a > b){
        return b;
    }
    else{
        return a;
    }
}

function deleteRequest(userId, element){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    const formData = new FormData();
    formData.append("groupId", groupId);
    formData.append("userId", userId);
    fetch('/handleGroup/deleteRequest', {
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
        element.remove();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function acceptRequest(userId){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    const formData = new FormData();
    formData.append("groupId", groupId);
    formData.append("userId", userId);
    fetch('/handleGroup/acceptRequest1', {
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
       location.reload();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function addFriend(userId){
    const token = getCookie("jwtToken");
    fetch('/user/addFriend?friendId=' + userId, {
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
       location.reload();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function kickMember(element, userId){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    const formData = new FormData();
    formData.append("groupId", groupId);
    formData.append("userId", userId);
    fetch('/handleGroup/kickMember', {
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
       element.remove();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}