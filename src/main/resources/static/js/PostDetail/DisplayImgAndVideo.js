// function event display img or video
function eventDisplayImgOrVideoInPost(){
    var arrayDivPost = document.querySelectorAll("body > div.divMain > div.divPost");
    for (let i = 0; i < arrayDivPost.length; i++){
        var divBlurImg = arrayDivPost[i].querySelector("#divBlurImg");
        if (divBlurImg != null){
            divBlurImg.addEventListener("click", () => 
                {
                    var userId = objectPostInfo.userId;
                    var img = arrayDivPost[i].querySelector('.divImg img');
                    var video = arrayDivPost[i].querySelector('.divImg video');
                    listTypeOfFile = [];
                    for (var j = 0; j < objectPostInfo.tailOfFile.length; j++){
                        listTypeOfFile.push(objectPostInfo.tailOfFile[j]);
                        listTypeOfFile[j] = checkFilesVideoOrImage(listTypeOfFile[j]);
                    }
                    listLinkImgOrVideo = [];
                    for (var j = 0; j < objectPostInfo.fileIdImgOrVideo.length; j++){
                        listLinkImgOrVideo.push(objectPostInfo.fileIdImgOrVideo[j])
                        listLinkImgOrVideo[j] = "../FileUser/" + listTypeOfFile[j] + "/" + userId + "/" 
                                            + listLinkImgOrVideo[j] + objectPostInfo.tailOfFile[j];
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


iLeftToRight.addEventListener("click", () =>
    {
        if (count < listLinkImgOrVideo.length - 1){
            count++;
            console.log(listTypeOfFile[count]);
            if (listTypeOfFile[count] == "Image"){
                videoDisplay.style.display = "none"
                imgDisplay.style.display = "block"
                imgDisplay.src = listLinkImgOrVideo[count];
                videoDisplay.pause();
            }
            else{
                imgDisplay.style.display = "none"
                videoDisplay.style.display = "block"
                videoDisplay.src = listLinkImgOrVideo[count];
                videoDisplay.controls = true;
            }
        }
    }
)

iRightToLeft.addEventListener("click", () => 
    {
        if (count > 0){
            count--;
            if (listTypeOfFile[count] == "Image"){
                videoDisplay.style.display = "none"
                imgDisplay.style.display = "block"
                imgDisplay.src = listLinkImgOrVideo[count];
                videoDisplay.pause();
            }
            else{
                imgDisplay.style.display = "none"
                videoDisplay.style.display = "block"
                videoDisplay.src = listLinkImgOrVideo[count];
            }
        }
    }   
)

iCloseDisplayImg.addEventListener("click", () => 
    {
        document.querySelector("#divDisplayImg").style.display = "none"
        count = 0;
        videoDisplay.pause();
    }
)

// function event display img or video
function eventDisplayImgOrVideoInPost(){
    var arrayDivPost = document.querySelectorAll("body > div > div.divMain > div");
    for (let i = 0; i < arrayDivPost.length; i++){
        var divBlurImg = arrayDivPost[i].querySelector("#divBlurImg");
        if (divBlurImg != null){
            divBlurImg.addEventListener("click", () => 
                {
                    var userId = objectPostInfo.userId;
                    var img = arrayDivPost[i].querySelector('.divImg img');
                    var video = arrayDivPost[i].querySelector('.divImg video');
                    listTypeOfFile = [];
                    for (var j = 0; j < objectPostInfo.tailOfFile.length; j++){
                        listTypeOfFile.push(objectPostInfo.tailOfFile[j]);
                        listTypeOfFile[j] = checkFilesVideoOrImage(listTypeOfFile[j]);
                    }
                    listLinkImgOrVideo = [];
                    for (var j = 0; j < objectPostInfo.fileIdImgOrVideo.length; j++){
                        listLinkImgOrVideo.push(objectPostInfo.fileIdImgOrVideo[j])
                        listLinkImgOrVideo[j] = "../FileUser/" + listTypeOfFile[j] + "/" + userId + "/" 
                                            + listLinkImgOrVideo[j] + objectPostInfo.tailOfFile[j];
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