// function set data for create post
function setDataForCreatePost(scope, caption){
    selectorScopePost.value = scope;

    if (scope == 1){
        iIconScope.className = friendScope
    }
    else if (scope == 2){
        iIconScope.className = publicScope
    }
    else {
        iIconScope.className = onlyScope
    }

    textareaCreatePost.value = caption;

    updateStyleAndTextForCreatePostBox("107", "95vh", "2vh", "Update Post", "Update","flex");
    divBlurBox.style.display = "block";
}

// update Style for create post box
function updateStyleAndTextForCreatePostBox(zIndex, maxHeight, top, textTitleCreatePost, valueOfButton, display){
    divCreatePostBox.style.zIndex = zIndex;
    divCreatePostBox.style.maxHeight = maxHeight;
    divCreatePostBox.style.top = top;
    var pTitleCreatePost = document.querySelector("#pTitleCreatePost");
    pTitleCreatePost.innerHTML = textTitleCreatePost;

    var divDeleteTagedFriend = document.querySelector("#divDeleteTagedFriend");
    var divDeleteAttachedFile = document.querySelector("#divDeleteAttachedFile");
    divDeleteAttachedFile.style.display = display;
    divDeleteTagedFriend.style.display = display;
    divButtonPost.innerHTML = valueOfButton;
}

// function add file to post
function addFileToPost(listFileName, listFileId){
    for (var i = 0; i < listFileName.length; i++){
        listOldFile.push(listFileId[i]);
        addDataToDivContainImgVideo(listFileName[i]);
    }
    var iDeleteFile = document.querySelectorAll("#iDeleteFile");
    var divFile = document.querySelectorAll("#divCreatePostBox > div.divContainImgVideo > div.divFile");
    for (let i = 0; i < iDeleteFile.length; i++){
        iDeleteFile[i].addEventListener("click", () => 
            {
                divFile[i].style.display = "none";
                mapFileInPost.delete(listFileInPost[i].name);
                listFileInPost[i] = '';
            }
        )
    }
}

// function update Post
function sendRequestUpdatePost(){
    const formData = new FormData();
    for (let i = 0; i < listFileInPost.length; i++) {
        formData.append('files', listFileInPost[i]);
    }
    formData.append('scope', scopePost)
    formData.append('caption', textareaCreatePost.value);
    for (let i = 0; i < listFlagTagedFriend.length; i++){
        if (listFlagTagedFriend[i] == 1){
            formData.append('listIdTaged', listFriendId[i]);
        }
    }
    if (inputRadioDeleteTaged.checked){
        formData.append('deleteTaged', 1);
    }
    else{
        formData.append('deleteTaged', 0);
    }
    if (inputRadioDeleteAttached.checked){
        formData.append('deleteAttached', 1);
    }
    else{
        formData.append('deleteAttached', 0);
    }
    formData.append("postId", currentPostIdUpdate);
    const token = getCookie("jwtToken");
    fetch('/post/updatePost', {
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
            window.location = "http://localhost:8080/FriendZone";
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function delete post 
function sendRequestDeletePost(postId, divPost){
    const token = getCookie("jwtToken");
    fetch('/post/deletePost?postId=' + postId, {
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
        document.querySelector(".divContainSpinner").style.display = "flex";
        document.querySelector("#pTextSpinner").innerHTML = "Delete post successfully!";
        setTimeout(function() {
            window.location = "http://localhost:8080/FriendZone/newFeed";
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}