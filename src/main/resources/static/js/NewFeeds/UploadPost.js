divButtonPost.addEventListener("click", () => 
    {
        var text = divButtonPost.innerHTML;
        if (text == "Post"){
            sendRequestCreatePost();
        }
        else if (text == "Update"){
            sendRequestUpdatePost();
        }
        else if (text == "Share"){
            sendRequestCreateSharePost();
        }
    }
)

// function send request post
function sendRequestCreatePost(){
    const formData = new FormData();
    for (let i = 0; i < listFileInPost.length; i++) {
        formData.append('files', listFileInPost[i]);
    }
    formData.append('scope', scopePost)
    formData.append('caption', textareaCreatePost.value);
    for (let i = 0; i < listFlagTagedFriend.length; i++){
        if (listFlagTagedFriend[i] == 1){
            formData.append('listIdTaged', listAllFriendId[i]);
        }
    }
    const token = getCookie("jwtToken");
    fetch('/user/uploadFile', {
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
        document.querySelector("#pTextSpinner").innerHTML = "Create Post successfully";
        setTimeout(function() {
            window.location = "http://localhost:8080/FriendZone";
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

//function sendRequestSharePost
function sendRequestCreateSharePost(){
    const formData = new FormData();
    for (let i = 0; i < listFileInPost.length; i++) {
        formData.append('files', listFileInPost[i]);
    }
    formData.append('scope', scopePost)
    formData.append('caption', textareaCreatePost.value);
    for (let i = 0; i < listFlagTagedFriend.length; i++){
        if (listFlagTagedFriend[i] == 1){
            formData.append('listIdTaged', listAllFriendId[i]);
        }
    }
    console.log(formData.getAll("listIdTaged"));
    formData.append("sharedPostId", objectPostInfo[currentIndexPostInSharedPost].id);
    formData.append("sharedUserName", objectPostInfo[currentIndexPostInSharedPost].userName);
    formData.append("sharedUserId", objectPostInfo[currentIndexPostInSharedPost].userId);
    const token = getCookie("jwtToken");
    fetch('/post/uploadSharedPost', {
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
        document.querySelector("#pTextSpinner").innerHTML = "Share Post successfully";
        setTimeout(function() {
            window.location = "http://localhost:8080/FriendZone/newFeed";
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function getScope
selectorScopePost.addEventListener("change", () => 
    {
        scopePost = parseInt(selectorScopePost.value);
    }
)