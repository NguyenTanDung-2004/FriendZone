

// function check email
function checkEmailFormat(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var x = emailPattern.test(input.value);
    if (x == true){
        return 0;
    }
    else{
        return 1;
    }
}

function checkAllEmail(input){
    if (checkEmailFormat(input) == 0 && checkNullInput(input) == 0){
        return 0;
    }
    else{
        return 1;
    }
}



// function continue 
function eventForContinueEmail(){
    if (checkAllEmail(inputForgot) == 0){
        const data = {
            email: inputForgot.value
        }
        console.log(data);
        document.querySelector(".divContainSpinner").style.display = "flex";
        document.querySelector("#pTextSpinner").innerHTML = "Code is being sent...";
         fetch('/user/sendCodeResetPassword', {
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
            if (data1.code == 1000){
                document.querySelector(".spinner-border").style.display = "none";
                document.querySelector(".fa-check").style.display = "block";
                document.querySelector("#pTextSpinner").innerHTML = "Send code successfully!";
                inputForgot.placeholder = "Your Code:";
                pCurrentTitle.innerHTML = "Enter Your Code";
                pCurrentDecription.innerHTML = "Please enter your code that we sent for you."
                inputForgot.value = '';
                emailValue = data.email;
                flagContinue++;
            }
            else{
                pError.innerHTML = "The email that you've entered is incorrect.";
                pError.style.display = "block";
                imgError.style.display = "block";
                document.querySelector(".divContainSpinner").style.display = "none";
            }
        })
        .catch(error => {
            
        });
    }
    else{
        pError.innerHTML = "The email that you've entered is incorrect.";
        pError.style.display = "block";
        imgError.style.display = "block";
    }
}

