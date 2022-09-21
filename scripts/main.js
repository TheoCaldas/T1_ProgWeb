onload = function(){
    document.getElementById("playButton").addEventListener("click", confirmEmail);
    document.getElementById("emailField").addEventListener("input", resetAppearence);
}

function resetAppearence(event){
    event.target.style.outlineColor = "black";
    document.getElementById("errorMessage").style.visibility = "hidden";
}

//to do: check if difficulty has a value
function confirmEmail(){
    var emailElement = document.getElementById("emailField");
    var typedEmail = emailElement.value;
    var re = /^\[^aeiou]+\[[^aeiou]+|([^aeiou]+|).[^aeiou]+\]$/;
    // var re = /^\[qwrtypsdfghjklzxcvbnm]+\[[qwrtypsdfghjklzxcvbnm]+|([qwrtypsdfghjklzxcvbnm]+|).[qwrtypsdfghjklzxcvbnm]+\]$/;
    // console.log(re.test(email.toLowerCase())); 
    if (!re.test(typedEmail.toLowerCase()))
    {
        emailElement.style.outlineColor = "red";
        document.getElementById("errorMessage").style.visibility = "visible";
    }
    else
        // console.log("go to next page");
        window.location.href = "game.html";
}