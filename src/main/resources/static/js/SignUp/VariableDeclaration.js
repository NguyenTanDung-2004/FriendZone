var arrayGenderChild = document.querySelectorAll("body .divSignup .divGender .genderChild");
// input
var arrayRadioGender = document.querySelectorAll("body .divSignup .divGender .genderChild input");
var selectYear = document.querySelector("#selectYear");
var selectMonth = document.querySelector("#selectMonth");
var selectDay = document.querySelector("#selectDay");
var arrayInput = document.querySelectorAll('input[type="text"], select'); // all input that are not input in gender
arrayInput[1].type = "password";
var arrayInputGender = document.querySelectorAll("body .divSignup .divGender .genderChild"); // all input in gender
// input

//change value
var genderValue = -1;
var dayOfBirth = "";
var monthOfBirth = "";
var yearOfBirth = "";
//change value

// error p 
var pErrorEmail = document.querySelector("#pErrorEmail");
var pErrorPassword = document.querySelector("#pErrorPassword");

var pSignUp = document.querySelector("#pSignUp"); 
