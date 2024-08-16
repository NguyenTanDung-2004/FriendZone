// display edit comment
function displayEditComment(listComment, index){
    divEditComment.style.transform = "scale(1)";
    divComment.style.transform = "scale(0)";
    setupDataForEditComment(listComment[index].content, listComment[index].listTagedUserName, 
        listComment[index].linkFile, listComment[index].typeImgOrVideo, listComment[index].userName);
    currentInputServedForChooseIcon = textareaEditComment;
}

// set up data for edit comment
function setupDataForEditComment(content, listTagedName, linkFile, type, nameOfUser){
    pHeaderEditComment.innerHTML = nameOfUser + "'s comment";
    textareaEditComment.value = content;
    var allP = divTagedFriendEditComment.querySelectorAll("p");
    if (allP != null){
        for (var i = 0; i < allP.length; i++){
            allP[i].remove();
        }
    }
    if (listTagedName != null){
        for (var i = 0; i < listTagedName.length; i++){
            var p = document.createElement("p");
            p.innerHTML = "@" + listTagedName[i];
            divTagedFriendEditComment.appendChild(p);
        }
        iCloseEditComment1.style.display = "block";
    }
    if (divImgOrVideoEditComment.querySelector("img") != null){
        divImgOrVideoEditComment.querySelector("img").remove();
    }
    if (divImgOrVideoEditComment.querySelector("video") != null){
        divImgOrVideoEditComment.querySelector("video").remove();
    }
    if (linkFile != ""){
        console.log(type);
        if (type == "Img"){
            var img = document.createElement("img");
            img.src = linkFile;
            divImgOrVideoEditComment.appendChild(img);
        }
        else{
            var video = document.createElement("video");
            video.src = linkFile;
            divImgOrVideoEditComment.appendChild(video);
            video.controls = true;
        }
        iCloseEditComment2.style.display = "block";
    }
}

iCloseEditComment.addEventListener("click", () => 
{
    flagEditComment = 0;
    setTagedFriendInEditComment = new Set();
    iCloseEditComment1.style.display = "none";
    iCloseEditComment2.style.display = "none";
    flagClickingRemoveFileInEditComment = 0;
    flagClickingRemoveTagedFriendInEditComment = 0;
    divContentComment.innerHTML = "";
    divEditComment.style.transform = "scale(0)";
    divComment.style.transform = "scale(1)";
    if (flagUploadCommentChild == 0){
        getCommentInPost(currentPostIdComment);
    }
    else{
        getCommentChild(currentParentCommentId, currentIndexOfCommentParent);
    }
}
)

iCloseEditComment1.addEventListener("click", () => 
{
    var allP = divTagedFriendEditComment.querySelectorAll("p");
    if (allP != null){
        for (var i = 0; i < allP.length; i++){
            allP[i].remove();
        }
    }
    setTagedFriendInEditComment = new Set();
    iCloseEditComment1.style.display = "none";
    flagClickingRemoveTagedFriendInEditComment = 1;
}
)

iCloseEditComment2.addEventListener("click", () => 
{
    var video = divImgOrVideoEditComment.querySelector("video");
    if (video != null){
        video.remove();
    }
    var img = divImgOrVideoEditComment.querySelector("img");
    if (img != null){
        img.remove();
    }
    currentFileInEditComment = null;
    iCloseEditComment2.style.display = "none";
    flagClickingRemoveFileInEditComment = 1;
}
)

iUploadFileInEditComment.addEventListener("click", () => 
{
    inputUploadInEditComment.click();
}
)

