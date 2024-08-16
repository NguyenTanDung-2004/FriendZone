

function createDiv1Element(imgSrc, groupName, groupId, className, parentElement){
    var div1Element = document.createElement("div");
    div1Element.className = className;
    parentElement.appendChild(div1Element);
    div1Element.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone/group?groupId=" + groupId;
    }
    )
    
    var img = document.createElement("img");
    img.src = imgSrc;
    div1Element.appendChild(img);

    var p = document.createElement("p");
    p.textContent = groupName;
    div1Element.appendChild(p);
}

function createAllElement(){
    for (var i = 0; i < listResponseGroups.length; i++){
        createDiv1Element(listResponseGroups[i].groupBackground, listResponseGroups[i].groupName, listResponseGroups[i].groupId, "div1Element", divDisplaySomeGroup);
    }
    for (var i = 0; i < yourGroups.length; i++){
        createDiv1Element(yourGroups[i].groupBackground, yourGroups[i].groupName, yourGroups[i].groupId, "div1Page", divGroupOnRight);

    }
}

createAllElement();