function checkNullInput(input){
    if (input.value == ''){
        return 1;
    }
    else{
        return 0;
    }
}

pContinue.addEventListener("click", () => 
    {
        if (flagContinue == 1){
            eventForContinueEmail();
        }
        else if (flagContinue == 2){
            eventForContinueCode();
        }
        else if (flagContinue == 3){
            continueNewPassword();
        }
        else if (flagContinue == 4){
            updatePassword();
        }
    }
)

pCancel.addEventListener("click", () => 
    {
        window.location = "http://localhost:8080/FriendZone/ForgotPassword";
    }
)

inputForgot.addEventListener("focus", () => 
    {
        pError.style.display = "none";
        imgError.style.display = "none";
    }
)