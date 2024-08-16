

function createDivNameAndCommentLike(nameOfUser, content, listTagedFriend, imgOrVideoSrc, typeFile, numberOfLikes, time, 
    listTagedId, numberOfComments, commentId, flagLiked, index){
    // Create the main container div
    let divNameAndCommentLike = document.createElement("div");
    divNameAndCommentLike.className = "divNameAndCommentLike";

    // Create the name and comment div
    let divNameAndComment = document.createElement("div");
    divNameAndComment.className = "divNameAndComment";
    divNameAndCommentLike.appendChild(divNameAndComment);

    var divComment1 = document.createElement("div");
    divComment1.className = "divComment1";
    // Add the name paragraph
    let pName = document.createElement("p");
    pName.className = "pName";
    pName.textContent = nameOfUser;
    divNameAndComment.appendChild(pName);
    divNameAndComment.appendChild(divComment1);

    // Add the content paragraph
    let pContent = document.createElement("p");
    pContent.className = "pContent";
    if (listTagedFriend != null){
        for (var i = 0; i < listTagedFriend.length; i++){
            pContent.innerHTML = pContent.innerHTML + "<span class='pTag'>@" + listTagedFriend[i] + "</span> ";
        }
    }
    pContent.innerHTML = pContent.innerHTML + content;
    if (listTagedFriend != null){
        var listPTag = pContent.querySelectorAll(".pTag");
        for (let i = 0; i < listPTag.length; i++){
            listPTag[i].addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?id=" + listTagedId[i];
            }
            )
        }
    }
    divComment1.appendChild(pContent);

    // Create the image comment div
    let divImgComment = document.createElement("div");
    divImgComment.id = "divImgComment";
    divComment1.appendChild(divImgComment);

    if (typeFile == "Img"){
        // Add the image
        let imgComment = document.createElement("img");
        imgComment.src = imgOrVideoSrc;
        imgComment.alt = "";
        divImgComment.appendChild(imgComment);
    }
    else if (typeFile == "Video"){
        // Add the image
        let videoComment = document.createElement("video");
        videoComment.controls = true;
        videoComment.src = imgOrVideoSrc;
        videoComment.alt = "";
        divImgComment.appendChild(videoComment);
    }

    // Create the time, like, and reply div
    let divTimeLikeAndReply = document.createElement("div");
    divTimeLikeAndReply.className = "divTimeLikeAndReply";
    divNameAndCommentLike.appendChild(divTimeLikeAndReply);

    // Create the like div
    let divLike = document.createElement("div");
    divLike.className = "divLike";
    divTimeLikeAndReply.appendChild(divLike);

    // Add the like paragraph
    let pLike = document.createElement("p");
    pLike.style.cursor = "pointer";
    var flagPLike = flagLiked;
    if (flagPLike == 0){
        pLike.style.color = "gray";
    }
    else{
        pLike.style.color = "rgb(8, 102, 255)";
    }
    pLike.addEventListener("click", () => 
    {
        if (flagPLike == 0){
            pLike.style.color = "rgb(8, 102, 255)";
            flagPLike = 1;
            var number = pLike.textContent.replace("Like", "");
            number = parseInt(number);
            pLike.textContent = (number + 1) + "Like";
            likeComment(commentId);
        }
        else{
            pLike.style.color = "gray";
            flagPLike = 0;
            var number = pLike.textContent.replace("Like", "");
            number = parseInt(number);
            pLike.textContent = (number - 1) + "Like";
            deleteLikeComment(commentId)
        }
    }
    )
    pLike.className = "pLike";
    pLike.textContent = numberOfLikes + "Like";
    divLike.appendChild(pLike);

    // Add the reply paragraph
    let pReply = document.createElement("p");
    pReply.addEventListener("click", () => 
    {
        flagUploadCommentChild = 1;
        eventForClickingReplyComment(nameOfUser, commentId, index);
        currentParentCommentId = commentId;
        currentIndexOfCommentParent = index;
        document.querySelector("#divComment > div.divHeaderComment > i.fa-solid.fa-arrow-left").style.display = "block";
    }
    )
    pReply.className = "pReply";
    pReply.style.cursor = "pointer"
    pReply.textContent = numberOfComments + "Reply";
    divTimeLikeAndReply.appendChild(pReply);

    // Add the time paragraph
    let pTime = document.createElement("p");
    pTime.className = "pTime";
    pTime.textContent = time;
    divTimeLikeAndReply.appendChild(pTime);

    // Add the icon more setting
    let iSetting = document.createElement("i");
    iSetting.className = 'bi bi-three-dots';
    iSetting.style.cursor = "pointer";
    iSetting.style.transform = "translateY(3px)";
    divTimeLikeAndReply.appendChild(iSetting);
    iSetting.addEventListener("click", () => 
    {
        currentCommentIdInEditComment = commentId;
        displayEditComment(currentObjectCommentParent, index);
        flagEditComment = 1;
    }
    )
    let pDeleteComment = document.createElement("p");
    pDeleteComment.innerHTML = "delete";
    pDeleteComment.style.cursor = "pointer";
    pDeleteComment.style.display = "none";
    pDeleteComment.addEventListener("click", () => 
    {
        let confirmAlert = confirm("Are you sure to delete this comment?");
        if (confirmAlert){
            sendRequestDeleteComment(commentId);
        }
    }
    )

    divTimeLikeAndReply.appendChild(pDeleteComment);
    if (userId != currentObjectCommentParent[index].userId){
        iSetting.style.display = "none";
        if (userId == objectPostInfo[currentIndexOfPost].userId){
            pDeleteComment.style.display = "block";
        }
    }

    return divNameAndCommentLike;
}