// event for uploading file in EditComment
inputUploadInEditComment.addEventListener("change", (e) => 
{
    currentFileInEditComment = e.target.files[0];
    if (currentFileInEditComment.type.startsWith('image/')){
        if (divImgOrVideoEditComment.querySelector("img") != null){
            divImgOrVideoEditComment.querySelector("img").remove();
        }
        if (divImgOrVideoEditComment.querySelector("video") != null){
            divImgOrVideoEditComment.querySelector("video").remove();
        }
        var img = document.createElement("img");
        divImgOrVideoEditComment.appendChild(img);
        displayFileWhenUpload(img, currentFileInEditComment);
    }
    else{
        if (divImgOrVideoEditComment.querySelector("img") != null){
            divImgOrVideoEditComment.querySelector("img").remove();
        }
        if (divImgOrVideoEditComment.querySelector("video") != null){
            divImgOrVideoEditComment.querySelector("video").remove();
        }
        var video = document.createElement("video");
        video.controls = true;
        divImgOrVideoEditComment.appendChild(video);
        displayFileWhenUpload(video, currentFileInEditComment);
    }
    iCloseEditComment2.style.display = "block";
}
)

iIconTagedFriendEditComment.addEventListener("click", () => 
{
    document.querySelector("#divComment > div.divCommentComment > div > div > div.divIcon > i.bi.bi-tags").click();
}
)

// event for tag friend in edit comment
function eventForTagingFriendInEditComment(friendId, friendName){
    if (setTagedFriendInEditComment.length == 0){
        var allP = divTagedFriendEditComment.querySelectorAll("p");
        if (allP != null){
            for  (var i = 0; i < allP.length; i++){
                allP[i].remove();
            }
        }   
    }
    setTagedFriendInEditComment.add(friendId);
    var p = document.createElement("p");
    p.innerHTML = "@" + friendName;
    divTagedFriendEditComment.appendChild(p);
    divTagFriend.style.transform = "scale(0)";
}

// function send Request edit comment
function sendRequestEditComment(){
    const formData = new FormData();
    formData.append("commentId", currentCommentIdInEditComment);
    formData.append("file", currentFileInEditComment);
    formData.append("content", textareaEditComment.value);
    formData.append("deleteFile", flagClickingRemoveFileInEditComment);
    formData.append("deleteTag", flagClickingRemoveTagedFriendInEditComment);
    if (setTagedFriendInEditComment.length == 0){
        formData.append("listTagedFriendId", null);
    }
    else{
        for (let value of setTagedFriendInEditComment) {
            formData.append("listTagedFriendId", value);
        }
    }
    const token = getCookie("jwtToken");
    fetch('/comment/editComment', {
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
        document.querySelector(".spinner-border").style.display = "block";
        document.querySelector("#pTextSpinner").innerHTML = "Editting your comment...";
        document.querySelector("#iTickSpinner").style.display = "none";
        setTimeout(function() {
            iCloseEditComment.click();
            if (flagUploadCommentChild == 0){
                getCommentInPost(currentPostIdComment);
            }
            else{
                divContentComment.innerHTML = "";
                getCommentChild(currentParentCommentId, currentIndexOfCommentParent)
            }
            document.querySelector(".spinner-border").style.display = "none";
            document.querySelector("#pTextSpinner").innerHTML = "Edit comment successfully!";
            document.querySelector("#iTickSpinner").style.display = "block";
            setTimeout(function() {
                document.querySelector(".divContainSpinner").style.display = "none";
            }, 1500)
        }, 5000); // 5000 milliseconds = 5 seconds
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function sendRequestDeleteComment(commentId){
    const token = getCookie("jwtToken");
    fetch('/comment/deleteComment?commentId=' + commentId, {
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
        document.querySelector(".spinner-border").style.display = "none";
        document.querySelector("#pTextSpinner").innerHTML = "Delete comment successfully!";
        document.querySelector("#iTickSpinner").style.display = "block";
        iCloseEditComment.click();
        setTimeout(function() {
            document.querySelector(".divContainSpinner").style.display = "none";
        }, 1500)
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// event for clicking confirm
pConfirmEditComment.addEventListener("click", () => 
{
    sendRequestEditComment();
}
)

// function delete comment
pDeleteCommentInEditComment.addEventListener("click", () => 
{
    let confirmAlert = confirm("Are you sure to delete this comment?");
    if (confirmAlert){
        sendRequestDeleteComment(currentCommentIdInEditComment);
    }
}
)