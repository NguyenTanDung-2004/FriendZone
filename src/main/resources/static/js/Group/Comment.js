function create1ParentComment(avatarSrc, userName, userId, listTagedName, listTagedId, content, typeFile, fileSrc, formattedTime, numberOfLikes, numberOfReplies, flagCommentOwner, commentId, flagLike, level){
        // Create the main div element
    let div1Comment = document.createElement("div");
    div1Comment.className = "div1Comment " + commentId;
    divContentComment.appendChild(div1Comment);

    // Create the parent comment div
    let divParentComment = document.createElement("div");
    divParentComment.className = "divParentComment";
    if (level == 2){
        divParentComment.className = "divChildComment " + commentId;
    }
    div1Comment.appendChild(divParentComment);

    // Create the image element
    let imgAvatar = document.createElement("img");
    imgAvatar.src = avatarSrc;
    divParentComment.appendChild(imgAvatar);

    // Create the div for name, comment, like
    let divNameAndCommentLike = document.createElement("div");
    divNameAndCommentLike.className = "divNameAndCommentLike";
    divParentComment.appendChild(divNameAndCommentLike);

    // Create the div for name and comment
    let divNameAndComment = document.createElement("div");
    divNameAndComment.className = "divNameAndComment";
    divNameAndCommentLike.appendChild(divNameAndComment);

    // Create the name paragraph
    let pName = document.createElement("p");
    pName.className = "pName";
    pName.textContent = userName;
    divNameAndComment.appendChild(pName);
    pName.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + userId;
    }
    )

    // Create the comment div
    let divComment1 = document.createElement("div");
    divComment1.className = "divComment1";
    divNameAndComment.appendChild(divComment1);

    // Create the content paragraph
    let pContent = document.createElement("p");
    pContent.className = "pContent";
    divComment1.appendChild(pContent);

    if (listTagedId != null){
        for (let i = 0; i < listTagedId.length; i++){
            let pTag = document.createElement("span");
            pTag.className = "pTag";
            pTag.textContent = "@" + listTagedName[i];
            pTag.addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?id=" + listTagedId[i];
            }
            )
            pContent.appendChild(pTag);
        }
    }

    let textEmoji = document.createTextNode(content);
    pContent.appendChild(textEmoji);

    // Create the div for image comment
    let divImgOrVideoComment = document.createElement("div");
    divImgOrVideoComment.id = "divImgComment";
    divComment1.appendChild(divImgOrVideoComment);

    if (typeFile == "Img"){
        let imgComment = document.createElement("img");
        imgComment.src = fileSrc;
        imgComment.alt = "";
        divImgOrVideoComment.appendChild(imgComment);
    }
    else if (typeFile != ""){
        let videoComment = document.createElement("video");
        videoComment.src = fileSrc;
        videoComment.alt = "";
        videoComment.controls = true;
        divImgOrVideoComment.appendChild(videoComment);
    }

    // Create the div for time, like, and reply
    let divTimeLikeAndReply = document.createElement("div");
    divTimeLikeAndReply.className = "divTimeLikeAndReply";
    divNameAndCommentLike.appendChild(divTimeLikeAndReply);

    // Create the like div
    let divLike = document.createElement("div");
    divLike.className = "divLike";
    divTimeLikeAndReply.appendChild(divLike);
    var flag = 0;
    divLike.addEventListener("click", () => 
    {
        if (flag == 0){
            flag = 1;
            if (flagLike == 0){
                pLike.style.color = "rgb(8, 102, 255)";
                pLike.textContent = (numberOfLikes + 1) + "Like";
                likeComment(commentId);
            }
            else{
                pLike.style.color = "gray";
                pLike.textContent = (numberOfLikes - 1) + "Like";
                deleteLikeComment(commentId);
            }
        }
        else{
            flag = 0;
            if (flagLike == 0){
                pLike.style.color = "gray";
                pLike.textContent = (numberOfLikes) + "Like";
                deleteLikeComment(commentId);
            }
            else{
                pLike.style.color = "rgb(8, 102, 255)";
                pLike.textContent = (numberOfLikes) + "Like";
                likeComment(commentId);
            }
        }
    }
    )

    let pLike = document.createElement("p");
    pLike.className = "pLike";
    pLike.style.cursor = "pointer";
    pLike.style.color = "gray";
    pLike.textContent = numberOfLikes + "Like";
    divLike.appendChild(pLike);
    if (flagLike == 1){
        pLike.style.color = "rgb(8, 102, 255)";
    }

    // Create the reply paragraph
    let pReply = document.createElement("p");
    pReply.className = "pReply";
    pReply.style.cursor = "pointer";
    pReply.textContent = numberOfReplies + "Reply";
    divTimeLikeAndReply.appendChild(pReply);
    pReply.addEventListener("click", () => 
    {
        getCommentChild(commentId, userName);
        currentParentCommentId = commentId;
    }
    )
    if (level == 2){
        pReply.remove();
    }

    // Create the time paragraph
    let pTime = document.createElement("p");
    pTime.className = "pTime";
    pTime.textContent = formattedTime;
    divTimeLikeAndReply.appendChild(pTime);

    var index = mapPostIdIndex.get(currentPostIdInComment);
    var userIdOfThisPost = allPostInGroup[index].userId;
    if (idOfUserRequest == userId){
        // Create the three dots icon
        let iThreeDots = document.createElement("i");
        iThreeDots.className = "bi bi-three-dots";
        iThreeDots.style.cursor = "pointer";
        iThreeDots.style.transform = "translateY(3px)";
        divTimeLikeAndReply.appendChild(iThreeDots);
        iThreeDots.addEventListener("click", () => 
        {
            currentCommentEditComment = [];
            currentCommentEditComment.push(userName);
            currentCommentEditComment.push(content);
            currentCommentEditComment.push(listTagedId);
            currentCommentEditComment.push(listTagedName);
            currentCommentEditComment.push(typeFile);
            currentCommentEditComment.push(fileSrc);
            currentCommentEditComment.push(commentId);
            displayEditComment();
        }
        )
    }
    else if (idOfUserRequest == userIdOfThisPost){
        let pDelete = document.createElement("p");
        pDelete.textContent = "Delete";
        pDelete.style.cursor = "pointer";
        divTimeLikeAndReply.appendChild(pDelete);
    }

    if (flagCommentOwner == 1){
        // Create the delete paragraph
        let pDelete = document.createElement("p");
        pDelete.style.cursor = "pointer";
        pDelete.style.display = "none";
        pDelete.textContent = "delete";
        divTimeLikeAndReply.appendChild(pDelete);
    }

    if (level == 2){
        return divParentComment;
    }
    else{
        return div1Comment;
    }
}

