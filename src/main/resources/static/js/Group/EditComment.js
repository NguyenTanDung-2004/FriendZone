imgDisplayIconEditComment.addEventListener("click", () =>
{
    divIcon.style.transform = "scale(1)";
    currentInputOrTextArea = textAreaEditComment;
}
)

imgTagFriendEditComment.addEventListener("click", () => 
{
    divTagFriend.style.transform = "scale(1)";
}
)

function displayEditComment(){
    setDataForEditComment(currentCommentEditComment[0], currentCommentEditComment[1], currentCommentEditComment[2], currentCommentEditComment[3], currentCommentEditComment[4]
        , currentCommentEditComment[5]
    )
}

function setDataForEditComment(userName, caption, listTagFriendId, listTagFriendName, typeOfFile, fileSrc){
    divEditComment.style.transform = "scale(1)";
    flagEditComment = 1;
    pHeaderEditComment.innerHTML = userName + "'s comment";
    textAreaEditComment.value = caption;
    if (listTagFriendId != null){
        for (var i = 0; i < listTagFriendId.length; i++){
            var p = document.querySelector("p");
            p.textContent = "@" + listTagFriendName[i];
            divContainTagFriendEditComment.appendChild(p);
        }
        iCloseTagFriendEditComment.style.display = "block";
    }

    if (fileSrc != ""){
        if (typeOfFile == "Img"){
            var img = document.createElement("img");
            img.src = fileSrc;
            divContainImgVideoEditComment.appendChild(img);
        }
        else{
            var video = document.createElement("video");
            video.src = fileSrc;
            divContainImgVideoEditComment.appendChild(video);
        }
        iCloseImgOrVideoEditComment.style.display = "block";
    }
}

iCloseEditComment.addEventListener("click", () => 
{
    divEditComment.style.transform = "scale(0)";
    flagEditComment = 0;
    currentFileEditComment = null;
    flagDeleteFriendEditComment = 0;
    flagDeleteImgOrVideoEditComment = 0;
    var allP = divContainTagFriendEditComment.querySelectorAll("p");
    for (var i = 0; i < allP.length; i++){
        allP[i].remove();
    }
}
)

function createFriendWhenTagFriendEditComment(userId, userName){
    var p = document.querySelector("p");
    p.textContent = "@" + userName;
    divContainTagFriendEditComment.appendChild(p);
    listTagFriendInEditComment.push(userId);
    divTagFriend.style.transform = "scale(0)";
    iCloseTagFriendEditComment.style.display = "block";
}

iCloseTagFriendEditComment.addEventListener("click", () => 
{
    listTagFriendInEditComment = [];
    var allP = divContainTagFriendEditComment.querySelectorAll("p");
    for (var i = 0; i < allP.length; i++){
        allP[i].remove();
    }
    iCloseTagFriendEditComment.style.display = "none";
    flagDeleteFriendEditComment = 1;
}
)

iCloseImgOrVideoEditComment.addEventListener("click", () => 
{
    if (divContainImgVideoEditComment.querySelector("img") != null){
        divContainImgVideoEditComment.querySelector("img").remove();
    }
    else{
        divContainImgVideoEditComment.querySelector("video").remove();
    }
    iCloseImgOrVideoEditComment.style.display = "none";
    currentFileEditComment = null;
    flagDeleteImgOrVideoEditComment = 1;
}
)

imgUploadFileEditComment.addEventListener("click", () => 
{
    inputUploadInEditComment.click();
}
)

inputUploadInEditComment.addEventListener("change", (e) => 
{
    if (divContainImgVideoEditComment.querySelector("img") != null){
        divContainImgVideoEditComment.querySelector("img").remove();
    }
    if (divContainImgVideoEditComment.querySelector("video") != null){
        divContainImgVideoEditComment.querySelector("video").remove();
    }

    var file = e.target.files[0];
    var typeOfFile = checkFilesVideoOrImage(file.name);
    if (typeOfFile == "Image"){
        var img = document.createElement("img");
        divContainImgVideoEditComment.appendChild(img);
        displayFileWhenUpload(img, file);
    }
    else{
        var video = document.createElement("video");
        divContainImgVideoEditComment.appendChild(video);
        displayFileWhenUpload(video, file);
    }
    iCloseImgOrVideoEditComment.style.display = "block";
}
)

buttonDeleteComment.addEventListener("click", () => 
{
    const confirm1 = confirm("Are you sure you want to delete this comment?");
    if (confirm1){
        sendRequestDeleteComment(currentCommentEditComment[6]);
    }
}
)

buttonConfirmEditComment.addEventListener("click", () => 
{
    const confirm1 = confirm("Are you sure you want to edit this comment?");
    if (confirm1){
        sendRequestEditComment();
    }
}
)

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
        iCloseDivComment.click();
        setTimeout(function() {
            document.querySelector(".divContainSpinner").style.display = "none";
        }, 1500)
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}


// function send Request edit comment
function sendRequestEditComment(){
    const formData = new FormData();
    formData.append("commentId", currentCommentEditComment[6]);
    formData.append("file", currentFileEditComment);
    formData.append("content", textAreaEditComment.value);
    formData.append("deleteFile", flagDeleteImgOrVideoEditComment);
    formData.append("deleteTag", flagDeleteFriendEditComment);
    if (listTagFriendInEditComment == []){
        formData.append("listTagedFriendId", null);
    }
    else{
        for (var i = 0; i < listTagFriendInEditComment.length; i++){
            formData.append("listTagedFriendId", listTagFriendInEditComment[i]);
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
            iCloseDivComment.click();
            document.querySelector(".spinner-border").style.display = "none";
            document.querySelector("#pTextSpinner").innerHTML = "Edit comment successfully!";
            document.querySelector("#iTickSpinner").style.display = "block";
            setTimeout(function() {
                document.querySelector(".divContainSpinner").style.display = "none";
            }, 1500)
        }, 4000); // 5000 milliseconds = 5 seconds
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
