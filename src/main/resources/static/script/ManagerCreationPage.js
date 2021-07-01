async function confirmDetails(){
    let name = document.getElementById("nameInput")
    let username = document.getElementById("usernameInput")
    let password = document.getElementById("passwordInput")
    let passwordConfirm = document.getElementById("passwordConfirmInput")
    let checkbox = document.getElementById("cb1")
    if (name.value === ""){
        alert("Enter your name.")
        return null
    }
    if (username.value === ""){
        alert("Enter a username.")
        return null
    }
    if (password.value === ""){
        alert("Enter a password.")
        return null
    }
    if (passwordConfirm.value === ""){
        alert("Confirm your password.")
        return null
    }
    if (checkbox.checked === false){
        alert("Please click the checkbox: this is a legally binding necessity")
        return null
    }
    if (confirm("Are you sure you want to submit this information?")){
        alert("implement createManager()")
    } else {
        alert("not submitted")
    }
}

async function createManager(){
    const body = {
        name:name.value,
        username:username.value,
        password:password.value
    };
    const path = settings.server + "/mangers";
    const config = {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(body)
    }
    const response = await fetch(path, config);
    const manager = await response.json();
    sessionStorage.adventureInsuranceManagerId = manager.id;
// get rid of session storage and redirect the user to the login page
    if (manager.id > 0){
        location.href = "/html/claims.html"
    } else {
        alert("Something has gone wrong: returning to the login page")
        location.href = "/html/login.html";
    }
}