function displayDivComment(){
    divComment.style.transform = "scale(1)";
    divBlur.style.display = "block";
    flagComment = 1;
}

iCloseDivComment.addEventListener("click", () => 
{
    divComment.style.transform = "scale(0)";
    divBlur.style.display = "none";
    flagComment = 0;
    var index = mapPostIdIndex.get(currentPostIdInComment);
    pHeaderInComment.textContent = allPostInGroup[index].userName + "'s post";
    iBack.style.display = "none";
    flagLevel = 1;
    divContentComment.innerHTML = "";
}
)

imgUploadFileInComment.addEventListener("click", () =>
{
    inputUploadInComment.click();
}
)

iconInComment.addEventListener("click", () => 
{
    divIcon.style.transform = "scale(1)";
    currentInputOrTextArea = textareaInComment;
}
)

imgTagFriendInComment.addEventListener("click", () => 
{
    divTagFriend.style.transform = "scale(1)";
}
)

function tagFriendInComment(userName, userId){
    if (mapTagFriendInComment.get(userId) == 1){

    }
    else{
        var p = document.createElement("p");
        p.innerHTML = "@" + userName;
        divTagedFriendInComment.appendChild(p);
        mapTagFriendInComment.set(userId, 1);
        divTagFriend.style.transform = "scale(0)";
        iCloseTagFriendInComment.style.display = "block";
    }
}

