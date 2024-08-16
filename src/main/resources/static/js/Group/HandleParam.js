function scrollSmoothlyToOneElement(element){
    element.scrollIntoView({ behavior: 'smooth' });
}

// function handle param
function handleParam(){
    var actionValue = getParam("action");
    if (actionValue == "scrollToPost"){
        var postId = getParam("postId");
        var post = document.querySelector('[class*="' + postId + '"]');
        scrollSmoothlyToOneElement(post);
    }
    else if (actionValue == "tagedInComment"){
        var postId = getParam("postId");
        var post = document.querySelector('[class*="' + postId + '"]');
        scrollSmoothlyToOneElement(post);

        var divComment = post.querySelector(".divComment");
        divComment.click();

        var parentCommentId = getParam("parentCommentId");
        if (parentCommentId == "1"){

        }
        else{
            setTimeout(function(){
                var div1Comment = document.querySelector('[class*="' + parentCommentId + '"]');
                scrollSmoothlyToOneElement(div1Comment);
                var pReply = div1Comment.querySelector(".pReply");
                pReply.click();
                setTimeout(function(){
                    var commentId = getParam("commentId");
                    var divChildComment = document.querySelector('[class*="' + commentId + '"]');
                    scrollSmoothlyToOneElement(divChildComment);
                }, 300)
            }, 300);

        }
    }
}

setTimeout(function(){
    handleParam();
}, 500)