console.log(listFileImage);
// add photos to divPhotos
for (var i = 0; i < listFileImage.length; i++){
    const img = document.createElement('img');
    img.src = listFileImage[i].replace("C:/Users/user/Downloads/TaiLieuHocTap/Project_FriendZone/FriendZone/FriendZone/src/main/resources/static", "..");
    img.alt = 'Example Image';
    divPhotos.appendChild(img);
}