inputUploadInComment.addEventListener("change", (e) => 
{
    if (fileUploadInComment != null){
        if (document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > img") != null){
            document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > img").remove();
        }
        else{
            document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > video").remove();
        }
    }
    var imgOrVideo;
    fileUploadInComment = e.target.files[0];
    var typeOfFile = checkFilesVideoOrImage(fileUploadInComment.name);
    if (typeOfFile == "Image"){
        imgOrVideo = document.createElement("img");
    }
    else{
        imgOrVideo = document.createElement("video");
        imgOrVideo.controls = true;
    }
    divImgOrVideoInComment.appendChild(imgOrVideo);
    displayFileWhenUpload(imgOrVideo, fileUploadInComment);
    iCloseImgOrVideoInComment.style.display = "block";
}
)

iCloseTagFriendInComment.addEventListener("click", () => 
{
    var pTagFriend = divTagedFriendInComment.querySelectorAll("p");
    for (var i = 0; i < pTagFriend.length; i++){
        pTagFriend[i].remove();
    }
    mapTagFriendInComment = new Map();
    iCloseTagFriendInComment.style.display = "none";
}
)

iCloseImgOrVideoInComment.addEventListener("click", () => 
{
    fileUploadInComment = null;
    if (document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > img") != null){
        document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > img").remove();
    }
    else{
        document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > video").remove();
    }
    iCloseImgOrVideoInComment.style.display = "none";
}
)

