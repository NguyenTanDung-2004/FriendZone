function changeStyleAndClassNormalLike(like, p){
    like.className = 'bi bi-hand-thumbs-up';
    like.style.color = "gray";

    p.style.color = "gray";
}

function changeStyleAndClassLiked(like, p){
    like.className = 'bi bi-hand-thumbs-up-fill';
    like.style.color = "#0866ff";

    p.style.color = "#0866ff";
}

// function send request like post 
function likePost(postId){
    const token = getCookie("jwtToken");
    currentPostId = postId;
    fetch('/user/likePost?postId=' + currentPostId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        console.log(data1);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function getListLikePost
function getListLikePost(){
    const token = getCookie("jwtToken");
    var postIds = createPostIds();
    fetch('/likePost/getListLike?arrayPostId=' + postIds, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        arrayNumberOfLikes =  data1;
        setNumberOfLike();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function getListLiked
function getListLiked(){
    const token = getCookie("jwtToken");
    var postIds = createPostIds();
    fetch('/likePost/getListLiked?arrayPostId=' + postIds, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        arrayListLikedPost = data1;
        console.log(arrayListLikedPost);
        setStyleForDivLike();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

// function create post ids
function createPostIds(){
    var listPostIds = [];
    for (var i = 0; i < objectPostInfo.length; i++){
        listPostIds.push(objectPostInfo[i].id);
    }
    return listPostIds;
}

// set numberOfLikes
function setNumberOfLike(){
    arrayPNumberOfLikes = document.querySelectorAll("body > div.divMain > div.divMain1 > div.divRight1 > div.divPost > div.divNumberLikeAndComment > p");
    console.log(arrayPNumberOfLikes);
    for (var i = 0; i < arrayPNumberOfLikes.length; i++){
        arrayPNumberOfLikes[i].innerHTML = arrayNumberOfLikes[i] + " likes";
    }
}

// set style for divLike
function setStyleForDivLike(){
    for (var i = 0; i < arrayListLikedPost.length; i++){
        if (arrayListLikedPost[i] == 1){
            var like = arrayDivLike[i].querySelector("i");
            var p = arrayDivLike[i].querySelector("p");
            like.className = 'bi bi-hand-thumbs-up-fill';
            like.style.color = "#0866ff";
            p.style.color = "#0866ff";
        }
    }
}

// function delete likePost
function deleteLikePost(postId){
    const token = getCookie("jwtToken");
    currentPostId = postId;
    fetch('/likePost/deleteLikePost?postId=' + currentPostId, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        console.log(data1);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
