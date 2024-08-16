// function get all friend
function getAllFriends(){
    const token = getCookie("jwtToken");
    const urlId = getParam("id");
    fetch('/user/getAllFriend', {
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
        listAllFriendId = data1.object[0];
        listAllFriendName = data1.object[1];
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getAllFriends();
