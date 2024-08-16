// event for clicking imgAddFileToPost
imgAddFileToPost.addEventListener("click", () => 
    {
        inputUploadFileInPost.click();
    }
)

// event for changing status of inputUploadFileInPost
inputUploadFileInPost.addEventListener("change", (e) => 
    {
        var files = e.target.files;
        for (var i = 0; i < files.length; i++){
            if (mapFileInPost.get(files[i].name) != 1){
                mapFileInPost.set(files[i].name, 1);
                listFileInPost.push(files[i]);
                addDataToDivContainImgVideo(files[i].name);
            }
        }
        var iDeleteFile = document.querySelectorAll("#iDeleteFile");
        var divFile = document.querySelectorAll("#divCreatePostBox > div.divContainImgVideo > div.divFile");
        for (let i = 0; i < iDeleteFile.length; i++){
            iDeleteFile[i].addEventListener("click", () => 
                {
                    divFile[i].style.display = "none";
                    mapFileInPost.delete(listFileInPost[i].name);
                    listFileInPost[i] = '';
                }
            )
        }
    }
)



// event add data to divContainImgVideo in Post
function addDataToDivContainImgVideo(fileName){
    let element = '<div class="divFile" style="display:flex; justify-content: space-between,padding: 5px 5px;background-color: #e4e6eb;width: fit-content;max-height: 40px;border-radius: 8px;color: gray; display: flex; flex-wrap: nowrap;">' + fileName + `<i style="padding: 5px 8px; background-color: white; border-radius: 50%;" id="iDeleteFile" class="fa-solid fa-xmark"></i>` + '</div>';
    divContainImgVideo.innerHTML = divContainImgVideo.innerHTML + element;
}