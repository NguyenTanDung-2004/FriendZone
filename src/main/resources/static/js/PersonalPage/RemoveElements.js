if (getParam("id") != ""){
    divUploadCoverPhoto.remove();
    iUploadAvt.remove();
    pEditDetail.innerHTML = "See more"    
    divCreatePostClass.style.display = "none";
    divConfirm.remove();
    inputDateOfBirth.disabled  = true;
    inputFirstName.disabled  = true;
    inputLastName.disabled  = true;
    inputFrom.disabled  = true;
    inputLive.disabled  = true;
    inputStudy.disabled  = true;
    inputWork.disabled  = true;
    selectGender.disabled  = true;
}
