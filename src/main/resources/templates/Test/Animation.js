var inputGroupName = document.querySelector("body > div.divMain > div.divLeft > div.divGroupName.divInput > input[type=text]");
var pGroupName = document.querySelector("body > div.divMain > div.divRight > div > div:nth-child(1) > p");

inputGroupName.addEventListener("keyup", (e) => 
{
    pGroupName.innerHTML = inputGroupName.value;
    if (inputGroupName.value == ""){
        pGroupName.innerHTML = "Group name";
    }
}
)