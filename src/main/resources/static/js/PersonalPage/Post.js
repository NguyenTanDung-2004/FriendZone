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
            formData.append('listIdTaged', listFriendId[i]);
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
            //window.location = "http://localhost:8080/FriendZone";
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

// function create Post
function createDivPost(postUserId, postUserName, postTime, scope, postCaption, listUserName, listOthersFileName, 
                    firstImgOrVideoFileName, typeOfFirstImgOrVideoFile, numberOfImgOrVideo, numberOfLikes, numberOfComments, 
                    numberOfShares, index){

    var divPost = document.createElement("div");
    divPost.className = "divPost " + objectPostInfo[index].id;
    document.querySelector("body > div.divMain > div.divMain1 > div.divRight1").appendChild(divPost);
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

    console.log(objectPostInfo[index].fileIdImgOrVideo.length);
    if (objectPostInfo[index].fileIdImgOrVideo.length != 0){
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

    divPost.appendChild(createDivLikeCommentShareChild(index));

    
}

//function create div post share
function createDivPostShare(postUserId, postUserName, postTime, scope, postCaption, listUserName, listOthersFileName, 
                            firstImgOrVideoFileName, typeOfFirstImgOrVideoFile, numberOfImgOrVideo, numberOfLikes, numberOfComments, 
                            numberOfShares, index, sharedUserName, sharedUserId, sharedPostId){

    var divPost = document.createElement("div");
    divPost.className = "divPost " + objectPostInfo[index].id;
    document.querySelector("body > div.divMain > div.divMain1 > div.divRight1").appendChild(divPost);
    divPost.appendChild(createDivPostHeaderShare("../FileUser/Image/" + postUserId + "/avatar.jpg",
                            postUserName,
                            formatDate(postTime),
                            scope,
                            sharedUserName,
                            sharedUserId
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

    divPost.appendChild(createDivViewOriginalPost(sharedPostId));

    console.log(objectPostInfo[index].fileIdImgOrVideo.length);
    if (objectPostInfo[index].fileIdImgOrVideo.length != 0){
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

    divPost.appendChild(createDivLikeCommentShareChild(index));
}
// createDivPost('4c34d6c1-08db-40df-9b5d-912758de2119', 'Nguyễn Dũng 1', '2024-07-13T14:43:00', 2, '1234asdfasdf😄😀🤣😊',
//     [
//         "Nguyễn Dũng3",
//         "Nguyễn Dũng2"
//     ], [
//         "NguyenTanDung_BackendJavaIntern.pdf",
//         "NguyenTanDung_BackendJavaIntern.pdf",
//         "NguyenTanDung_BackendJavaIntern.pdf"
//     ], 'ece2dade-491b-4177-8b08-0da5e4810cb7.jpg',
//     'C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static/FileUser/Image',
//     10, 10, 10, 10
//             );

// function create Post
function createPostFromObjectPostInfo(){
    for (let i = 0; i < objectPostInfo.length; i++){
        console.log(objectPostInfo[i]);
        if (objectPostInfo[i].sharedPostId == null){
            createDivPost(objectPostInfo[i].userId, objectPostInfo[i].userName, objectPostInfo[i].time, objectPostInfo[i].scope,
                objectPostInfo[i].caption, objectPostInfo[i].nameTagedUser, objectPostInfo[i].fileNameOther, 
                objectPostInfo[i].fileIdImgOrVideo[0] + objectPostInfo[i].tailOfFile[0], checkFilesVideoOrImage('abc' + objectPostInfo[i].tailOfFile[0]),
                objectPostInfo[i].fileIdImgOrVideo.length - 1, objectPostInfo[i].numberOfLikes, objectPostInfo[i].numberOfComments, 
                objectPostInfo[i].numberOfShares, i
            );
        }
        else{
            createDivPostShare(objectPostInfo[i].userId, objectPostInfo[i].userName, objectPostInfo[i].time, objectPostInfo[i].scope,
                objectPostInfo[i].caption, objectPostInfo[i].nameTagedUser, objectPostInfo[i].fileNameOther, 
                objectPostInfo[i].fileIdImgOrVideo[0] + objectPostInfo[i].tailOfFile[0], checkFilesVideoOrImage('abc' + objectPostInfo[i].tailOfFile[0]),
                objectPostInfo[i].fileIdImgOrVideo.length - 1, objectPostInfo[i].numberOfLikes, objectPostInfo[i].numberOfComments, 
                objectPostInfo[i].numberOfShares, i, objectPostInfo[i].sharedUserName, objectPostInfo[i].sharedUserId,
                objectPostInfo[i].sharedPostId
            );
        }
    }
    arrayDivLike = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divLikeCommentShare > div.divLike.divLikeCommentShareChild1");
    for (let i = 0; i < arrayDivLike.length; i++){
        arrayDivLike[i].addEventListener("click", () => 
            {
                var postId = objectPostInfo[i].id;
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
    eventDisplayImgOrVideoInPost();
    displaySettingPost();
    coppyLink();
    updatePost();
    deletePost();
    displayComment();
    displayUpdatePostFromPostDetail();
}


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

    if (getParam("id") == ""){
        // Create the i element for the edit post icon
        var iEditPost = document.createElement('i');
        iEditPost.className = 'fa-solid fa-ellipsis editPost';

        // Append the edit post icon to the main div
        divPostHeader.appendChild(iEditPost);
    }

    return divPostHeader;
}

// function create divPostHeaderShare
function createDivPostHeaderShare(imgSrc, nameUser, formattedTime, scope,  sharedUserName, sharedUserId){
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

    var span1 = document.createElement("span");
    span1.innerHTML = " shared "
    span1.style.fontWeight = "500";

    var span2 = document.createElement("span");
    span2.innerHTML = sharedUserName + "'s";
    span2.style.cursor = "pointer";
    span2.addEventListener("mouseenter", () => 
    {
        span2.style.textDecoration = "underline";
    }
    )
    span2.addEventListener("mouseout", () => 
    {
        span2.style.textDecoration = "none";
    }
    )
    span2.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone?id=" + sharedUserId;
    }
    )

    var span3 = document.createElement("span");
    span3.innerHTML = " post.";
    span3.style.fontWeight = "500";

    pNameUser.appendChild(span1);
    pNameUser.appendChild(span2);
    pNameUser.appendChild(span3);

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

    if (getParam("id") == ""){
        // Create the i element for the edit post icon
        var iEditPost = document.createElement('i');
        iEditPost.className = 'fa-solid fa-ellipsis editPost';

        // Append the edit post icon to the main div
        divPostHeader.appendChild(iEditPost);
    }

    return divPostHeader;
}

//function divViewOriginalPost
function createDivViewOriginalPost(sharedPostId){
    var div = document.createElement("div");
    div.className = "divViewOriginalPost";
    div.innerHTML = "View this original post.";
    div.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone/postDetail?postId=" + sharedPostId;
    }
    )
    return div;
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

function createDivLikeCommentShareChild(index){
    // Create the main div element
    var divLikeCommentShare = document.createElement('div');
    divLikeCommentShare.className = 'divLikeCommentShare';

    var divLike = createIconLike();

    // Create the comment div
    var divComment = createChildDiv('divComment', {backgroundPosition: '0px -529px'}, 'Comment');

    // Create the share div
    var divShare = createChildDiv('divShare', {backgroundPosition: '0px -865px'}, 'Share');

    divShare.addEventListener("click", () => 
    {
        imgAddFileToPost.style.pointerEvents = "none";
        imgAddFileToPost.style.opacity = "0.5";
        document.querySelector("body > div.divMain > div.divMain1 > div.divRight1 > div.divCreatePost > div").click();
        divButtonPost.innerHTML = "Share";
        currentIndexPostInSharedPost = index;
        console.log(currentIndexPostInSharedPost);
    }
    )

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

// function get Post
function getPost(){
    const token = getCookie("jwtToken");
    const urlId = getParam("id");
    fetch('/user/getPost?urlId=' + urlId, {
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
        objectPostInfo = data1.object;
        console.log(objectPostInfo);
        createPostFromObjectPostInfo();
        getListLikePost();
        getListLiked()
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
getPost();

// function event for p TagedFriend
function eventForTagedFriend(){
    var arrayDivPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost");
    for (let i = 0; i < arrayDivPost.length; i++){
        var arrayPDivPost = arrayDivPost[i].querySelectorAll(".divTagedFriend p");
        for (let j = 0; j < arrayPDivPost.length; j++){
            arrayPDivPost[j].addEventListener("click", () => 
                {
                    window.location = "http://localhost:8080/FriendZone?id=" + objectPostInfo[i].idTagedUser[j];
                }
            )
        }
    }
}

// function event for download others file
function eventForOthersFile(){
    var arrayDivPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost");
    for (let i = 0; i < arrayDivPost.length; i++){
        var arrayPDivPost = arrayDivPost[i].querySelectorAll(".divOthersFile #divDownloadFile");
        for (let j = 0; j < arrayPDivPost.length; j++){
            arrayPDivPost[j].addEventListener("click", () => 
                {
                    downloadFile(objectPostInfo[i].fileIdOther[j], objectPostInfo[i].tailOfOthersFile[j], objectPostInfo[i].fileNameOther[j], objectPostInfo[i].userId);
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

// function event display img or video
function eventDisplayImgOrVideoInPost(){
    var arrayDivPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost");
    for (let i = 0; i < arrayDivPost.length; i++){
        var divBlurImg = arrayDivPost[i].querySelector("#divBlurImg");
        if (divBlurImg != null){
            divBlurImg.addEventListener("click", () => 
                {
                    var userId = objectPostInfo[i].userId;
                    var img = arrayDivPost[i].querySelector('.divImg img');
                    var video = arrayDivPost[i].querySelector('.divImg video');
                    listTypeOfFile = [];
                    for (var j = 0; j < objectPostInfo[i].tailOfFile.length; j++){
                        listTypeOfFile.push(objectPostInfo[i].tailOfFile[j]);
                        listTypeOfFile[j] = checkFilesVideoOrImage(listTypeOfFile[j]);
                    }
                    listLinkImgOrVideo = [];
                    for (var j = 0; j < objectPostInfo[i].fileIdImgOrVideo.length; j++){
                        listLinkImgOrVideo.push(objectPostInfo[i].fileIdImgOrVideo[j])
                        listLinkImgOrVideo[j] = "../FileUser/" + listTypeOfFile[j] + "/" + userId + "/" 
                                            + listLinkImgOrVideo[j] + objectPostInfo[i].tailOfFile[j];
                    }
                    console.log(listLinkImgOrVideo);
                    if (img != null){
                        imgDisplay.style.display = "block";
                        imgDisplay.src = img.src;
                        videoDisplay.style.display = "none";
                    }
                    else{
                        imgDisplay.style.display = "none";
                        videoDisplay.src = video.src;
                        videoDisplay.style.display = "block"
                    }
                    divDisplayImgAndVideo.style.display = "flex";
                }
            )
        }
    }
}

// function create setting post
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
    var arrayISettingPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divPostHeader > i");
    var arrayDivSettingPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divSettingPost");
    for (let i = 0; i < arrayISettingPost.length; i++){
        arrayISettingPost[i].addEventListener("click", () => 
            {
                if (getDisplayStyle(arrayDivSettingPost[i]) == "none"){
                    arrayDivSettingPost[i].style.display = "flex";
                }
                else{
                    arrayDivSettingPost[i].style.display = "none";
                }
            }
        )
    }
}

function coppyLink(){
    var arrayCoppyLink = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divSettingPost > div.divCopyLink");
    for (let i = 0; i < arrayCoppyLink.length; i++){
        arrayCoppyLink[i].addEventListener("click", () => 
            {
                navigator.clipboard.writeText("http://localhost:8080/FriendZone/postDetail?postId=" + objectPostInfo[i].id);
                showToast("Copied link successfully!");
            }
        )
    }
}

function updatePost(){
    var arrayUpdatePost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divSettingPost > div.divEdit")
    for (let i = 0; i < arrayUpdatePost.length; i++){
        arrayUpdatePost[i].addEventListener("click", () => 
            {
                var divSettingPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divSettingPost");
                divSettingPost[i].style.display = "none";
                divCreatePostBox.style.transform = "scale(1)";
                currentPostIdUpdate = objectPostInfo[i].id;
                setDataForCreatePost(objectPostInfo[i].scope, objectPostInfo[i].caption);
            }
        )
    }
}

function deletePost(){
    var arrayDivPost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost");
    var arrayDeletePost = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divSettingPost > div.divDelete");
    for (let i = 0; i < arrayDeletePost.length; i++){
        arrayDeletePost[i].addEventListener("click", () => 
            {
                const userConfirmed = confirm('Do you want to delete this post!');
                if (userConfirmed) {
                    sendRequestDeletePost(objectPostInfo[i].id, arrayDivPost[i]);
                } else {
                    //alert('You clicked Cancel.');
                }
            }
        )
    }
}

function displayComment(){
    var arrayDisplayComment = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divLikeCommentShare > div.divComment.divLikeCommentShareChild");
    for (let i = 0; i < arrayDisplayComment.length; i++){
        arrayDisplayComment[i].addEventListener("click", () => 
            {
                divBlurBox.style.display = "block";
                divComment.style.transform = "scale(1)";
                flagDisplayComment = 1;
                currentPostIdComment = objectPostInfo[i].id;
                currentIndexOfPost = i;
                getCommentInPost(currentPostIdComment);
                setDataForDivComment(objectPostInfo[i].userName);
                displayTagFriend();
            }
        )
    }
}