function createImg(src){
    var img = document.createElement("img");
    img.src = src;
    return img;
}

function createDiv1Comment(imgSrc, nameOfUser, content, listTagedFriend, imgOrVideoSrc, 
    typeFile, numberOfLikes, time, listTagedId, numberOfComments, commentId, flagLiked, index){
    var div1Comment = document.createElement("div");
    div1Comment.className = "div1Comment";
    var divParentComment = document.createElement("div");
    divParentComment.className = "divParentComment";

    div1Comment.appendChild(divParentComment);

    var imgUserParent = createImg(imgSrc);
    divParentComment.appendChild(imgUserParent);

    var divNameAndCommentLike = createDivNameAndCommentLike(nameOfUser, content, listTagedFriend, 
                imgOrVideoSrc, typeFile, numberOfLikes, time, listTagedId, numberOfComments, 
                commentId, flagLiked, index);
    divParentComment.appendChild(divNameAndCommentLike);
    
    return div1Comment;
}

function createDivChildComment(imgSrc, nameOfUser, content, listTagedName, imgOrVideoSrc, 
    typeFile, numberOfLikes, time, listTagedId, numberOfComments, commentId, flagLiked, index){
    // Create the main container div for the child comment
    let divChildComment = document.createElement("div");
    divChildComment.className = "divChildComment";

    // Add the image to the child comment
    let imgChild = document.createElement("img");
    imgChild.src = imgSrc;
    imgChild.alt = "";
    divChildComment.appendChild(imgChild);

    // Create the name and comment like container
    let divNameAndCommentLike = document.createElement("div");
    divNameAndCommentLike.className = "divNameAndCommentLike";
    divChildComment.appendChild(divNameAndCommentLike);

    // Create the name and comment div
    let divNameAndComment = document.createElement("div");
    divNameAndComment.className = "divNameAndComment";
    divNameAndCommentLike.appendChild(divNameAndComment);

    // Add the name paragraph
    let pName = document.createElement("p");
    pName.className = "pName";
    pName.textContent = nameOfUser;
    divNameAndComment.appendChild(pName);

    // Create the comment container div
    let divComment1 = document.createElement("div");
    divComment1.className = "divComment1";
    divNameAndComment.appendChild(divComment1);

    // Add the comment content paragraph
    let pContent = document.createElement("p");
    pContent.className = "pContent";

    divComment1.appendChild(pContent);

    // Add the tag span
    if (listTagedId != null){
        for (var i = 0; i < listTagedId.length; i++){
            pContent.innerHTML = pContent.innerHTML + "<span class='pTag'>@" + listTagedName[i] + "</span> ";
        }
    }

    // Add the rest of the comment text
    pContent.innerHTML += content;
    if (listTagedName != null){
        var listPTag = pContent.querySelectorAll(".pTag");
        for (let i = 0; i < listPTag.length; i++){
            listPTag[i].addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?id=" + listTagedId[i];
            }
            )
        }
    }

    // Create the image comment container div
    let divImgComment = document.createElement("div");
    divImgComment.id = "divImgComment";
    divComment1.appendChild(divImgComment);

    // Add the image inside the comment
    if (typeFile == "Img"){
        let imgComment = document.createElement("img");
        imgComment.src = imgOrVideoSrc;
        imgComment.alt = "";
        divImgComment.appendChild(imgComment);
    }
    else if (typeFile != ""){
        var img = document.createElement('video');
        img.src = imgOrVideoSrc;
        img.alt = '';
        divImgComment.appendChild(img);
        img.controls = true;
    }

    // Create the time, like, and reply div
    let divTimeLikeAndReply = document.createElement("div");
    divTimeLikeAndReply.className = "divTimeLikeAndReply";
    divNameAndCommentLike.appendChild(divTimeLikeAndReply);

    // Create the like div
    let divLike = document.createElement("div");
    divLike.className = "divLike";
    divTimeLikeAndReply.appendChild(divLike);

    // Add the like count paragraph
    let pLikeCount = document.createElement("p");
    pLikeCount.textContent = numberOfLikes + "Like";
    pLikeCount.style.cursor = "pointer";
    divLike.appendChild(pLikeCount);
    var flagPLike = flagLiked;
    if (flagPLike == 0){
        pLikeCount.style.color = "gray";
    }
    else{
        pLikeCount.style.color = "rgb(8, 102, 255)";
    }
    pLikeCount.addEventListener("click", () => 
    {
        if (flagPLike == 0){
            pLikeCount.style.color = "rgb(8, 102, 255)";8
            flagPLike = 1;
            var number = pLikeCount.textContent.replace("Like", "");
            number = parseInt(number);
            pLikeCount.textContent = (number + 1) + "Like";
            likeComment(commentId);
        }
        else{
            pLikeCount.style.color = "gray";
            flagPLike = 0;
            var number = pLikeCount.textContent.replace("Like", "");
            number = parseInt(number);
            pLikeCount.textContent = (number - 1) + "Like";
            deleteLikeComment(commentId)
        }
    }
    )

    // Add the reply paragraph
    // let pReply = document.createElement("p");
    // pReply.className = "pReply";
    // pReply.textContent = numberOfComments + "Reply";
    // divTimeLikeAndReply.appendChild(pReply);

    // Add the time paragraph
    let pTime = document.createElement("p");
    pTime.className = "pTime";
    pTime.textContent = time;
    divTimeLikeAndReply.appendChild(pTime);

    // Add the icon more setting
    let iSetting = document.createElement("i");
    iSetting.className = 'bi bi-three-dots';
    iSetting.style.cursor = "pointer";
    iSetting.style.transform = "translateY(3px)";
    divTimeLikeAndReply.appendChild(iSetting);
    iSetting.addEventListener("click", () => 
    {
        currentCommentIdInEditComment = commentId;
        displayEditComment(currentObjectCommentChild, index);
        flagEditComment = 1;
    }
    )
    
    let pDeleteComment = document.createElement("p");
    pDeleteComment.innerHTML = "delete";
    pDeleteComment.style.cursor = "pointer";
    pDeleteComment.style.display = "none";
    pDeleteComment.addEventListener("click", () => 
    {
        sendRequestDeleteComment(commentId);
    }
    )

    divTimeLikeAndReply.appendChild(pDeleteComment);
    console.log(currentObjectCommentChild[index]);
    if (userId != currentObjectCommentChild[index].userId){
        iSetting.style.display = "none";
        if (userId == objectPostInfo[currentIndexOfPost].userId){
            pDeleteComment.style.display = "block";
        }
    }

    return divChildComment;
}

