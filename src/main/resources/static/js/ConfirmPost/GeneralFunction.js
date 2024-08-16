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

//function get param from url
function getParam(name){
    const url = new URL(window.location.href);

    // Create a URLSearchParams object
    const params = new URLSearchParams(url.search);

    // Get the value of the 'id' parameter
    const value = params.get(name);
    if (value == null){
        return "";
    }
    return value;
}

// convert time
function formatDate(input) {
    // Parse the input date string
    const date = new Date(input);

    // Define an array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract the components of the date
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the components into the desired output string
    const formattedDate = `${day} ${month} ${year} at ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedDate;
}

function checkFilesVideoOrImage(filesString) {
    const extension = filesString.split('.').pop().toLowerCase();
    if (imageExtensions.includes(extension)) {
        return "Image"
    } else if (videoExtensions.includes(extension)) {
        return "Video"
    } else {
        return "Image"
    }
}

function getDisplayStyle(element){
    const displayStyle = window.getComputedStyle(element).display;
    return displayStyle;
}

function showToast(text) {
    var toast = document.getElementById("toast");
    toast.innerHTML = text;
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 500);
}

// function display file in comment when upload
function displayFileWhenUpload(imgOrVideo, file){
    const reader = new FileReader();
    reader.onload = function(e1) {
        imgOrVideo.src = e1.target.result;
    };
    reader.readAsDataURL(file);
}

imgUser.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/group?groupId=" + groupId;
}
)