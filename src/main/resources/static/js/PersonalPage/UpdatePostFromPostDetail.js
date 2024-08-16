function displayUpdatePostFromPostDetail(){
    if (flagUpdatePostFromPostDetail == 0){
        var updatePost = getParam("updatePost");
        var postId = getParam("postId");
        if (updatePost == ""){
            return;
        }
        else{
            var x = document.querySelector('[class*="' + postId + '"]');
            scrollSmoothlyToOneElement(x);
            x.querySelector(".divSettingPost .divEdit").click();
            flagUpdatePostFromPostDetail = 1;
        }
    }
}

function scrollSmoothlyToOneElement(element){
    element.scrollIntoView({ behavior: 'smooth' });
}