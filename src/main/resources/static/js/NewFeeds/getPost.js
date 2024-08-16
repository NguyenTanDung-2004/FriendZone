function getPost(){
    const token = getCookie("jwtToken");
    fetch('/post/getPostInNewFeed', {
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
        objectPostInfo = data1.object;
        console.log(objectPostInfo);
        createPostFromObjectPostInfo();
        getListLiked();
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getPost();