// function upload comment
function uploadComment(){
    const formData = new FormData();
    formData.append("file", fileUploadInComment);
    for (let [key, value] of mapTagFriendInComment) {
        formData.append("listTagedId", key);   
    }
    formData.append("content", textareaInComment.value);
    formData.append("level", flagLevel);
    formData.append("postId", currentPostIdInComment);
    formData.append("parentCommentId", currentParentCommentId);
    formData.append("groupId", getParam("groupId"));
    const token = getCookie("jwtToken");
    fetch('/handleGroup/uploadComment', {
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
        document.querySelector("#pTextSpinner").innerHTML = "Uploading your comment...";
        document.querySelector("#iTickSpinner").style.display = "none";

        setTimeout(function() {
            divContentComment.innerHTML = "";
            if (flagLevel == 1){
                getCommentInPost(currentPostIdInComment);
            }
            else{
                getCommentChild(currentParentCommentId, currentUserName);
            }
            document.querySelector(".spinner-border").style.display = "none";
            document.querySelector("#pTextSpinner").innerHTML = "Upload comment successfully!";
            document.querySelector("#iTickSpinner").style.display = "block";
            setTimeout(function() {
                document.querySelector(".divContainSpinner").style.display = "none";
            }, 1500)
        }, 4000); // 5000 milliseconds = 5 seconds
        currentFile = null;
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

iSendComment.addEventListener("click", () => 
{
    uploadComment();
}
)

function getCommentInPost(postId){
    const token = getCookie("jwtToken");
    fetch('/comment/getComment?postId=' + postId, {
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
        allCommentInPost = data1.object;
        console.log(allCommentInPost);
        for (var i = 0; i < allCommentInPost.length; i++){
            mapComment.set(allCommentInPost[i].commentId, i);
        }
        createAllCommentInPost();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function createAllCommentInPost(){
    for (var i = 0; i < allCommentInPost.length; i++){
        var avatarSrc = "../FileUser/Image/" + allCommentInPost[i].userId + "/avatar.jpg";
        var flagCommentOwner = 0;
        if (allCommentInPost[i].userId == idOfUserRequest){
            flagCommentOwner = 1;
        }
        create1ParentComment(avatarSrc, allCommentInPost[i].userName, allCommentInPost[i].userId, allCommentInPost[i].listTagedUserName, allCommentInPost[i].listTagedUserId, 
                            allCommentInPost[i].content, allCommentInPost[i].typeImgOrVideo, allCommentInPost[i].linkFile, formatDate(allCommentInPost[i].time), 
                            allCommentInPost[i].numberOfLikes, allCommentInPost[i].numberOfReplies, flagCommentOwner, allCommentInPost[i].commentId, allCommentInPost[i].flagLike, 
                            allCommentInPost[i].level
        );
    }
}

// function like comment 
function likeComment(commentId){
    const token = getCookie("jwtToken");
    fetch('/comment/likeComment?commentId=' + commentId, {
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
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function deleteLikeComment
function deleteLikeComment(commentId){
    const token = getCookie("jwtToken");
    fetch('/comment/deleteLikeComment?commentId=' + commentId, {
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
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function setDataForSomethingInDetailComment(userName){
    pHeaderInComment.textContent = userName + "'s comment";
    iBack.style.display = "block";
    flagLevel = 2;
    currentUserName = userName;
    //currentParentCommentId = '';
}

function getCommentChild(commentId, userName){
    currentParentCommentId = commentId;
    const token = getCookie("jwtToken");
    fetch('/comment/getCommentChild?commentParentId=' + commentId, {
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
        currentAllCommentChild = data1.object;
        setDataForSomethingInDetailComment(userName);
        createAllCommentWhenClickingPReplies(commentId);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function create all comment in detail comment
function createAllCommentWhenClickingPReplies(commentId){
    divContentComment.innerHTML = "";
    var index = mapComment.get(commentId);

    var avatarSrc = "../FileUser/Image/" + allCommentInPost[index].userId + "/avatar.jpg";
    var flagCommentOwner = 0;
    if (allCommentInPost[index].userId == idOfUserRequest){
        flagCommentOwner = 1;
    }

    var div1Comment = create1ParentComment(avatarSrc, allCommentInPost[index].userName, allCommentInPost[index].userId, allCommentInPost[index].listTagedUserName, allCommentInPost[index].listTagedUserId, 
                        allCommentInPost[index].content, allCommentInPost[index].typeImgOrVideo, allCommentInPost[index].linkFile, formatDate(allCommentInPost[index].time), 
                        allCommentInPost[index].numberOfLikes, allCommentInPost[index].numberOfReplies, flagCommentOwner, allCommentInPost[index].commentId, allCommentInPost[index].flagLike, 
                        allCommentInPost[index].level
    );

    for (var i = 0; i < currentAllCommentChild.length; i++){
        var avatarSrc = "../FileUser/Image/" + currentAllCommentChild[i].userId + "/avatar.jpg";
        var flagCommentOwner = 0;
        if (currentAllCommentChild[i].userId == idOfUserRequest){
            flagCommentOwner = 1;
        }

        div1Comment.appendChild(create1ParentComment(avatarSrc, currentAllCommentChild[i].userName, currentAllCommentChild[i].userId, currentAllCommentChild[i].listTagedUserName, currentAllCommentChild[i].listTagedUserId, 
            currentAllCommentChild[i].content, currentAllCommentChild[i].typeImgOrVideo, currentAllCommentChild[i].linkFile, formatDate(currentAllCommentChild[i].time), 
            currentAllCommentChild[i].numberOfLikes, currentAllCommentChild[i].numberOfReplies, flagCommentOwner, currentAllCommentChild[i].commentId, currentAllCommentChild[i].flagLike, 
            currentAllCommentChild[i].level
        ));
    }
}

iBack.addEventListener("click", () => 
{
    var index = mapPostIdIndex.get(currentPostIdInComment);
    pHeaderInComment.textContent = allPostInGroup[index].userName + "'s post";
    iBack.style.display = "none";
    flagLevel = 1;
    divContentComment.innerHTML = "";
    getCommentInPost(currentPostIdInComment);
}
)
