divInputCreatePost.addEventListener("click", () => 
{
    divBlur.style.display = "block";
    divCreatePostBox.style.transform = "scale(1)";
}
)

iTurnOffCreatePostBox.addEventListener("click", () =>
{
    divBlur.style.display = "none";
    divCreatePostBox.style.transform = "scale(0)";
}
)

inputAnonymous.addEventListener("click", () => 
{
    if (flagInputAnonymous == 0){
        flagInputAnonymous = 1;
        imgUserInCreatePost.src = "../Img/Anonymous.png";
        pName.textContent = "Anonymous member";
    }
    else{
        flagInputAnonymous = 0;
        imgUserInCreatePost.src = "../FileUser/Image/" + idOfUserRequest + "/avatar.jpg";
        pName.textContent = userName;
    }
}
)

function createRequestParamFromMapFile(formData){
    for (let [key, value] of mapFileUploadInPost) {
        formData.append("files", value);   
    }
}

function createRequestParamFromMapTagUser(formData){
    for (let [key, value] of mapTagFriendInPost2) {
        formData.append("listIdTaged", key);   
    }
}

function createRequestParam(formData){
    createRequestParamFromMapFile(formData);
    formData.append("anonymous", flagInputAnonymous);
    formData.append("caption", textAreaInCreatePost.value);
    createRequestParamFromMapTagUser(formData);
    formData.append("groupId", getParam("groupId"));
}

function resetValue(){
    flagInputAnonymous = 0;
    textAreaInCreatePost.value = "";
    mapFileUploadInPost = new Map();
    mapTagFriendInPost1 = new Map();
    mapTagFriendInPost2 = new Map();
}

// event for clicking create post
function eventForClickingCreatePost(){
    const form = new FormData();
    createRequestParam(form);
    const token = getCookie("jwtToken");
    fetch('/handleGroup/createPost', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: form
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
       console.log(data1);
       document.querySelector(".divContainSpinner").style.display = "flex";
        document.querySelector("#pTextSpinner").innerHTML = "Create post successfully!";
        setTimeout(function() {
            location.reload();
        }, 1000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

buttonCreatePost.addEventListener("click", () => 
{
    eventForClickingCreatePost();
}
)