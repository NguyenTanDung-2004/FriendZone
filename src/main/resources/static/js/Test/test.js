var count = 0;
var img = document.querySelector("#divDisplayImg img");
var video = document.querySelector("#divDisplayImg video")


var listLinkImgOrVideo = [
    "https://th.bing.com/th/id/OIP.cRT6RCVvwHTayfPtBx1GOAHaE8?w=254&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    "https://th.bing.com/th/id/OIP.2TumufLJYnKvtmU6UMWe6wHaE8?w=221&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    "https://th.bing.com/th/id/OIP.5GTmrS7wdpmF5icrLgdNwAHaEV?w=305&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7",
    "http://localhost:8080/FileUser/Video/4c34d6c1-08db-40df-9b5d-912758de2119/036d6dd5-f70f-4075-af90-11a02944b7da.mp4"

]

var listTypeOfVideo = [
    "img", "img", "img", "video"
]

var iLeftToRight = document.querySelector("#iLeftToRight");
var iRightToLeft = document.querySelector("#iRightToLeft");
var iCloseDisplayImg = document.querySelector("#iCloseDisplayImg");

iLeftToRight.addEventListener("click", () =>
    {
        if (count < listLinkImgOrVideo.length - 1){
            count++;
            if (listTypeOfVideo[count] == "img"){
                video.style.display = "none"
                img.style.display = "block"
                img.src = listLinkImgOrVideo[count];
                video.pause();
            }
            else{
                img.style.display = "none"
                video.style.display = "block"
                video.src = listLinkImgOrVideo[count];
            }
        }
    }
)

iRightToLeft.addEventListener("click", () => 
    {
        if (count > 0){
            count--;
            if (listTypeOfVideo[count] == "img"){
                video.style.display = "none"
                img.style.display = "block"
                img.src = listLinkImgOrVideo[count];
                video.pause();
            }
            else{
                img.style.display = "none"
                video.style.display = "block"
                video.src = listLinkImgOrVideo[count];
            }
        }
    }   
)

iCloseDisplayImg.addEventListener("click", () => 
    {
        document.querySelector("#divDisplayImg").style.display = "none"
    }
)