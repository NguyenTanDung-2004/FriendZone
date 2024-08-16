function getPost(){
    const token = getCookie("jwtToken");
    var groupId = getParam("groupId");
    fetch('/handleGroup/getPost?groupId=' + groupId, {
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
        console.log(data1.object);
        allPostInGroup = data1.object;
        for (var i = 0; i < allPostInGroup.length; i++){
            mapPostIdIndex.set(allPostInGroup[i].id, i);
        }
        createAllPost();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getPost();

// function create divPostHeader
function createDivPostHeader(imgSrc, nameUser, userId, formattedTime, anonymous, divPost){
    // Create the main div element
    var divPostHeader = document.createElement('div');
    divPostHeader.className = 'divPostHeader';

    // Create the left section div element
    var divPostHeaderLeft = document.createElement('div');
    divPostHeaderLeft.className = 'divPostHeaderLeft';

    // Create the img element
    var img = document.createElement('img');
    img.src = imgSrc;
    img.alt = '';

    // Append the img element to the left section
    divPostHeaderLeft.appendChild(img);

    // Create the div for name and time
    var divNameAndTime = document.createElement('div');
    divNameAndTime.className = 'divNameAndTime';

    // Create the p element for the name
    var pNameUser = document.createElement('p');
    pNameUser.className = 'pNameUser';
    pNameUser.textContent = nameUser;

    // Append the p element to the name and time div
    divNameAndTime.appendChild(pNameUser);

    // Create the div for time and scope
    var divTimeAndScope = document.createElement('div');
    divTimeAndScope.className = 'divTimeAndScope';

    // Create the p element for the time
    var pTime = document.createElement('p');
    pTime.textContent = formattedTime;

    // Append the p and i elements to the time and scope div
    divTimeAndScope.appendChild(pTime);

    // Append the time and scope div to the name and time div
    divNameAndTime.appendChild(divTimeAndScope);

    // Append the name and time div to the left section
    divPostHeaderLeft.appendChild(divNameAndTime);

    // Append the left section to the main div
    divPostHeader.appendChild(divPostHeaderLeft);

    // Create the i element for the edit post icon
    var iEditPost = document.createElement('i');
    iEditPost.className = 'fa-solid fa-ellipsis editPost';

    // Append the edit post icon to the main div
    divPostHeader.appendChild(iEditPost);

    var flagDisplaySetting = 0;
    iEditPost.addEventListener("click", () => 
    {
        if (flagDisplaySetting == 0){
            divPost.querySelector(".divSettingPost").style.display = "flex";
            flagDisplaySetting = 1;
        }
        else{
            divPost.querySelector(".divSettingPost").style.display = "none";
            flagDisplaySetting = 0;
        }
    }
    )

    if (anonymous == 1){
        pNameUser.textContent = "Anonymous Member";
        img.src = "../Img/Anonymous.png";
    }
    else{
        pNameUser.addEventListener("click", () => 
        {
            window.location = "http://localhost:8080/FriendZone?id=" + userId;
        }
        )
    }

    return divPostHeader;
}

// function divCaption
function createDivCaption(caption){
    var divCaption = document.createElement("div");
    divCaption.className = "divCaption";
    divCaption.innerHTML = caption;
    return divCaption;
}

// function create divTagedFriend
function createDivTagedFriend(listUserId, listUserName){
    var divTagedFriend = document.createElement("div");
    divTagedFriend.className = "divTagedFriend";
    if (listUserId != null){
        for (let i = 0; i < listUserName.length; i++){
            var p = document.createElement("p");
            p.innerHTML = "@" + listUserName[i];
            divTagedFriend.appendChild(p);
            p.addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?id=" + listUserId[i];
            }
            )
        }   
    }
    return divTagedFriend;
}

// function createDivAnotherFile
function createDivOthersFile(listFileId, listFileName, listTailOfOtherFile, userId){
    var divOthersFile = document.createElement("div");
    divOthersFile.style.display = "flex";
    divOthersFile.style.flexWrap = "wrap";
    divOthersFile.style.gap = "5px";
    divOthersFile.className = "divOthersFile";
    for (let i = 0; i < listFileName.length; i++){
        var divDownloadFile = document.createElement("div");
        divDownloadFile.style.cursor = "pointer";
        divDownloadFile.id = "divDownLoadFile";
        var p = document.createElement("p");
        p.style.color = '#1877f2';
        p.style.margin = "0";
        p.innerHTML = listFileName[i];
        var i1 = document.createElement("i");
        i1.classList = "bi bi-download";
        divDownloadFile.appendChild(p);
        divDownloadFile.appendChild(i1);
        divOthersFile.appendChild(divDownloadFile);
        
        divDownloadFile.addEventListener("click", () => 
        {
            downloadFile(listFileId[i], listTailOfOtherFile[i], listFileName[i], userId);
        }
        )
    }
    return divOthersFile;
}

// function create divImgAndVideo
function createDivNumberLikeAndComment(numberOfLikes, numberOfComments){
        // Create the main div element
    var divNumberLikeAndComment = document.createElement('div');
    divNumberLikeAndComment.className = 'divNumberLikeAndComment';

    // Create the p element for likes
    var pLikes = document.createElement('p');
    pLikes.textContent = numberOfLikes + " likes";

    // Append the p element to the main div
    divNumberLikeAndComment.appendChild(pLikes);

    // Create the div for comments and shares
    var divCommentAndShare = document.createElement('div');
    divCommentAndShare.className = 'divCommentAndShare';

    // Create the p element for comments
    var pComments = document.createElement('p');
    pComments.textContent = numberOfComments + " comments";

    // Append the p elements to the comments and shares div
    divCommentAndShare.appendChild(pComments);

    // Append the comments and shares div to the main div
    divNumberLikeAndComment.appendChild(divCommentAndShare);

    return divNumberLikeAndComment;
}

function createDivLine(){
    var divLine = document.createElement("div");
    divLine.className = "divLine";
    return divLine;
}

function createDivLikeCommentShareChild(postId, flagLiked){
    // Create the main div element
    var divLikeCommentShare = document.createElement('div');
    divLikeCommentShare.className = 'divLikeCommentShare';

    var divLike = createIconLike(flagLiked);
    divLike.addEventListener("click", () => 
    {
        if (flagLiked == 0){
            likePost(postId, divLike.querySelector('i'), divLike.querySelector('p'));
        }
        else{
            deleteLikePost(postId, divLike.querySelector('i'), divLike.querySelector('p'));
        }
    }
    )

    // Create the comment div
    var divComment = createChildDiv('divComment', {backgroundPosition: '0px -529px'}, 'Comment');

    divComment.addEventListener("click", () => 
    {
        currentPostIdInComment = postId;
        displayDivComment();
        getCommentInPost(postId);
    }
    )

    // Append the child divs to the main div
    divLikeCommentShare.appendChild(divLike);
    divLikeCommentShare.appendChild(divComment);
    
    return divLikeCommentShare;
}

function createChildDiv(className, iconStyle, textContent) {
    var divChild = document.createElement('div');
    divChild.className = className + ' divLikeCommentShareChild';

    var icon = document.createElement('i');
    icon.setAttribute('data-visualcompletion', 'css-img');
    icon.className = 'x1b0d499 x1d69dk1';
    icon.style.backgroundImage = 'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/nk1kvYo7-YG.png?_nc_eui2=AeG-ldzzN8KcqNlflYb2bJ5xADTNbtoBM14ANM1u2gEzXsEcCeyDPFMEKT5VpNY95V4-3qUrwiPneDjklDFzhmJv")';
    icon.style.backgroundPosition = iconStyle.backgroundPosition;
    icon.style.backgroundSize = '25px 1442px';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.display = 'inline-block';

    var p = document.createElement('p');
    p.textContent = textContent;

    divChild.appendChild(icon);
    divChild.appendChild(p);

    return divChild;
}

function createIconLike(flagLiked){
    var divChild = document.createElement('div');
    divChild.className = 'divLike divLikeCommentShareChild1';
    divChild.style.display = "flex";
    divChild.style.gap = "5px"
    divChild.style.alignItem = "center";
    divChild.style.cursor = "pointer";

    var icon = document.createElement('i');
    icon.className = "bi bi-hand-thumbs-up";
    icon.style.marginTop = "5px";
    icon.style.fontSize = "20px";
    icon.style.color = "gray";

    var p = document.createElement('p');
    p.textContent = 'Like';
    p.style.margin = "0"
    p.style.color = "gray";

    if (flagLiked == 1){
        icon.style.color = "rgb(8, 102, 255)"
        icon.className = 'bi bi-hand-thumbs-up-fill';
        p.style.color = "rgb(8, 102, 255)"
    }

    divChild.appendChild(icon);
    divChild.appendChild(p);

    return divChild;
}

function createIconLikeShareComment(className, iconStyle, textContent) {
    var divChild = document.createElement('div');
    divChild.className = className + ' divLikeCommentShareChild';

    var icon = document.createElement('i');
    icon.setAttribute('data-visualcompletion', 'css-img');
    icon.className = 'x1b0d499 x1d69dk1';
    icon.style.backgroundImage = 'url("https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/nk1kvYo7-YG.png?_nc_eui2=AeG-ldzzN8KcqNlflYb2bJ5xADTNbtoBM14ANM1u2gEzXsEcCeyDPFMEKT5VpNY95V4-3qUrwiPneDjklDFzhmJv")';
    icon.style.backgroundPosition = iconStyle.backgroundPosition;
    icon.style.backgroundSize = '25px 1442px';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.display = 'inline-block';

    var p = document.createElement('p');
    p.textContent = textContent;

    divChild.appendChild(icon);
    divChild.appendChild(p);

    return divChild;
}

//create divImgAndVideo
function createDivImgAndVideo(firstImgOrVideoSrc, numberOfFile, type, listIdFile, listTailOfFile, userId){
    var divImg = document.createElement('div');
    divImg.className = 'divImg';
    divImg.style.position = 'relative';
    divImg.style.cursor = 'pointer';
    
    // Create the img or video element
    if (type == "Image"){
        var img = document.createElement('img');
        img.style.maxWidth = '100%';
        img.style.width = '100%';
        img.style.height = '40vw';
        img.style.maxHeight = '40vw';
        img.style.objectFit = 'cover';
        img.src = firstImgOrVideoSrc;
        img.alt = '';
    }
    else{
        var img = document.createElement('video');
        img.controls = true;
        img.style.maxWidth = '100%';
        img.style.width = '100%';
        img.style.height = '40vw';
        img.style.maxHeight = '40vw';
        img.style.objectFit = 'cover';
        img.src = firstImgOrVideoSrc;
        img.alt = '';
    }
    
    if (numberOfFile > 1){
        // Create the inner div element (divBlurImg)
        var divBlurImg = document.createElement('div');
        divBlurImg.style.position = 'absolute';
        divBlurImg.style.width = '100%';
        divBlurImg.style.height = '100%';
        divBlurImg.style.top = '0';
        divBlurImg.style.backgroundColor = '#EEEEEE';
        divBlurImg.style.opacity = '0.5';
        divBlurImg.style.zIndex = "102";
        divBlurImg.id = 'divBlurImg';
        
        // Create the p element
        var pNumberOfImgOrVideo = document.createElement('p');
        pNumberOfImgOrVideo.style.fontSize = '70px';
        pNumberOfImgOrVideo.style.position = 'absolute';
        pNumberOfImgOrVideo.style.color = 'white';
        pNumberOfImgOrVideo.style.top = '40%';
        pNumberOfImgOrVideo.style.left = '45%';
        pNumberOfImgOrVideo.id = 'pNumberOfImgOrVideo';
        pNumberOfImgOrVideo.textContent = numberOfFile + "+";
        divImg.appendChild(pNumberOfImgOrVideo);
        divImg.appendChild(divBlurImg);

        divBlurImg.addEventListener("click", () => 
        {
            assignTheFirstValue(listIdFile[0], listTailOfFile[0], userId);
            divDisplayImgAndVideo.style.display = "flex";
            createListLinkImgOrVideoAndListTypeOfFile(listIdFile, listTailOfFile, userId);
        }
        )
    }
    
    // Append the img, divBlurImg, and p elements to the divImg
    divImg.appendChild(img);

    return divImg;
}

// function create DivSettingPost
// function create setting post
function createSettingPost(flagPostOwner, postId){
    const divSettingPost = document.createElement('div');
    divSettingPost.className = 'divSettingPost';
    const divCopyLink = createSubDiv('fa-solid fa-copy', 'Copy link');
    divCopyLink.className = 'divCopyLink';
    divCopyLink.addEventListener("click", () => 
    {
        var groupId = getParam("groupId");
        navigator.clipboard.writeText("http://localhost:8080/FriendZone/group?groupId=" + groupId + "&postId=" + postId + "&action=scrollToPost");
        showToast("Copy link successfully!");
    }
    )

    const divDelete = createSubDiv('fa-solid fa-trash', 'Delete Post');
    divDelete.className = 'divDelete';
    divDelete.addEventListener("click", () => 
    {
        const confirm1 = confirm("Are you sure that you want to delete this post?");
        if (confirm1){
            sendRequestDeletePost(postId);
        }
        else{

        }
    }
    )

    const divEdit = createSubDiv('fa-regular fa-pen-to-square', 'Edit Post');
    divEdit.className = 'divEdit';
    divEdit.addEventListener("click", () => 
    {
        divEditPost.style.transform = "scale(1)";
        divBlurBox.style.display = "block";
        flagEditPost = 1;
        currentPostIdInEditPost = postId;
        setDataForUpdatePost(postId);
    }
    )

    divSettingPost.appendChild(divCopyLink);
    divSettingPost.appendChild(divDelete);
    divSettingPost.appendChild(divEdit);

    if (flagPostOwner == 0 && adminFlag == 0){
        divDelete.remove();
        divEdit.remove();
    }
    else if (flagPostOwner == 0 && adminFlag == 1){
        divEdit.remove();
    }
    else{
        //divEdit.remove();
    }

    return divSettingPost;
}

function createSubDiv(iconClass, text) {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '20px';
    div.style.fontSize = '23px';

    const icon = document.createElement('i');
    icon.className = iconClass;
    
    const paragraph = document.createElement('p');
    paragraph.style.fontWeight = '600';
    paragraph.style.fontSize = '18px';
    paragraph.style.margin = '0';
    paragraph.textContent = text;

    div.appendChild(icon);
    div.appendChild(paragraph);

    return div;
}

// function download file
function downloadFile(fileId, tail, nameFile, userId){
    const token = getCookie("jwtToken");
    fetch('/handleFile/downloadFile?type=Others&fileId=' + fileId + "&tail=" + tail + "&nameFile=" + nameFile + "&userId=" + userId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.blob();; // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        console.log(data1);
        const url = window.URL.createObjectURL(data1);
        const a = document.createElement('a');
        a.href = url;
        a.download = nameFile; // Use the nameFile parameter as the download filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function like post 
function likePost(postId, icon, p){
    const token = getCookie("jwtToken");
    fetch('/user/likePost?postId=' + postId, {
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
        icon.style.color = "rgb(8, 102, 255)"
        icon.className = 'bi bi-hand-thumbs-up-fill';
        p.style.color = "rgb(8, 102, 255)"
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function delete likePost
function deleteLikePost(postId, icon, p){
    const token = getCookie("jwtToken");
    fetch('/likePost/deleteLikePost?postId=' + postId, {
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
        icon.style.color = "gray"
        icon.className = 'bi bi-hand-thumbs-up';
        p.style.color = "gray"
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
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
function sendRequestDeletePost(postId){
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
            location.reload();
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}


// function create all post
function create1Post(postId, userName, formattedTime, anonymous, caption, listUserId, listUserName,
                    listFileId, listFileName, listTailOfOtherFile, userId, firstImgOrVideoSrc, numberOfFile, 
                    type, flagPostOwner, imgSrc, userId, numberOfLikes, numberOfComments, flagLiked, listImgOrVideoId, 
                    listTailOfImgOrVideo
){
    var divPost = document.createElement("div");
    divPost.className = "divPost " + postId;

    // create postHeader
    var divPostHeader = createDivPostHeader(imgSrc, userName, userId, formattedTime, anonymous, divPost);
    
    // create divCaption
    var divCaption = createDivCaption(caption);

    //create divTagedFriend
    var divTagedFriend = createDivTagedFriend(listUserId, listUserName);

    // creat divOtherFile
    var divOtherFile = createDivOthersFile(listFileId, listFileName, listTailOfOtherFile, userId);

    // create divSettingPost
    var divSettingPost = createSettingPost(flagPostOwner, postId);

    // create div like
    var divNumberLikeComment = createDivNumberLikeAndComment(numberOfLikes, numberOfComments)
    var divLine = createDivLine();
    var divLikeComment = createDivLikeCommentShareChild(postId, flagLiked)

    divPost.appendChild(divPostHeader);
    divPost.appendChild(divCaption);
    divPost.appendChild(divTagedFriend);
    divPost.appendChild(divOtherFile);

    // create divImg
    if (firstImgOrVideoSrc != null){
        var divImg = createDivImgAndVideo(firstImgOrVideoSrc, numberOfFile, type, listImgOrVideoId, listTailOfImgOrVideo, userId);
        divPost.appendChild(divImg);
    }

    divPost.appendChild(divSettingPost);
    divPost.appendChild(divNumberLikeComment);
    divPost.appendChild(divLine);
    divPost.appendChild(divLikeComment);

    divContent.appendChild(divPost);
}

// function create all Post
function createAllPost(){
    for (var i = 0; i < allPostInGroup.length; i++){
        var firstImgOrVideoSrc = null;
        var type = null;
        if (allPostInGroup[i].tailOfFile.length > 0){
            type = checkFilesVideoOrImage(allPostInGroup[i].tailOfFile[0]);
            if (type == "Image"){
                firstImgOrVideoSrc = "../FileUser/Image/" + allPostInGroup[i].userId + "/" + allPostInGroup[i].fileIdImgOrVideo[0] + allPostInGroup[i].tailOfFile[0];
            }
            else{
                firstImgOrVideoSrc = "../FileUser/Video/" + allPostInGroup[i].userId + "/" + allPostInGroup[i].fileIdImgOrVideo[0] + allPostInGroup[i].tailOfFile[0];
            }
        }
        var imgAvatar = "../FileUser/Image/" + allPostInGroup[i].userId + "/avatar.jpg";
        create1Post(allPostInGroup[i].id, allPostInGroup[i].userName, formatDate(allPostInGroup[i].time), allPostInGroup[i].anonymous,
                    allPostInGroup[i].caption, allPostInGroup[i].idTagedUser, allPostInGroup[i].nameTagedUser, allPostInGroup[i].fileIdOther,
                    allPostInGroup[i].fileNameOther, allPostInGroup[i].tailOfOthersFile, allPostInGroup[i].userId, firstImgOrVideoSrc,
                    allPostInGroup[i].fileIdImgOrVideo.length, type, allPostInGroup[i].flagPostOwner, imgAvatar, allPostInGroup[i].userId, 
                    allPostInGroup[i].numberOfLikes, allPostInGroup[i].numberOfComments, allPostInGroup[i].flagLiked, allPostInGroup[i].fileIdImgOrVideo,
                    allPostInGroup[i].tailOfFile
        );
    }
}

// function create list link img or video
function createListLinkImgOrVideoAndListTypeOfFile(listIdFile, listTailOfFile, userId){
    for (var i = 0; i < listIdFile.length; i++){
        var typeOfFile = checkFilesVideoOrImage(listTailOfFile[i]);
        listTypeOfFile.push(typeOfFile);
        var linkFile = "../FileUser/" + typeOfFile + "/" + userId + "/" + listIdFile[i] + listTailOfFile[i];
        listLinkImgOrVideo.push(linkFile);
    }
}

// function assign the first value for display img and video
function assignTheFirstValue(fileId, tailOfFile, userId){
    var typeOfFile = checkFilesVideoOrImage(tailOfFile);
    if (typeOfFile == "Image"){
        imgDisplay.src = "../FileUser/Image/" + userId + "/" + fileId + tailOfFile;
    }
    else{
        videoDisplay.src = "../FileUser/Video/" + userId + "/" + fileId + tailOfFile;
    }
}