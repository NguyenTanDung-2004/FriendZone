// upload avatar
iUploadAvt.addEventListener("click", () => 
    {
        inputUploadImageAvtAndBackground.click();
        // catch event upload avatar form change
        inputUploadImageAvtAndBackground.addEventListener("change", (e) => 
            {
                updateAvtOrBackground(imgAvatar, "Avatar?", e);
            }
        )
    }
)


// upload background
divUploadCoverPhoto.addEventListener("click", () => 
    {
        inputUploadImageAvtAndBackground.click();
        inputUploadImageAvtAndBackground.addEventListener("change", (e) => 
            {
                updateAvtOrBackground(imgBackground, "Background?", e);
            }
        )
    }
)

// function update img
function updateAvtOrBackground(img, type, e){
    let file = e.target.files;
    const reader = new FileReader();
    inputTypeFileFormUploadAvtAndBackground.value = type;
    reader.onload = function(e1) {
        img.src = e1.target.result;
        setTimeout(function() {
            const userConfirmed = confirm('Do you want to update your ' + type);
            if (userConfirmed) {
                uploadFile(file[0], type);
            } else {
                alert('You clicked Cancel.');
            }
        }, 500); // 1000 milliseconds = 1 second
    };
    reader.readAsDataURL(file[0]);
}

function uploadFile(file, type){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type.replace("?", ""));
    const token = getCookie("jwtToken");
    fetch('/handleFile/uploadFileAvtAndBackground', {
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
        document.querySelector(".divContainSpinner").style.display = "flex";
        setTimeout(function() {
            window.location = "http://localhost:8080/FriendZone";
        }, 4000); // 1000 milliseconds = 1 second
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

//function get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
