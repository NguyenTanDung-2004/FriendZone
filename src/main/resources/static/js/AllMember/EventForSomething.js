imgBackgroundOfGroup.addEventListener("click", () => 
{
    var groupId = getParam("groupId");
    window.location = "http://localhost:8080/FriendZone/group?groupId=" + groupId
}
)

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

if (flagAdmin == 0){
    divRequestFriend.style.display = "none";
}