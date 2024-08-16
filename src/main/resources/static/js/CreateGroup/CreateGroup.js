divCreateGroup.addEventListener("click", () => 
{
    if (inputGroupName.value != ""){
        var userConfirmed = confirm("Are you sure you want to create this group!");
    
        if (userConfirmed) {
            createGroup();
        } else {
            
        }
    }
    else{
        return;
    }
}
)

function createGroup(){
    var formData = new FormData();
    formData.append("groupName", inputGroupName.value);

    // iterate through map
    for (const [key, value] of mapUserId) {
        formData.append("arrayUserIdsInvitedByAdmin", key);
    }

    const token = getCookie("jwtToken");
    fetch('/handleGroup/createGroup', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        document.querySelector("body .divContainSpinner").style.display = "flex";
        setTimeout(function(){
            window.location = "http://localhost:8080/FriendZone/group?groupId=" + data1.object;
        }, 300);
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}
