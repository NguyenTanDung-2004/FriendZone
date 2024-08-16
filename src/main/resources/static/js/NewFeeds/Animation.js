// event for clicking divClickDisplayCreatePost
divClickDisplayCreatePost.addEventListener("click", () => 
    {
        divBlurBox.style.display = "block"
        divCreatePostBox.style.transform = "scale(1)"
        setDataForCreatePost(1, "");
        updateStyleAndTextForCreatePostBox("107", "80vh", "15vh", "Create Post", "Post", "none");
    }
)
// event for clicking divClickDisplayCreatePost


// event for clicking iCloseCreatePostBox
iCloseCreatePostBox.addEventListener("click", () => 
    {
        divBlurBox.style.display = "none"
        divCreatePostBox.style.transform = "scale(0)"
    }
)
// event for clicking iCloseCreatePostBox

// event for clicking iCloseComment
iCloseCommmentBox.addEventListener("click", () => 
    {
        divComment.style.transform = "scale(0)";
        divBlurBox.style.display = "none";
        flagDisplayComment = 0;
    }
)
// event for clicking iCloseComment

// event for changing combobox.
comboboxScope.addEventListener('change', () => 
    {
        var selectedOption = comboboxScope.options[comboboxScope.selectedIndex];
        var value = selectedOption.innerHTML;
        if (value == "Public"){
            iIconScope.classList = publicScope;
        }
        else if (value == "Only you"){
            iIconScope.classList = onlyScope;
        }
        else{
            iIconScope.classList = friendScope;
        }
    }
)




