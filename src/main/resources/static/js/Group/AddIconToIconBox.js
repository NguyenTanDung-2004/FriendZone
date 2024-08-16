// event for adding icon to divContentIconFace
for (var i = 0; i < iconFace.length; i++){
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = iconFace[i];
    divContentIconFace.appendChild(newDiv);
}

// event for adding icon to divContentIconHand
for (var i = 0; i < iconHand.length; i++){
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = iconHand[i];
    divContentIconHand.appendChild(newDiv);
}

// event for adding icon to divContentIconFlower
for (var i = 0; i < iconFlower.length; i++){
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = iconFlower[i];
    divContentIconFlower.appendChild(newDiv);
}

// event for adding icon to divContentIconAnimal
for (var i = 0; i < iconAnimal.length; i++){
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = iconAnimal[i];
    divContentIconAnimal.appendChild(newDiv);
}

// event for adding icon to divContentIconLove
for (var i = 0; i < iconLove.length; i++){
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = iconLove[i];
    divContentIconLove.appendChild(newDiv);
}

// event for filter icon 
for (let i = 0; i < divFilterIconChild.length; i++){
    divFilterIconChild[i].addEventListener("click", () => 
        {
            divContentIconChild[i].scrollIntoView({ behavior: 'smooth' });
        }
    )
}

// event for clicking icon
var allIcon = document.querySelectorAll("#newDiv");
for (let i = 0; i < allIcon.length; i++){
    allIcon[i].addEventListener("click", () => 
        {
            currentInputOrTextArea.value = currentInputOrTextArea.value + allIcon[i].innerHTML;
        }
    )
}

// event for closing icon box
iCloseIcon.addEventListener("click", () => 
    {
        divIcon.style.transform = "scale(0)";
    }
)

// show icon box in create post box
imgDisplayIconBoxInCreatePostBox.addEventListener("click", () => 
{
    divIcon.style.transform = "scale(1)";
    currentInputOrTextArea = textAreaInCreatePost;
}
)