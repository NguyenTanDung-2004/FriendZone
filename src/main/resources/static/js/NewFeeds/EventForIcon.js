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
            currentInputServedForChooseIcon.value = 
                currentInputServedForChooseIcon.value + allIcon[i].innerHTML;
        }
    )
}

// event for closing icon box
iCloseIcon.addEventListener("click", () => 
    {
        divIcon.style.transform = "scale(0)";
    }
)

// event for turning on the icon box 
var icons = document.querySelectorAll("i.bi.bi-emoji-wink");
for (let i = 0; i < icons.length; i++){
    icons[i].addEventListener("click", () => 
        {
            divIcon.style.transform = "scale(1)";
            var input = getInputUsingIcon(icons[i]);
            currentInputServedForChooseIcon = input;
        }
    )
}

// function get input using icon 
function getInputUsingIcon(icon){
    const divInput = icon.closest('.divInput');
    var input;
    if (flagDisplayComment == 0){
        input = divInput.querySelector('input[type="text"]');
    }
    else{
        input = divInput.querySelector('textarea');
    }
    return input;
}

iconImgCreatePost.addEventListener("click", () => 
    {
        divIcon.style.transform = "scale(1)";
        currentInputServedForChooseIcon = textareaCreatePost;
    }
)