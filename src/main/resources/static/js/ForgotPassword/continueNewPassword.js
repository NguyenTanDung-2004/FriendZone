// function check format password
function checkFormatNewPassword(input){
    if (input.value.length >=8){
        return 0;
    }
    else{
        return 1;
    }
}

function checkAllNewPassword(input){
    return checkNullInput(input) + checkFormatNewPassword(input);
}

// function continue new password
function continueNewPassword(){
    if (checkAllNewPassword(inputForgot) == 0){
        inputForgot.placeholder = "Confirm password:";
        pCurrentTitle.innerHTML = "Enter Your Confirm";
        pCurrentDecription.innerHTML = "Please enter your confirm to reset your password.";
        newPasswordValue = inputForgot.value;
        inputForgot.value = '';
        flagContinue++;
    }
    else{
        pError.innerHTML = "The new password that you've entered must be included 8 characters.";
        pError.style.display = "block";
        imgError.style.display = "block";
    }
}


// function compare confirm with newpassword
function checkNewAndConfirm(){
    if (newPasswordValue == inputForgot.value){
        return 0;
    }
    else{
        return 1;
    }
}
// function update Password
function updatePassword(){
    if (checkAllNewPassword(inputForgot) + checkNewAndConfirm() == 0){
        const data = {
            email: emailValue,
            newPassword: newPasswordValue
        }
        console.log(data);
        document.querySelector(".spinner-border").style.display = "block";
        document.querySelector(".fa-check").style.display = "none";
        document.querySelector(".divContainSpinner").style.display = "flex";
        document.querySelector("#pTextSpinner").innerHTML = "Reseting your password...";
         fetch('/user/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json(); // Change this to response.json() if the response is JSON
        })
        .then(data1 => {
            console.log(data1);
            if (data1.code == 1000){
                document.querySelector(".spinner-border").style.display = "none";
                document.querySelector(".fa-check").style.display = "block";
                document.querySelector("#pTextSpinner").innerHTML = "Reset successfully!";
                inputForgot.placeholder = "Email:";
                inputForgot.type = "text";
                pCurrentTitle.innerHTML = "Find Your Account";
                pCurrentDecription.innerHTML = "Please enter your email to search for your account."
                inputForgot.value = '';
                flagContinue = 1;
            }
            else{
                pError.innerHTML = "The confirm password that you've entered is incorrect.";
                pError.style.display = "block";
                imgError.style.display = "block";
            }
        })
        .catch(error => {
            
        });
    }
    else{
        pError.innerHTML = "The new password that you've entered must be included 8 characters.";
        pError.style.display = "block";
        imgError.style.display = "block";
    }
}