onload = function(){
    document.getElementById("playButton").addEventListener("click", confirmEmail);
}

function confirmEmail(){
    var emailElement = document.getElementById("emailField");
    var typedEmail = emailElement.value;
    var re = /^\[^aeiou]+\[[^aeiou]+|([^aeiou]+|).[^aeiou]+\]$/;
    // var re = /^\[qwrtypsdfghjklzxcvbnm]+\[[qwrtypsdfghjklzxcvbnm]+|([qwrtypsdfghjklzxcvbnm]+|).[qwrtypsdfghjklzxcvbnm]+\]$/;
    // console.log(re.test(email.toLowerCase())); 
    if (!re.test(typedEmail.toLowerCase()))
        emailElement.style.outlineColor = "red";
    else
    {
        emailElement.style.outlineColor = "black";
        console.log("go to next page");
    }
}