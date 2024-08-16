// check format code
function checkFormatCode(input){
    if (input.value.length != 4){
        return 1;
    }
    else{
        return 0;
    }
}
function checkAllCode(input){
    return checkNullInput(input) + checkFormatCode(input);
}

// function continue 
function eventForContinueCode(){
    if (checkAllCode(inputForgot) == 0){
        const data = {
            email: emailValue,
            code: inputForgot.value
        }
        console.log(data);
         fetch('/user/checkCode', {
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
                inputForgot.placeholder = "New password:";
                inputForgot.type = "password";
                pCurrentTitle.innerHTML = "Enter New Password";
                pCurrentDecription.innerHTML = "Please enter your new password to reset."
                inputForgot.value = '';
                flagContinue++;
            }
            else{
                pError.innerHTML = "The code that you've entered is incorrect.";
                pError.style.display = "block";
                imgError.style.display = "block";
            }
        })
        .catch(error => {
            
        });
    }
    else{
        pError.innerHTML = "The code that you've entered is incorrect.";
        pError.style.display = "block";
        imgError.style.display = "block";
    }
}
