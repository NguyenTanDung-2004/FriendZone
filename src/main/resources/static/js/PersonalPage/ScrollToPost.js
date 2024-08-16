
// function sroll to post
function scrollSmoothlyToOneElement(element){
    element.scrollIntoView({ behavior: 'smooth' });
}

// function scroll
function accessToPost(){
    var actionValue = getParam("action");
    if (actionValue == "share"){
        var postId = getParam("postId");
        var post = document.querySelector('[class*="' + postId + '"]');
        scrollSmoothlyToOneElement(post);
    }
    else{

    }
}

setTimeout(function() {
    accessToPost();
}, 500);