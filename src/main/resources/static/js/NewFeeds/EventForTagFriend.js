
// event for turning off divTagFriend
iCloseTagFriend.addEventListener("click", () => 
    {
        divTagFriend.style.transform = "scale(0)";
    }
)

// event for turning on divTagFriend
imgTagFriends.addEventListener("click", () => 
    {
        if (listFlagTagedFriend.length == 0){
            for (var i = 0; i < listAllFriendId.length; i++){
                listFlagTagedFriend.push(0);
            }
        }
        divTagFriend.style.transform = "scale(1)";
        createallDiv1Result();
    }
)

// function create div1Result
function createDiv1Result(id, name){
    divResultSearchTagFriend.innerHTML = divResultSearchTagFriend.innerHTML
        + "<div id='div1Result'><img src='" + '../FileUser/Image/' + id + '/avatar.jpg' + "' alt=''><p>" + name + "</p></div>"
}

// function event for div1Result;
function eventForDiv1Result(){
    divTagFriend.style.transform = "scale(0)";
    addChoiceFriend();
}

// function add choice friend.
function addChoiceFriend(){
    divContainTagedFriend.innerHTML = ``;
    for (let key of mapIndexTagFriend.keys()) {
        divContainTagedFriend.innerHTML = divContainTagedFriend.innerHTML + 
            "<div class='divFriend' style='display:flex; justify-content: space-between ;padding: 5px 5px;background-color: var(--backgroundBody);width: fit-content !important;max-height: 40px;border-radius: 8px;color: gray;'>@" + listAllFriendName[mapIndexTagFriend.get(key)] + `<i style="padding: 5px 8px; background-color: white; border-radius: 50%;" id="iDeleteTagedFriend" class="fa-solid fa-xmark"></i>` + "</div>"
    }
    // for (var i = 0; i < listFlagTagedFriend.length; i++){
    //     if (listFlagTagedFriend[i] == 1){
    //         divContainTagedFriend.innerHTML = divContainTagedFriend.innerHTML + 
    //         "<div class='divFriend' style='display:flex; justify-content: space-between ;padding: 5px 5px;background-color: var(--backgroundBody);width: fit-content !important;max-height: 40px;border-radius: 8px;color: gray;'>@" + listFriendName[i] + `<i style="padding: 5px 8px; background-color: white; border-radius: 50%;" id="iDeleteTagedFriend" class="fa-solid fa-xmark"></i>` + "</div>"
    //     }
    // }
    deleteFriend();
}

// function create allDiv1Result and get all them.
function createallDiv1Result(){
    divResultSearchTagFriend.innerHTML = "";
    for (var i = 0; i < listAllFriendId.length; i++){
        createDiv1Result(listAllFriendId[i], listAllFriendName[i]);
    }

    var arrayDiv1Result = document.querySelectorAll("#div1Result");
    for (let i = 0; i < arrayDiv1Result.length; i++){
        arrayDiv1Result[i].addEventListener("click", () => 
            {
                console.log(listAllFriendId[i]);
                if (flagEditComment == 1){
                    iCloseEditComment1.style.display = "block";
                    eventForTagingFriendInEditComment(listAllFriendId[i], listAllFriendName[i]);
                }
                else{
                    if (flagDisplayComment == 0){
                        if (listFlagTagedFriend[i] == 0){
                            listFlagTagedFriend[i] = 1;
                            mapIndexTagFriend.set(mapIndexTagFriend.size, i);
                            console.log(mapIndexTagFriend);
                            eventForDiv1Result();
                        }
                        console.log(listFlagTagedFriend);
                    }
                    else{
                        clickingFor1ResultInDivTagedFriendInComment(listAllFriendName[i], listAllFriendId[i]);
                        divTagFriend.style.transform = "scale(0)";
                    }
                }
            }
        )
    }
}

// function for delete friend
function deleteFriend(){
    var arrayDivFriend = document.querySelectorAll("#divContainTagedFriend .divFriend");
    var arrayClose = document.querySelectorAll("#iDeleteTagedFriend");
    listIndex = [];
    for (var i = 0; i < arrayClose.length; i++){
        listIndex.push(i);
    }
    for (let i = 0; i < arrayClose.length; i++){
        arrayClose[i].addEventListener("click", () => 
            {
                arrayDivFriend[i].style.display = "none";
                listFlagTagedFriend[mapIndexTagFriend.get(listIndex[i])] = 0;
                if (listIndex[i] == mapIndexTagFriend.size - 1){
                    mapIndexTagFriend.delete(listIndex[i]);
                    for (var j = listIndex[i] + 1; j < listIndex.length; j++){
                        listIndex[j] = listIndex[j] - 1;
                    }               
                }
                else{
                    for (var j = listIndex[i]; j < mapIndexTagFriend.size - 1; j++) {
                        mapIndexTagFriend.set(j, mapIndexTagFriend.get(j + 1));
                    }
                    for (var j = listIndex[i] + 1; j < listIndex.length; j++){
                        listIndex[j] = listIndex[j] - 1;
                    }    
                    mapIndexTagFriend.delete(mapIndexTagFriend.size - 1); 
                }
                console.log(mapIndexTagFriend);
                console.log(listFlagTagedFriend);
            }
        )
    }
}

function clickingFor1ResultInDivTagedFriendInComment(userName, userId){
    var tagValue = "@" + userName;
    const divInput = currentInputServedForChooseIcon.closest('.divInput');

    // Query the divImgOrVideo within the divAddToComment inside divInput
    const divTagedFriend = divInput.querySelector('.divAddToComment .divImgOrVideo .divTagedFriend');
    divTagedFriend.querySelector("i").style.display = "block";
    const p = document.createElement("p");
    p.innerHTML = tagValue;
    divTagedFriend.appendChild(p);
    setTagedId.add(userId);
    console.log(setTagedId);
}
