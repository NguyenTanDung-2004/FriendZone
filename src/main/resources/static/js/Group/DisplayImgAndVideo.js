
iLeftToRight.addEventListener("click", () =>
    {
        if (count < listLinkImgOrVideo.length - 1){
            count++;
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
        listLinkImgOrVideo = [];
        listTypeOfFile = [];
    }
)