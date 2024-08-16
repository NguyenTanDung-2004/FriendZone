inputUploadImageBackground.addEventListener("change", (e) => 
{
    var file = e.target.files[0];
    backgroundImageFile = file;
    changeImageWhenUpload();
}
)

divEditImage.addEventListener("click", () => 
{
    inputUploadImageBackground.click();
}
)

// changeImageWhenUpload
function changeImageWhenUpload(){
    const reader = new FileReader(); 
    reader.onload = function(e1) {
        imgBackgroundGroup.src = e1.target.result;
        setTimeout(function() {
            const userConfirmed = confirm('Do you want to update background image of this group?');
            if (userConfirmed) {
                spinner.style.display = "flex";
                uploadBackgroundImage();
                setTimeout(function(){
                    location.reload();
                }, 3000);
            } else {
                alert('You clicked Cancel.');
            }
        }, 500); // 1000 milliseconds = 1 second
    };
    reader.readAsDataURL(backgroundImageFile);
}


function uploadBackgroundImage(){
    const formData = new FormData();
    const token = getCookie("jwtToken");
    formData.append("groupId", getParam("groupId"));
    formData.append("file", backgroundImageFile);
    fetch('/handleGroup/uploadBackgroundImage', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    })
    .then(response => {
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}