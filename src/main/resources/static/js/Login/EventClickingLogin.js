// function check input null
function checkInputNull(input){
    if (input.value == ''){
        return 1;
    }
    else{
        return 0;
    }
}

// function check email format
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

// function check password format
function checkPasswordFormat(input){
    if (input.value.length >= 8){
        return 0;
    }
    else{
        return 1; 
    }
}

function eventForAll(){
    var x = checkInputNull(inputEmail) +
            checkInputNull(inputPassword) +
            checkEmailFormat(inputEmail) + 
            checkPasswordFormat(inputPassword);
    if (x == 0){
        sendRequestLogin();
    }
    else{
        changeBoderInput(inputEmail);
        changeBoderInput(inputPassword);
    }
}

// function change border input
function changeBoderInput(input){
    input.style.border = "2px solid red";
}

// function event for button 
pButtonLogin.addEventListener("click", () => 
    {
        eventForAll();
    }
)

// event focus input
function addEventForInput(input){
    input.addEventListener("focus", () => 
        {
            input.style.border = "2px solid #0866ff";
        }
    )
    input.addEventListener("blur", () => 
        {
            input.style.border = "2px solid #ced0d4";
        }
    )
}

addEventForInput(inputEmail);
addEventForInput(inputPassword);

// envet send request login
function sendRequestLogin(){
    const data = {
        userName: inputEmail.value,
        password: inputPassword.value
    }
    document.querySelector(".divContainSpinner").style.display = "flex";
    document.querySelector("#pTextSpinner").innerHTML = "You are logging...";
    fetch('/user/login_without_jwtToken', {
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
            document.querySelector("#pTextSpinner").innerHTML = "Login successfully!";
            window.location = "http://localhost:8080/FriendZone/newFeed";
        }
        else{
            document.querySelector(".divContainSpinner").style.display = "none";
            changeBoderInput(inputEmail);
            changeBoderInput(inputPassword);
        }
    })
    .catch(error => {
        
    });
}

//function get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



