function getFriend(){
    const token = getCookie("jwtToken");
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
        listAllFriendsOfUser = data1.object;
        console.log(listAllFriendsOfUser);
        for (var i = 0; i < listAllFriendsOfUser[0].length; i++){
            createDiv1FriendInInviteFriendBox(listAllFriendsOfUser[0][i], listAllFriendsOfUser[1][i]);
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getFriend();