function createInputComment(imgUserComment){
    // Create the main container div
    let divCommentComment = document.createElement("div");
    divCommentComment.className = "divCommentComment divChildComment";

    // Add the image
    let imgComment = document.createElement("img");
    imgComment.src = imgUserComment;
    imgComment.alt = "";
    divCommentComment.appendChild(imgComment);

    // Create the input container div
    let divInput = document.createElement("div");
    divInput.className = "divInput";
    divCommentComment.appendChild(divInput);

    // Add the input element
    let input = document.createElement("textarea");
    input.type = "text";
    input.placeholder = "Write a comment...";
    divInput.appendChild(input);

    // Create the add to comment container div
    let divAddToComment = document.createElement("div");
    divAddToComment.className = "divAddToComment";
    divInput.appendChild(divAddToComment);

    // Create the main div element
    const divImgOrVideo = document.createElement('div');
    divImgOrVideo.className = 'divImgOrVideo';

    // Create the first close icon
    const iCloseComment1 = document.createElement('i');
    iCloseComment1.id = 'iCloseComment1';
    iCloseComment1.className = 'fa-solid fa-xmark';
    iCloseComment1.style.display = 'none';

    // Create the div for tagged friends
    const divTagedFriend = document.createElement('div');
    divTagedFriend.className = 'divTagedFriend';

    // Create the second close icon
    const iCloseComment2 = document.createElement('i');
    iCloseComment2.id = 'iCloseComment2';
    iCloseComment2.className = 'fa-solid fa-xmark';
    iCloseComment2.style.display = 'none';

    // Append the elements to their respective parents
    divTagedFriend.appendChild(iCloseComment2);
    divImgOrVideo.appendChild(iCloseComment1);
    divImgOrVideo.appendChild(divTagedFriend);
    divAddToComment.appendChild(divImgOrVideo);

    // Add the icons container div
    let divIcon = document.createElement("div");
    divIcon.className = "divIcon";
    divAddToComment.appendChild(divIcon);

    // Add the emoji icon
    let emojiIcon = document.createElement("i");
    emojiIcon.className = "bi bi-emoji-wink";
    divIcon.appendChild(emojiIcon);

    // Add the camera icon
    let cameraIcon = document.createElement("i");
    cameraIcon.className = "bi bi-camera";
    divIcon.appendChild(cameraIcon);

    // Add the tags icon
    let tagsIcon = document.createElement("i");
    tagsIcon.className = "bi bi-tags";
    divIcon.appendChild(tagsIcon);

    // Add the send comment icon
    let sendCommentIcon = document.createElement("i");
    sendCommentIcon.id = "iSendComment";
    sendCommentIcon.className = "fa-solid fa-paper-plane";
    divAddToComment.appendChild(sendCommentIcon);

    return divCommentComment;
}

