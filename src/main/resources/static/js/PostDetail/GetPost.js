function getPost(){
    const token = getCookie("jwtToken");
    const postId = getParam("postId");
    fetch('/post/getPost?postId=' + postId, {
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
        objectPostInfo = data1;
        console.log(objectPostInfo);
        createDivPost(objectPostInfo.userId, objectPostInfo.userName, objectPostInfo.time, objectPostInfo.scope,
            objectPostInfo.caption, objectPostInfo.nameTagedUser, objectPostInfo.fileNameOther, 
            objectPostInfo.fileIdImgOrVideo[0] + objectPostInfo.tailOfFile[0], checkFilesVideoOrImage('abc' + objectPostInfo.tailOfFile[0]),
            objectPostInfo.fileIdImgOrVideo.length - 1, objectPostInfo.numberOfLikes, objectPostInfo.numberOfComments, 
            objectPostInfo.numberOfShares
        );
        getListLiked();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getPost();