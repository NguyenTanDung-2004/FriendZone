function createDiv1Friend(userId, userName){
    const div1Friend = document.createElement('div');
    div1Friend.className = 'div1Friend';

    // Create the image element
    const img = document.createElement('img');
    img.src = "../FileUser/Image/" + userId + "/avatar.jpg";
    img.alt = '';

    // Create the paragraph element
    const p = document.createElement('p');
    p.textContent = userName;

    // Create the icon element
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';
    icon.addEventListener("click", () => 
    {
        div1Friend.remove();
        mapUserId.delete(userId);
    }
    )

    // Append the elements to the main div
    div1Friend.appendChild(img);
    div1Friend.appendChild(p);
    div1Friend.appendChild(icon);

    divFriends.appendChild(div1Friend);
}

