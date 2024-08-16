// event for focusing inputSearchUser
inputSearchUser.addEventListener("focus", () => 
{
    imgLogo.style.display = "none";
    divResultOfSearchingUser.style.display = "block"
}
)

inputSearchUser.addEventListener("keyup", (e) =>
{
    if (inputSearchUser.value != ""){
        divSeeAllResult.style.display = "block";
        getResult(inputSearchUser.value);
    }
    else{
        divSeeAllResult.style.display = "none";
        var x = divResultOfSearchingUser.querySelectorAll(".div1Result");
        for (var i = 0; i < x.length; i++){
            x[i].remove();
        }
    }
}
)

document.addEventListener('click', (event) => {
    if (event.target != inputSearchUser && event.target != divResultOfSearchingUser
            && event.target != divSeeAllResult
    ) {
        divResultOfSearchingUser.style.display = "none"
        imgLogo.style.display = "block";
    } else {
        if (event.target == inputSearchUser && inputSearchUser.value == ""){
            divSeeAllResult.style.display = "none";
            var x = divResultOfSearchingUser.querySelectorAll(".div1Result");
            for (var i = 0; i < x.length; i++){
                x[i].remove();
            }
        }
    }
});

// get parentString of inputSearchUser.value
function checkParentString(subString, parentString){
    var subStringLowerCase = subString.toLowerCase();
    var parentStringLowerCase = parentString.toLowerCase();
    if (parentStringLowerCase.includes(subStringLowerCase)){
        return true;
    }
    else{
        return false;
    }
}

function getResult(inputSearchUserValue){
    searchedListFriendId = [];
    searchedListFriendName = [];

    searchedListGroupId = [];
    searchedListGroupName = [];

    var x = divResultOfSearchingUser.querySelectorAll(".div1Result");

    for (var i = 0; i < listAllFriendName.length; i++){
        if (checkParentString(inputSearchUserValue, listAllFriendName[i]) == true){
            searchedListFriendName.push(listAllFriendName[i]);
            searchedListFriendId.push(listAllFriendId[i]);
            create1Result("", "../FileUser/Image/" + searchedListFriendId[i] + "/avatar.jpg", searchedListFriendName[i], 
                        "http://localhost:8080/FriendZone?id=" + searchedListFriendId[i]);
        }
    }

    for (var i = 0; i < listResponseGroups.length; i++){
        if (checkParentString(inputSearchUserValue, listResponseGroups[i].groupName) == true){
            searchedListGroupId.push(listResponseGroups[i].groupId);
            searchedListGroupName.push(listResponseGroups[i].groupName);
            create1Result("imgGroup", listResponseGroups[i].groupBackground, listResponseGroups[i].groupName, 
                            "http://localhost:8080/FriendZone/group?groupId=" + listResponseGroups[i].groupId);
        }
    }

    for (var i = 0; i < x.length; i++){
        x[i].remove();
    }

}

function create1Result(className, imgSrc, name, link){
    var div1Result = document.createElement("div");
    div1Result.className = "div1Result";
    divResultOfSearchingUser.insertBefore(div1Result, divResultOfSearchingUser.firstChild);

    var img = document.createElement("img");
    img.className = className;
    img.src = imgSrc;
    div1Result.appendChild(img);

    var p = document.createElement("p");
    p.textContent = name;
    div1Result.appendChild(p);

    div1Result.addEventListener("click", () => 
    {
        window.location = link;
    }
    )
}
    