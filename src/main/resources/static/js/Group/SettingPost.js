function displayEditPostBox(caption, anonymous){
    divCreatePostBox.style.zIndex = '107';
    divCreatePostBox.style.maxHeight = "95vh";
    divCreatePostBox.style.maxHeight = "1vh";
    document.querySelector("#pTitleCreatePost").innerHTML = "Update Post";
    textAreaInCreatePost.value = caption;
    if (anonymous == 1){
        imgUserInCreatePost.src = ""
    }
}