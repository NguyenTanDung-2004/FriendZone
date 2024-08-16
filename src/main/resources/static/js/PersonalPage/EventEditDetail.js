pEditDetail.addEventListener("click", () => 
    {
        var urlId = getParam("id");
        console.log(urlId);
        if (urlId != ''){
            getEditDataOfAnotherClien(urlId);
        }
        else {
            getEditData();
        }
        divEditDetail.style.transform = "scale(1)";
        divBlurBox.style.display = "block";
    }
)

iCloseEditDetail.addEventListener("click", () => 
    {
        divEditDetail.style.transform = "scale(0)";
        divBlurBox.style.display = "none";
        document.querySelector(".divContainSpinner").style.display = "none";
    }
)

function getEditData(){
    fetch('/user/getEditDetail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        var keys = Object.keys(data1.object);
        inputFirstName.value = data1.object[keys[0]];
        inputLastName.value = data1.object[keys[1]];
        selectGender.value = data1.object[keys[3]] + "";
        inputDateOfBirth.value = data1.object[keys[4]];
        inputLive.value = data1.object[keys[7]];
        inputFrom.value = data1.object[keys[6]];
        inputStudy.value = data1.object[keys[2]];
        inputWork.value = data1.object[keys[5]];
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function updateData(){
    const data = {
        "firstName": inputFirstName.value,
        "lastName": inputLastName.value,
        "gender": selectGender.value,
        "dateOfBirth": inputDateOfBirth.value,
        "live": inputLive.value,
        "from": inputFrom.value,
        "study": inputStudy.value,
        "work": inputWork.value
    }
    fetch('/user/updateDetail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        console.log(data1);
        document.querySelector(".divContainSpinner").style.display = "flex";
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

divConfirm.addEventListener("click", () => 
    {
        updateData();
    }
)

// function get editData from another client
function getEditDataOfAnotherClien(urlId){
    var token = getCookie("jwtToken");
    fetch('/user/getEditDetailOfAntotherUser?urlId=' + urlId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
        var keys = Object.keys(data1.object);
        inputFirstName.value = data1.object[keys[0]];
        inputLastName.value = data1.object[keys[1]];
        selectGender.value = data1.object[keys[3]] + "";
        inputDateOfBirth.value = data1.object[keys[4]];
        inputLive.value = data1.object[keys[7]];
        inputFrom.value = data1.object[keys[6]];
        inputStudy.value = data1.object[keys[2]];
        inputWork.value = data1.object[keys[5]];
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}