
// get 6 friend.
function get6Friends(){
    const token = getCookie("jwtToken");
    const urlId = getParam("id");
    fetch('/user/get6Friend?urlId=' + urlId, {
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
        var object = data1.object;
        listFriendId = object[0];
        listFriendName = object[1];
        for (let i = 0; i < listFriendName.length; i++){
            const divFriendChild1 = createDivFriendChild1(listFriendName[i], listFriendId[i]);
            divFriendChild.appendChild(divFriendChild1);
            //
            var imgFriend = document.createElement('img');
            imgFriend.src = '../FileUser/Image/' + listFriendId[i] + '/avatar.jpg';
            imgFriend.addEventListener("click", () => 
                {
                    window.location = "http://localhost:8080/FriendZone?id=" + listFriendId[i];  
                }
            )
            divImgFriends.appendChild(imgFriend);
        }
        if (listFriendId.length > 0){
            var i = document.createElement('i');
            i.className = 'fa-solid fa-ellipsis';
            divImgFriends.appendChild(i);
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
get6Friends();

// function create divFriendChild1
function createDivFriendChild1(name, id){
    const divFriendChild1 = document.createElement('div');
    divFriendChild1.className = 'divFriendChild1';

    // Create the img element
    const img = document.createElement('img');
    img.src = '../FileUser/Image/' + id + '/avatar.jpg';
    img.alt = '';

    // Create the p element
    const p = document.createElement('p');
    p.textContent = name;

    // Append img and p to the parent div
    divFriendChild1.appendChild(img);
    divFriendChild1.appendChild(p);

    divFriendChild1.addEventListener("click", () =>
        {
            window.location = "http://localhost:8080/FriendZone?id=" + id;  
        }
    )

    return divFriendChild1;
}

// function get all friend
function getAllFriends(){
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
        console.log(data1);
        listAllFriendId = data1.object[0];
        listAllFriendName = data1.object[1];
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

getAllFriends();

document.querySelector("body > div.divMain > div.divMain1 > div.divLeft1.divMain1Child > div.divFriend.divMain1Child > div.divHeader1 > p.pSeeAllPhoto").addEventListener("click", () => 
{
    var userId = getParam("id");
    if (userId != ""){
        window.location = "http://localhost:8080/FriendZone/allFriend?userId=" + userId;
    }
    else{
        window.location = "http://localhost:8080/FriendZone/allFriend";
    }
}
)