function setDataForDivComment(userName){
    pHeaderComment.innerHTML = userName + "'s post";
}

function displayTagFriend(){
    var arrayIDisplayTagFriend = document.querySelectorAll("i.bi.bi-tags");
    for (let i = 0; i < arrayIDisplayTagFriend.length; i++){
        arrayIDisplayTagFriend[i].addEventListener("click", () => 
        {
            var divInput = arrayIDisplayTagFriend[i].closest(".divInput");
            currentInputServedForChooseIcon = divInput.querySelector("textarea");
            imgTagFriends.click();
        }
        )
    }
}

function uploadingFileInComment(){
    var allIcon = document.querySelectorAll("i.bi.bi-camera");
    for (let i = 0; i < allIcon.length; i++){
        allIcon[i].addEventListener("click", () => 
        {
            var divInput = allIcon[i].closest(".divInput");
            currentDivImgOrVideo = divInput.querySelector(".divAddToComment .divImgOrVideo");
            document.querySelector("#inputUploadInComment").click();
        }
        )
    }
}

uploadingFileInComment();

inputUploadInComment.addEventListener('change', (e) => 
{
    currentFile = e.target.files[0];
    if (currentFile.type.startsWith('image/')) {
        var img = document.createElement("img");
        if (currentDivImgOrVideo.querySelector("img") != null){
            currentDivImgOrVideo.querySelector("img").remove();
        }
        if (currentDivImgOrVideo.querySelector("video") != null){
            currentDivImgOrVideo.querySelector("video").remove();
        }
        document.querySelector("#iclose")
        currentDivImgOrVideo.appendChild(img);
        displayFileWhenUpload(img, currentFile);
        document.querySelector("#iCloseComment1").style.display = "block";
    } else {
        var video = document.createElement("video");
        if (currentDivImgOrVideo.querySelector("img") != null){
            currentDivImgOrVideo.querySelector("img").remove();
        }
        if (currentDivImgOrVideo.querySelector("video") != null){
            currentDivImgOrVideo.querySelector("video").remove();
        }
        currentDivImgOrVideo.appendChild(video);
        displayFileWhenUpload(video, currentFile);
    }
}
)

// function display file in comment when upload
function displayFileWhenUpload(imgOrVideo, file){
    const reader = new FileReader();
    reader.onload = function(e1) {
        imgOrVideo.src = e1.target.result;
    };
    reader.readAsDataURL(file);
}

