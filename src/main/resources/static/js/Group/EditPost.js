divDeleteAttachedFile.addEventListener("click", () => 
{
    if (inputRadio2.checked == true){
        inputRadio2.checked = false;
        flagDeleteOldAttachedFile = 0;
    }
    else{
        inputRadio2.checked = true;
        flagDeleteOldAttachedFile = 1;
    }
}
)

divDeleteTagedFriend.addEventListener("click", () => 
{
    if (inputRadio1.checked == true){
        inputRadio1.checked = false;
        flagDeleteOldTagedFriend = 0;
    }
    else{
        inputRadio1.checked = true;
        flagDeleteOldTagedFriend = 1;
    }
}
)

iCloseEditPost.addEventListener("click", () => 
{
    divEditPost.style.transform = "scale(0)";
    divBlur.style.display = "none";
}
)

// create element to show that file selection was successful.
function createElementToShowThatFileSelectionWasSuccessfullInEditPost(file){
    let element = document.createElement('div');
    element.className = 'divFile';
    element.style.display = 'flex';
    element.style.justifyContent = 'space-between';
    element.style.padding = '5px 5px';
    element.style.backgroundColor = '#e4e6eb';
    element.style.width = 'fit-content';
    element.style.maxHeight = '40px';
    element.style.borderRadius = '8px';
    element.style.color = 'gray';
    element.style.flexWrap = 'nowrap';

    let fileNameText = document.createTextNode(file.name);
    element.appendChild(fileNameText);

    let deleteIcon = document.createElement('i');
    deleteIcon.style.padding = '5px 8px';
    deleteIcon.style.backgroundColor = 'white';
    deleteIcon.style.borderRadius = '50%';
    deleteIcon.id = 'iDeleteFile';
    deleteIcon.className = 'fa-solid fa-xmark';

    element.appendChild(deleteIcon);

    divContentImgVideoInEditPost.appendChild(element);

    // add element to mapFileInPost
    mapFileUploadInEditPost.set(deleteIcon, file);
    
    // event for deleteIcon
    deleteIcon.addEventListener("click", () => 
    {
        mapFileUploadInEditPost.delete(deleteIcon);
        element.remove();
    }
    )
}

// function create element to show that tag friend successful
function createTagedFriendInEditPost(userId, userName) {
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

    mapTagFriendInEditPost1.set(deleteIcon, userId);

    deleteIcon.addEventListener("click", () => 
    {
        mapTagFriendInEditPost1.delete(deleteIcon);
        mapTagFriendInEditPost2.delete(userId);
        element.remove();
    }
    )

    divContainTagedFriendInEditPost.appendChild(element);
}

imgDisplayDivIconInEditPost.addEventListener("click", () =>
{
    divIcon.style.transform = "scale(1)";
    currentInputOrTextArea = textAreaInEditPost;
})

imgUploadFileInEditPost.addEventListener("click", () => 
{
    inputUploadFileInEdtiPost.click();
}
)

inputUploadFileInEdtiPost.addEventListener("change", (e) => 
{
    var listFile = e.target.files;
    for (var i = 0; i < listFile.length; i++){
        createElementToShowThatFileSelectionWasSuccessfullInEditPost(listFile[i]);
    }
}
)

imgDisplayTagFriendInEdtiPost.addEventListener("click", () => 
{
    divTagFriend.style.transform = "scale(1)";
}
)

// function set data for edit post box
function setDataForUpdatePost(postId){
    var index = mapPostIdIndex.get(postId);
    textAreaInEditPost.value = allPostInGroup[index].caption;
    if (allPostInGroup[index].anonymous == 1){
        switchInEditPost.click();
    }

}

// function clicking switch in edit post
switchInEditPost.addEventListener("click", () => 
{
    if (flagAnonymousInEditPost == 0){
        imgUserInEditPost.src = "../Img/Anonymous.png";
        flagAnonymousInEditPost = 1;
    }
    else{
        flagAnonymousInEditPost = 0;
        imgUserInEditPost.src = "../FileUser/Image/" + idOfUserRequest + "/avatar.jpg";
    }
}
)

// function send request update post
function sendRequestUpdatePost(postId){
    const formData = new FormData();
    createFormDataUpdatePost(formData, postId, textAreaInEditPost.value);
    const token = getCookie("jwtToken");
    fetch('/handleGroup/updatePost', {
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
        document.querySelector(".divContainSpinner").style.display = "flex";
        document.querySelector("#pTextSpinner").innerHTML = "Update post successfully!";
        setTimeout(function() {
            location.reload();
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function createFormDataUpdatePost(formData, postId, caption){
    for (let [key, value] of mapFileUploadInEditPost.entries()) {
        formData.append("files", value);
    }
    formData.append("anonymous", flagAnonymousInEditPost);
    formData.append("deleteAttached", flagDeleteOldAttachedFile);
    formData.append("deleteTaged", flagDeleteOldTagedFriend);
    formData.append("postId", postId);
    formData.append("caption", caption);
    for (let [key, value] of mapTagFriendInEditPost2.entries()) {
        formData.append("listIdTaged", key);
    }
    formData.append("groupId", getParam("groupId"));
}

buttonUpdatePost.addEventListener("click", () => 
{
    sendRequestUpdatePost(currentPostIdInEditPost);
}
)