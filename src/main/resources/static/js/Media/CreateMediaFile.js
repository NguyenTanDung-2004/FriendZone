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
        createData();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getPost();

function createData(){
    for (var i = 0; i < allPostInGroup.length; i++){
        for (var j = 0; j < allPostInGroup[i].fileNameImgOrVideo.length; j++){
            listPostId.push(allPostInGroup[i].id);
            var typeOfFile = checkFilesVideoOrImage(allPostInGroup[i].fileNameImgOrVideo[j]);
            listTypeOfFile.push(typeOfFile);
            listFileName.push("../FileUser/" + typeOfFile + "/" + allPostInGroup[i].userId + "/" + allPostInGroup[i].fileIdImgOrVideo[j] + allPostInGroup[i].tailOfFile[j]);
        }
    }

    for (let i = 0; i < listFileName.length; i++){
        if (listTypeOfFile[i] == "Image"){
            var img = document.createElement("img");
            img.src = listFileName[i];
            divMain.appendChild(img);
            img.addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone/group?groupId=" + getParam("groupId") + "&action=scrollToPost&postId=" + listPostId[i];
            }
            )
        }
        else{
            var video = document.createElement("video");
            video.src = listFileName[i];
            divMain.appendChild(img);
            video.addEventListener("click", () => 
            {
                window.location = "http://localhost:8080/FriendZone/group?groupId=" + getParam("groupId") + "&action=scrollToPost&postId=" + listPostId[i];
            }
            )
        }
    }
}

imgUser.addEventListener("click", () => 
{
    window.location = "http://localhost:8080/FriendZone/group?groupId=" + getParam("groupId");
}
)