// upload comment
function uploadComment(content, level, postId, parentCommentId){
    const formData = new FormData();
    formData.append("file", currentFile);
    for (let value of setTagedId) {
        formData.append("listTagedId", value);
    }
    formData.append("content", content);
    formData.append("level", level);
    formData.append("postId", postId);
    formData.append("parentCommentId", parentCommentId);
    const token = getCookie("jwtToken");
    fetch('/comment/uploadComment', {
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
            textareaLevel1.value = "";
            var listpTag;
            var img;
            var video;
            if (currentDivImgOrVideo != null){
                listpTag = currentDivImgOrVideo.querySelectorAll("p");
                img = currentDivImgOrVideo.querySelector("img");
                currentDivImgOrVideo.querySelector("#iCloseComment1").style.display = "none";
                currentDivImgOrVideo.querySelector("#iCloseComment2").style.display = "none";
                video = currentDivImgOrVideo.querySelector("video");
            }
            if (listpTag != null){
                for (var i = 0; i < listpTag.length; i++){
                    listpTag[i].remove();
                }
            }
            if (img != null){
                img.remove();
            }
            if (video != null){
                video.remove();
            }
            if (flagUploadCommentChild == 0){
                getCommentInPost(currentPostIdComment);
            }
            else{
                divContentComment.innerHTML = "";
                getCommentChild(currentParentCommentId, currentIndexOfCommentParent);
            }
            document.querySelector(".spinner-border").style.display = "none";
            document.querySelector("#pTextSpinner").innerHTML = "Upload comment successfully!";
            document.querySelector("#iTickSpinner").style.display = "block";
            setTimeout(function() {
                document.querySelector(".divContainSpinner").style.display = "none";
            }, 1500)
        }, 5000); // 5000 milliseconds = 5 seconds
        currentFile = null;
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

iUploadCommentLevel1.addEventListener("click", () => 
{
    var content = textareaLevel1.value;
    if (flagUploadCommentChild == 0){
        uploadComment(content, 1, currentPostIdComment, "");
    }
    else{
        uploadComment(content, 2, currentPostIdComment, currentParentCommentId);
    }
}
)

// function get data
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
        divContentComment.innerHTML = "";
        currentObjectCommentParent = data1.object;
        console.log(data1.object);
        createDivCommentParent();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function create divCommentParent
function createDivCommentParent(){
    for (var i = 0; i < currentObjectCommentParent.length; i++){
        var div1CommentParent = createDiv1Comment("../FileUser/Image/" + currentObjectCommentParent[i].userId + "/avatar.jpg",
            currentObjectCommentParent[i].userName, currentObjectCommentParent[i].content, currentObjectCommentParent[i].listTagedUserName,
            currentObjectCommentParent[i].linkFile, currentObjectCommentParent[i].typeImgOrVideo, currentObjectCommentParent[i].numberOfLikes,
            formatDate(currentObjectCommentParent[i].time), currentObjectCommentParent[i].listTagedUserId, currentObjectCommentParent[i].numberOfReplies,
            currentObjectCommentParent[i].commentId, currentObjectCommentParent[i].flagLike, i
        )
        divContentComment.appendChild(div1CommentParent);
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

//function get commentChild 
function getCommentChild(commentParentId, index){
    const token = getCookie("jwtToken");
    fetch('/comment/getCommentChild?commentParentId=' + commentParentId, {
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
        currentObjectCommentChild = data1.object;
        console.log(currentObjectCommentChild);
        addDataForDetailReply(index);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function setup data for divContent when click reply comment
function eventForClickingReplyComment(userName, commentParentId, index){
    var p = document.querySelector("#divComment > div.divHeaderComment > p");
    p.innerHTML = userName + "'s comment";
    divContentComment.innerHTML = "";
    getCommentChild(commentParentId, index);
}

function addDataForDetailReply(i){
    var div1CommentParent = createDiv1Comment("../FileUser/Image/" + currentObjectCommentParent[i].userId + "/avatar.jpg",
        currentObjectCommentParent[i].userName, currentObjectCommentParent[i].content, currentObjectCommentParent[i].listTagedUserName,
        currentObjectCommentParent[i].linkFile, currentObjectCommentParent[i].typeImgOrVideo, currentObjectCommentParent[i].numberOfLikes,
        formatDate(currentObjectCommentParent[i].time), currentObjectCommentParent[i].listTagedUserId, currentObjectCommentParent[i].numberOfReplies,
        currentObjectCommentParent[i].commentId, currentObjectCommentParent[i].flagLike, i
    )
    divContentComment.appendChild(div1CommentParent);
    for (var i = 0; i < currentObjectCommentChild.length; i++){
        var childComment = createDivChildComment("../FileUser/Image/" + currentObjectCommentChild[i].userId + "/avatar.jpg",
            currentObjectCommentChild[i].userName, currentObjectCommentChild[i].content, currentObjectCommentChild[i].listTagedUserName,
            currentObjectCommentChild[i].linkFile, currentObjectCommentChild[i].typeImgOrVideo, currentObjectCommentChild[i].numberOfLikes,
            formatDate(currentObjectCommentChild[i].time), currentObjectCommentChild[i].listTagedUserId, currentObjectCommentChild[i].numberOfReplies,
            currentObjectCommentChild[i].commentId, currentObjectCommentChild[i].flagLike, i
        )
        div1CommentParent.appendChild(childComment);
    }
}

document.querySelector("#divComment > div.divHeaderComment > i.fa-solid.fa-arrow-left").addEventListener("click", () => 
{
    divContentComment.innerHTML = "";
    getCommentInPost(currentPostIdComment);
    flagUploadCommentChild = 0;
    document.querySelector("#divComment > div.divHeaderComment > i.fa-solid.fa-arrow-left").style.display = "none";
    console.log(currentPostIdComment);
    pHeaderComment.innerHTML = objectPostInfo[currentIndexOfPost].userName + "'s post";
}
)

/*event for delete taged friend and file */
document.querySelector("#iCloseComment2").addEventListener("click", () => 
{
    var allP = document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > div.divTagedFriend").querySelectorAll("p");
    for (var i = 0; i < allP.length; i++){
        allP[i].remove();
    }
    setTagedId = new Set();
    document.querySelector("#iCloseComment2").style.display = "none";
}
)

document.querySelector("#iCloseComment1").addEventListener("click", () =>
{
    document.querySelector("#iCloseComment1").style.display = "none"
    if (currentFile.type.startsWith('image/')) {
        if (currentDivImgOrVideo.querySelector("img") != null){
            currentDivImgOrVideo.querySelector("img").remove();
        }
        if (currentDivImgOrVideo.querySelector("video") != null){
            currentDivImgOrVideo.querySelector("video").remove();
        }
    } else {
        if (currentDivImgOrVideo.querySelector("img") != null){
            currentDivImgOrVideo.querySelector("img").remove();
        }
        if (currentDivImgOrVideo.querySelector("video") != null){
            currentDivImgOrVideo.querySelector("video").remove();
        }
    }
    currentFile = null;
    currentDivImgOrVideo = null;
}
)

document.querySelector("#iCloseComment").addEventListener("click", () => 
{
    var allP = document.querySelector("#divComment > div.divCommentComment > div > div > div.divImgOrVideo > div.divTagedFriend").querySelectorAll("p");
    for (var i = 0; i < allP.length; i++){
        allP[i].remove();
    }
    setTagedId = new Set();
    document.querySelector("#iCloseComment2").style.display = "none";

    document.querySelector("#iCloseComment1").style.display = "none"
    if (currentFile != null){
        if (currentFile.type.startsWith('image/')) {
            if (currentDivImgOrVideo.querySelector("img") != null){
                currentDivImgOrVideo.querySelector("img").remove();
            }
            if (currentDivImgOrVideo.querySelector("video") != null){
                currentDivImgOrVideo.querySelector("video").remove();
            }
        } else {
            if (currentDivImgOrVideo.querySelector("img") != null){
                currentDivImgOrVideo.querySelector("img").remove();
            }
            if (currentDivImgOrVideo.querySelector("video") != null){
                currentDivImgOrVideo.querySelector("video").remove();
            }
        }
    }
    currentFile = null;
    currentDivImgOrVideo = null;

    flagUploadCommentChild = 0;

    divContentComment.innerHTML = "";
    flagUploadCommentChild = 0;
    document.querySelector("#divComment > div.divHeaderComment > i.fa-solid.fa-arrow-left").style.display = "none";}
)