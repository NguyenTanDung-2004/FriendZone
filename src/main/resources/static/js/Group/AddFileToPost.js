// create element to show that file selection was successful.
function createElementToShowThatFileSelectionWasSuccessfull(file){
    let element = document.createElement('div');
    element.className = 'divFile';
    element.style.display = 'flex';
    element.style.justifyContent = 'space-between';
    element.style.padding = '5px 5px';
    element.style.backgroundColor = '#e4e6eb';
    element.style.width = 'fit-content';
    element.style.maxHeight = '40px';
    element.style.borderRadius = '8px';
    element.style.color = 'gray';
    element.style.flexWrap = 'nowrap';

    let fileNameText = document.createTextNode(file.name);
    element.appendChild(fileNameText);

    let deleteIcon = document.createElement('i');
    deleteIcon.style.padding = '5px 8px';
    deleteIcon.style.backgroundColor = 'white';
    deleteIcon.style.borderRadius = '50%';
    deleteIcon.id = 'iDeleteFile';
    deleteIcon.className = 'fa-solid fa-xmark';

    element.appendChild(deleteIcon);

    divContainImgVideo.appendChild(element);

    // add element to mapFileInPost
    mapFileUploadInPost.set(deleteIcon, file);
    
    // event for deleteIcon
    deleteIcon.addEventListener("click", () => 
    {
        mapFileUploadInPost.delete(deleteIcon);
        element.remove();
    }
    )
}

// event for clicking imgUploadFileInPost
imgUploadFileInPost.addEventListener("click", () => 
{
    inputUploadFileInPost.click();
}
)

// envet for status chance of inputUploadFileInPost
inputUploadFileInPost.addEventListener("change", (e) => 
{
    for (var i = 0; i < e.target.files.length; i++){
        createElementToShowThatFileSelectionWasSuccessfull(e.target.files[i]);
    }
}
)


