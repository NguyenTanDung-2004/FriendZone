// event for click genderChild, the radio will be clicked.
for (let i = 0; i < arrayGenderChild.length; i++){
    arrayGenderChild[i].addEventListener("click", () => 
        {
            arrayRadioGender[i].checked = true;
        }
    )
}

// add element to select.
function add_element_to_select(select, minValue, maxValue){
    for (var i = minValue; i <= maxValue; i++){
        const newOption = document.createElement('option');
        newOption.innerHTML = i;
        select.appendChild(newOption);
    }
}
    // get current time
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
dayOfBirth = currentDay + "";
yearOfBirth = currentYear + "";
monthOfBirth = currentMonth;
    // add data
add_element_to_select(selectYear, 1905, currentYear);
add_element_to_select(selectDay, 1, 31);
    // set default data for birth
selectYear.value = currentYear;
selectMonth.value = "1";
document.querySelectorAll("body .divSignup .divBirth #selectMonth option")[currentMonth - 1].selected = true;
selectDay.value = currentDay;
