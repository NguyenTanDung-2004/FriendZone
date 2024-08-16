// create list 10 members
if (list10MemberIds.length == 0){
    iSeeAll.style.display = "none";
}
else{
    for (var i = 0; i < list10MemberIds.length; i++){
        var img = document.createElement("img");
        img.src = "../FileUser/Image/" + list10MemberIds[i] + "/avatar.jpg";
        divImgGroupMembers.insertBefore(img, divImgGroupMembers.firstChild);
    }
}