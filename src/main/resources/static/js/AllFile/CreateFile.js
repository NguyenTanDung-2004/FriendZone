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
        allPost = data1.object;
        console.log(allPost);
        createAllPost();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getPost();

function create1Post(listFileId, listFileName, listTail, userId, postId){
    if (listFileId.length > 0){
        // create div1Post
        var div1Post = document.createElement("div");
        div1Post.className = "div1Post";
        divMain.appendChild(div1Post);

        // create file
        for (let i = 0; i < listFileId.length; i++){
            var pFile = document.createElement("p");
            pFile.className = "pFile";
            pFile.textContent = listFileName[i];
            pFile.addEventListener("click", () => 
            {
                downloadFile(listFileId[i], listTail[i], listFileName[i], userId);
            }
            )
            div1Post.appendChild(pFile);
        }

        // create button
        var pSeePost = document.createElement("p");
        pSeePost.className = "pSeePost";
        pSeePost.textContent = "See this post"
        var groupId = getParam("groupId");
        pSeePost.addEventListener("click", () => 
        {
            window.location = "http://localhost:8080/FriendZone/group?groupId=" + groupId + "&action=scrollToPost&postId=" + postId;
        }
        )
        div1Post.appendChild(pSeePost);
    }
}

function createAllPost(){
    for (var i = 0; i < allPost.length; i++){
        create1Post(allPost[i].fileIdOther, allPost[i].fileNameOther, allPost[i].tailOfOthersFile, allPost[i].userId, allPost[i].id);
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