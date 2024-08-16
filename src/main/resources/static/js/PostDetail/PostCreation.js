 // function create divPostHeader
 function createDivPostHeader(imgSrc, nameUser, formattedTime, scope){
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

    // Create the i element for the scope icon
    var iScope = document.createElement('i');
    if (scope == 1){
        iScope.classList = friendScope
    }
    else if (scope == 2){
        iScope.classList = publicScope
    }
    else if (scope == 3){
        iScope.classList = onlyScope
    }

    // Append the p and i elements to the time and scope div
    divTimeAndScope.appendChild(pTime);
    divTimeAndScope.appendChild(iScope);

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
function createDivTagedFriend(listTagedFriendNameInPost){
    var divTagedFriend = document.createElement("div");
    divTagedFriend.className = "divTagedFriend";
    for (var i = 0; i < listTagedFriendNameInPost.length; i++){
        var p = document.createElement("p");
        p.innerHTML = "@" + listTagedFriendNameInPost[i];
        divTagedFriend.appendChild(p);
    }   
    return divTagedFriend;
}

// function createDivAnotherFile
function createDivOthersFile(listOthersFileName){
    var divOthersFile = document.createElement("div");
    divOthersFile.style.display = "flex";
    divOthersFile.style.flexWrap = "wrap";
    divOthersFile.style.gap = "5px";
    divOthersFile.className = "divOthersFile";
    for (var i = 0; i < listOthersFileName.length; i++){
        var divDownloadFile = document.createElement("div");
        divDownloadFile.style.cursor = "pointer";
        divDownloadFile.id = "divDownLoadFile";
        var p = document.createElement("p");
        p.style.color = '#1877f2';
        p.style.margin = "0";
        p.innerHTML = listOthersFileName[i];
        var i1 = document.createElement("i");
        i1.classList = "bi bi-download";
        divDownloadFile.appendChild(p);
        divDownloadFile.appendChild(i1);
        divOthersFile.appendChild(divDownloadFile);
    }
    return divOthersFile;
}

// function create divImgAndVideo
function createDivNumberLikeAndComment(numberOfLikes, numberOfComments, numberOfShares){
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
    pComments.textContent = numberOfComments + " comments,";

    // Create the p element for shares
    var pShares = document.createElement('p');
    pShares.textContent = numberOfShares + " shares";

    // Append the p elements to the comments and shares div
    divCommentAndShare.appendChild(pComments);
    divCommentAndShare.appendChild(pShares);

    // Append the comments and shares div to the main div
    divNumberLikeAndComment.appendChild(divCommentAndShare);

    return divNumberLikeAndComment;
}

function createDivLine(){
    var divLine = document.createElement("div");
    divLine.className = "divLine";
    return divLine;
}

function createDivLikeCommentShareChild(){
    // Create the main div element
    var divLikeCommentShare = document.createElement('div');
    divLikeCommentShare.className = 'divLikeCommentShare';

    var divLike = createIconLike();

    // Create the comment div
    var divComment = createChildDiv('divComment', {backgroundPosition: '0px -529px'}, 'Comment');

    // Create the share div
    var divShare = createChildDiv('divShare', {backgroundPosition: '0px -865px'}, 'Share');

    // Append the child divs to the main div
    divLikeCommentShare.appendChild(divLike);
    divLikeCommentShare.appendChild(divComment);
    divLikeCommentShare.appendChild(divShare);
    
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

function createIconLike(){
    var divChild = document.createElement('div');
    divChild.className = 'divLike divLikeCommentShareChild1';
    divChild.style.display = "flex";
    divChild.style.gap = "5px"
    divChild.style.alignItem = "center";
    divChild.style.cursor = "pointer";

    var icon = document.createElement('i');
    icon.className = "bi bi-hand-thumbs-up";
    icon.style.fontSize = "20px";
    icon.style.color = "gray";

    var p = document.createElement('p');
    p.textContent = 'Like';
    p.style.margin = "0"
    p.style.color = "gray";

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
function createDivImgAndVideo(firstImgOrVideoSrc, numberOfFile, type){
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
    
    if (numberOfFile > 0){
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
        pNumberOfImgOrVideo.style.left = '40%';
        pNumberOfImgOrVideo.id = 'pNumberOfImgOrVideo';
        pNumberOfImgOrVideo.textContent = numberOfFile + "+";
        divImg.appendChild(pNumberOfImgOrVideo);
        divImg.appendChild(divBlurImg);
    }
    
    // Append the img, divBlurImg, and p elements to the divImg
    divImg.appendChild(img);

    return divImg;
}

// function create Post
function createDivPost(postUserId, postUserName, postTime, scope, postCaption, listUserName, listOthersFileName, 
    firstImgOrVideoFileName, typeOfFirstImgOrVideoFile, numberOfImgOrVideo, numberOfLikes, numberOfComments, 
    numberOfShares){

    var divPost = document.createElement("div");
    divPost.className = "divPost";
    document.querySelector("body > .divPost div.divMain").appendChild(divPost);
    divPost.appendChild(createDivPostHeader("../FileUser/Image/" + postUserId + "/avatar.jpg",
                                postUserName,
                                formatDate(postTime),
                                scope
                                ));

    if (postCaption != null){
    divPost.appendChild(createDivCaption(postCaption));
    }

    if (listUserName != null){
    divPost.appendChild(createDivTagedFriend(listUserName));
    }

    if (listOthersFileName != []){
    divPost.appendChild(createDivOthersFile(listOthersFileName));
    }

    console.log(objectPostInfo.fileIdImgOrVideo.length);
    if (objectPostInfo.fileIdImgOrVideo.length != 0){
        var type = 'Image';
        if (typeOfFirstImgOrVideoFile == 'Video'){
            type = 'Video'
        }
        divPost.appendChild(createDivImgAndVideo("../FileUser/" + type + "/" + postUserId + "/" + firstImgOrVideoFileName
                                        , numberOfImgOrVideo, type
                                        ));
    }

    divPost.appendChild(createSettingPost());

    divPost.appendChild(createDivNumberLikeAndComment(numberOfLikes, numberOfComments, numberOfShares));

    divPost.appendChild(createDivLikeCommentShareChild());

    displaySettingPost();
    arrayDivLike = document.querySelectorAll("body > div > div.divMain > div > div.divLikeCommentShare > div.divLike.divLikeCommentShareChild1");
    for (let i = 0; i < arrayDivLike.length; i++){
        arrayDivLike[i].addEventListener("click", () => 
            {
                var postId = objectPostInfo.id;
                var iLike = arrayDivLike[i].querySelector("i");
                var p = arrayDivLike[i].querySelector("p");
                if (iLike.className == 'bi bi-hand-thumbs-up'){
                    changeStyleAndClassLiked(iLike, p);
                    likePost(postId);
                }
                else{
                    deleteLikePost(postId);
                    changeStyleAndClassNormalLike(iLike, p);
                }
            }
        )
    }

    eventForTagedFriend();
    eventForOthersFile();
    changingToUserUploadPost();
    eventDisplayImgOrVideoInPost();
    displayComment();
    accessToComment();
    deletePost();
    coppyLink();
    updatePost();
}



function createSettingPost(){
    const divSettingPost = document.createElement('div');
    divSettingPost.className = 'divSettingPost';
    const divCopyLink = createSubDiv('fa-solid fa-copy', 'Copy link');
    divCopyLink.className = 'divCopyLink';

    const divDelete = createSubDiv('fa-solid fa-trash', 'Delete Post');
    divDelete.className = 'divDelete';

    const divEdit = createSubDiv('fa-regular fa-pen-to-square', 'Edit Post');
    divEdit.className = 'divEdit';

    divSettingPost.appendChild(divCopyLink);
    divSettingPost.appendChild(divDelete);
    divSettingPost.appendChild(divEdit);

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

// function display setting post 
function displaySettingPost(){
    var iSettingPost = document.querySelector("body > div > div.divMain > div > div.divPostHeader > i");
    var divSettingPost = document.querySelector("body > .divPost div.divMain > div > div.divSettingPost");
    iSettingPost.addEventListener("click", () => 
        {
            if (getDisplayStyle(divSettingPost) == "none"){
                divSettingPost.style.display = "flex";
            }
            else{
                divSettingPost.style.display = "none";
            }
        }
    )
}

// function event for p TagedFriend
function eventForTagedFriend(){
    var arrayDivPost = document.querySelectorAll("body > div > div.divMain > div");
    for (let i = 0; i < arrayDivPost.length; i++){
        var arrayPDivPost = arrayDivPost[i].querySelectorAll(".divTagedFriend p");
        for (let j = 0; j < arrayPDivPost.length; j++){
            arrayPDivPost[j].addEventListener("click", () => 
                {
                    window.location = "http://localhost:8080/FriendZone?id=" + objectPostInfo.idTagedUser[j];
                }
            )
        }
    }
}

// function event for download others file
function eventForOthersFile(){
    var arrayDivPost = document.querySelectorAll("body > div > div.divMain > div");
    for (let i = 0; i < arrayDivPost.length; i++){
        var arrayPDivPost = arrayDivPost[i].querySelectorAll(".divOthersFile #divDownloadFile");
        for (let j = 0; j < arrayPDivPost.length; j++){
            arrayPDivPost[j].addEventListener("click", () => 
                {
                    downloadFile(objectPostInfo.fileIdOther[j], objectPostInfo.tailOfOthersFile[j], objectPostInfo.fileNameOther[j], objectPostInfo.userId)
                }
            )
        }
    }
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

// event for changing to user upload post
function changingToUserUploadPost(){
    var pUserName = document.querySelector("body > div > div.divMain > div > div.divPostHeader > div > div > p");
    pUserName.style.cursor = "pointer";
    pUserName.addEventListener("mouseenter", () => 
        {
            pUserName.style.textDecoration = "underline";
        }
    )
    pUserName.addEventListener("mouseout", () => 
        {
            pUserName.style.textDecoration = "none";
        }
    )
    pUserName.addEventListener("click", () => 
        {
            window.location = "http://localhost:8080/FriendZone?id=" + objectPostInfo.userId;
        }
    )
}

// function display comment.
function displayComment(){
    var arrayDisplayComment = document.querySelectorAll("body > div > div.divMain > div > div.divLikeCommentShare > div.divComment.divLikeCommentShareChild");
    for (let i = 0; i < arrayDisplayComment.length; i++){
        arrayDisplayComment[i].addEventListener("click", () => 
            {
                divBlurBox.style.display = "block";
                divComment.style.transform = "scale(1)";
                flagDisplayComment = 1;
                currentPostIdComment = objectPostInfo.id;
                currentIndexOfPost = i;
                getCommentInPost(currentPostIdComment);
                setDataForDivComment(objectPostInfo.userName);
                displayTagFriend();
            }
        )
    }
}

function coppyLink(){
    var arrayCoppyLink = document.querySelectorAll("body > div > div.divMain > div > div.divSettingPost > div.divCopyLink");
    for (let i = 0; i < arrayCoppyLink.length; i++){
        arrayCoppyLink[i].addEventListener("click", () => 
            {
                navigator.clipboard.writeText("http://localhost:8080/FriendZone/postDetail?postId=" + objectPostInfo.id);
                showToast("Copied link successfully!");
            }
        )
    }
}

function updatePost(){
    var arrayUpdatePost = document.querySelectorAll("body > div > div.divMain > div > div.divSettingPost > div.divEdit")
    for (let i = 0; i < arrayUpdatePost.length; i++){
        arrayUpdatePost[i].addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone?updatePost=1&postId=" + objectPostInfo.id;
            }
        )
    }
}

function deletePost(){
    var arrayDivPost = document.querySelectorAll("body > div > div.divMain > div");
    var arrayDeletePost = document.querySelectorAll("body > div > div.divMain > div > div.divSettingPost > div.divDelete");
    for (let i = 0; i < arrayDeletePost.length; i++){
        arrayDeletePost[i].addEventListener("click", () => 
            {
                const userConfirmed = confirm('Do you want to delete this post!');
                if (userConfirmed) {
                    sendRequestDeletePost(objectPostInfo.id, arrayDivPost[i]);
                } else {
                    //alert('You clicked Cancel.');
                }
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
            window.location = "http://localhost:8080/FriendZone";
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}