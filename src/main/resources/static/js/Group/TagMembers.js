// function create 1 friend in tag friend box
function create1FriendInTagFriendBox(userId, userName){
    // Create the main div element
    let element = document.createElement('div');
    element.id = 'div1Result';

    // Create the img element
    let img = document.createElement('img');
    img.src = '../FileUser/Image/' + userId + '/avatar.jpg';
    img.alt = '';

    // Create the p element
    let p = document.createElement('p');
    let nameText = document.createTextNode(userName);
    p.appendChild(nameText);

    // Append img and p to the main div
    element.appendChild(img);
    element.appendChild(p);

    element.addEventListener("click", () => 
    {
        if (flagEditComment == 1){
            createFriendWhenTagFriendEditComment(userId, userName);
        }
        else{
            if (flagComment == 0){
                if (flagEditPost == 0){
                    if (mapTagFriendInPost2.get(userId) != 1){
                        iCloseTagFriend.click();
                        createTagedFriendInCreatePostBox(userId, userName);
                        mapTagFriendInPost2.set(userId, 1);
                    }
                }
                else{
                    if (mapTagFriendInEditPost2.get(userId) != 1){
                        iCloseTagFriend.click();
                        createTagedFriendInEditPost(userId, userName);
                        mapTagFriendInEditPost2.set(userId, 1);
                    }
                }
            }
            else{
                tagFriendInComment(userName, userId);
            }
        }
    }
    )

    divContainFriendInTagFriendBox.appendChild(element);
}

// function create element to show that tag friend successful
function createTagedFriendInCreatePostBox(userId, userName) {
    // Create the main div element
    let element = document.createElement('div');
    element.className = 'divFriend';
    element.style.display = 'flex';
    element.style.justifyContent = 'space-between';
    element.style.padding = '5px 5px';
    element.style.backgroundColor = 'var(--backgroundBody)';
    element.style.width = 'fit-content';
    element.style.maxHeight = '40px';
    element.style.borderRadius = '8px';
    element.style.color = 'gray';

    // Get the friend's name from the list using the map
    let friendName = '@' + userName;
    let friendNameText = document.createTextNode(friendName);
    element.appendChild(friendNameText);

    // Create the delete icon element
    let deleteIcon = document.createElement('i');
    deleteIcon.style.padding = '5px 8px';
    deleteIcon.style.backgroundColor = 'white';
    deleteIcon.style.borderRadius = '50%';
    deleteIcon.id = 'iDeleteTagedFriend';
    deleteIcon.className = 'fa-solid fa-xmark';

    // Append the delete icon to the main div
    element.appendChild(deleteIcon);

    mapTagFriendInPost1.set(deleteIcon, userId);

    deleteIcon.addEventListener("click", () => 
    {
        mapTagFriendInPost1.delete(deleteIcon);
        mapTagFriendInPost2.delete(userId);
        element.remove();
    }
    )

    divContainTagedFriend.appendChild(element);
}

// function get listFriend.
function getListFriend(){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    fetch('/handleGroup/getAllMembersInGroup?groupId=' + groupId, {
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
        console.log(data1);
        listFriendId = data1.object[0];
        listFriendName = data1.object[1];
        addDataToDivTagFriend();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getListFriend();

function addDataToDivTagFriend(){
    for (var i = 0; i < listFriendId.length; i++){
        create1FriendInTagFriendBox(listFriendId[i], listFriendName[i]);
    }
}

// function display tag friend box 
imgDisplayTagFriend.addEventListener("click", () => 
{
    divTagFriend.style.transform = "scale(1)";
}
)

// function turn off tag friend box 
iCloseTagFriend.addEventListener("click", () => 
{
    divTagFriend.style.transform = "scale(0)";
}
)