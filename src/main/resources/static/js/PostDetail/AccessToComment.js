function accessToComment(){
    var commentId = getParam("commentId");
    if (commentId == ""){
        return;
    }
    else{
        document.querySelector('body > div > div.divMain > div > div.divLikeCommentShare > div.divComment.divLikeCommentShareChild').click();
    }
}

function scrollSmoothlyToOneElement(element){
    element.scrollIntoView({ behavior: 'smooth' });
}

function scrollToParentComment(){
    var commentId = getParam("commentId");
    var parentCommentId = getParam("parentCommentId");
    if (parentCommentId != ""){
        if (parentCommentId == "1"){
            var x = document.querySelector('[class*="' + commentId + '"]');
            scrollSmoothlyToOneElement(x)
            flagAccessToComment = 1;
        }
    }
    else{
        return;
    }
}

function clickToSeeChildComment(){
    var parentCommentId = getParam("parentCommentId");
    if (parentCommentId != ""){
        if (parentCommentId == "1"){
            return;
        }
        else{
            var x = document.querySelector('[class*="' + parentCommentId + '"]');
            x.querySelector(".pReply").click();
        }
    }
    else{
        return;
    }
}

function scrollToChildComment(){
    var childCommentId = getParam("commentId");
    if (childCommentId != ""){
        var x = document.querySelector('[class*="' + childCommentId + '"]');
        scrollSmoothlyToOneElement(x);
        flagAccessToComment = 1;
    }
}