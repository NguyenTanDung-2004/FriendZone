// check null for input that not gender 
function checkNullInputNotGender(){
    var flag = 0;
    for (var i = 0; i < arrayInput.length; i++){
        if (arrayInput[i].value == ''){
            if (i != 0 && i != 1){
                changeBorderInputError(arrayInput[i]);
            }
            else{
                arrayInput[i].style.border = "1px solid red";
            }
            flag = 1;
            if (i == 0){
                pErrorEmail.style.display = "block";
            }
            if (i == 1){
                pErrorPassword.style.display = "block";
            }
        }
    }
    if (flag == 0){ // return 0 if not error
        return 0;
    }
    else{
        return 1;
    }
}

// style input error
function changeBorderInputError(input){
    input.style.border = "1px solid red";

    input.addEventListener("focus", () => 
        {
            input.style.border = "2px solid #0866ff";
        }
    )
    input.addEventListener("blur", () => 
        {
            input.style.border = "1px solid #ced0d4";
        }
    )
}

// set up value for genderValue
for (let i = 0; i < arrayGenderChild.length; i++){
    arrayGenderChild[i].addEventListener("click", () => 
        { 
            arrayRadioGender[i].checked = true;
            genderValue = i + 1;
        }
    );
}

// set up value for month, day, year
selectDay.addEventListener("change", () => 
    {
        dayOfBirth = selectDay.value;
    }
)
selectMonth.addEventListener("change", () => 
    {
        monthOfBirth = selectMonth.selectedIndex + 1;
    }
)
selectYear.addEventListener("change", () => 
    {
        yearOfBirth = selectYear.value;
    }
)

// function checkGenderClick
function checkGenderClick(){
    if (genderValue == -1){
        for (let i = 0; i < arrayGenderChild.length; i++){
            changeBorderInputError(arrayGenderChild[i]);
            arrayGenderChild[i].addEventListener("click", () => 
                {
                    arrayRadioGender[i].checked = true;
                    genderValue = i + 1;
                    for (var j = 0; j < arrayGenderChild.length; j++){
                        arrayGenderChild[j].style.border = "1px solid #ced0d4";
                    }
                }
            )
        }
        return 1;
    }
    else{
        return 0;
    }
}

// function check email
function checkEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var x = emailPattern.test(email);
    if (x == true){
        return 0;
    }
    else{
        arrayInput[0].style.border = "1px solid red";
        pErrorEmail.style.display = "block";
        return 1;
    }
}

// event for forcus inputEmail and inputPassword
function eventFocusEmailAndPassword(input, pError){
    input.addEventListener("focus", () => 
        {
            input.style.border = "2px solid #0866ff";
            pError.style.display = "none";
        }
    )
    input.addEventListener("blur", () => 
        {
            input.style.border = "1px solid #ced0d4";
        }
    )
}
eventFocusEmailAndPassword(arrayInput[0], pErrorEmail);
eventFocusEmailAndPassword(arrayInput[1], pErrorPassword);

// function checkpassword format
function checkPasswordFormat(password){
    if (password.length >= 8){
        return 0;
    }
    else{
        arrayInput[1].style.border = "1px solid red";
        pErrorPassword.style.display = "block";
        return 1;
    }
}

// function check at least 10 years old
function isAtLeast10YearsOld(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        if (age > 10){
            selectDay.style.border = "1px solid #ced0d4";
            selectMonth.style.border = "1px solid #ced0d4";
            selectYear.style.border = "1px solid #ced0d4";
            return 0;
        }
        else{
            changeBorderInputError(selectDay);
            changeBorderInputError(selectMonth);
            changeBorderInputError(selectYear);
            return 1;
        }
    } else {
        if (age >= 10){
            selectDay.style.border = "1px solid #ced0d4";
            selectMonth.style.border = "1px solid #ced0d4";
            selectYear.style.border = "1px solid #ced0d4";
            return 0;
        }
        else{
            changeBorderInputError(selectDay);
            changeBorderInputError(selectMonth);
            changeBorderInputError(selectYear);
            return 1;
        }
    }
}

// event for clicking Signup
pSignUp.addEventListener("click", () => 
    {
        var count = checkEmailFormat(arrayInput[0].value) +
                    checkNullInputNotGender() + 
                    checkGenderClick() + 
                    checkPasswordFormat(arrayInput[1].value) + 
                    isAtLeast10YearsOld(dayOfBirth, monthOfBirth, yearOfBirth);
        console.log(count);
        if (count == 0){
            document.querySelector(".divContainSpinner").style.display = "flex";
            document.querySelector("#pTextSpinner").innerHTML = "You are signing up...";
            sendRequestCreationUser();
        }
    }
)

// function send RequestCreationUser
function sendRequestCreationUser(){
    var x = monthOfBirth;
    if (monthOfBirth < 10){
        x = "0" + monthOfBirth;
    }
    var y = dayOfBirth;
    y = parseInt(y);
    if (y < 10){
        y = "0" + y;
    }
    const data = {
        email: arrayInput[0].value,
        password: arrayInput[1].value,
        firstName: arrayInput[5].value,
        lastName: arrayInput[6].value,
        gender: genderValue,
        dateOfBirth: yearOfBirth + "-" + x + "-" + y
    }
    console.log(data.password);
     fetch('/user/create_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // if (!response.ok) {
        //     throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json(); // Change this to response.json() if the response is JSON
    })
    .then(data1 => {
        // Handle the response data
        console.log(data1);
        if (data1.message == "User is created successfully!"){
            document.querySelector(".spinner-border").style.display = "none";
            document.querySelector(".fa-check").style.display = "block";
            document.querySelector("#pTextSpinner").innerHTML = "Sign up successfully!";
        }
        else{
            document.querySelector(".divContainSpinner").style.display = "none";
            arrayInput[0].style.border = "1px solid red";
            pErrorEmail.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

