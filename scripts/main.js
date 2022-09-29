var fieldToMessageID = { //global
    "emailField": "emailErrorMessage",
    "difficultyField": "difficultyErrorMessage"
}

onload = function(){
    document.getElementById("emailField").addEventListener("input", hideError);
    document.getElementById("difficultyField").addEventListener("input", hideError);
}

//returns if form input is correct
function validateForm(){
    var isValidEmail = checkEmail();
    var isDiffSelected = checkDifficulty();

    return (isValidEmail && isDiffSelected);
}

//returns if typed email is in the correct format
function checkEmail(){
    var emailElement = document.getElementById("emailField");
    var typedEmail = emailElement.value;

    // var re = /^\\[^aeiou]+\[[^aeiou]+\|([^aeiou]+\|)*[^aeiou]+\]$/;
    var re = /^\\[qwrtypsdfghjklzxcvbnm]+\[[qwrtypsdfghjklzxcvbnm]+\|([qwrtypsdfghjklzxcvbnm]+\|)*[qwrtypsdfghjklzxcvbnm]+\]$/;

    if (!re.test(typedEmail.toLowerCase())){
        showError(emailElement);
        return false;
    }
    return true;
}

//returns if game difficulty is selected
function checkDifficulty(){
    var diffElement = document.getElementById("difficultyField");
    var selectedDiff = diffElement.value;

    if (selectedDiff == ""){
        showError(diffElement);
        return false;
    }
    return true;
}

//resets event target style and hide associated error message
function hideError(event){
    event.target.style.outline = "none";
    document.getElementById(fieldToMessageID[event.target.id]).style.visibility = "hidden";
}

//change element style and show associated error message
function showError(element){
    element.style.outline = "3px solid red";
    document.getElementById(fieldToMessageID[element.id]).style.visibility = "visible";
}