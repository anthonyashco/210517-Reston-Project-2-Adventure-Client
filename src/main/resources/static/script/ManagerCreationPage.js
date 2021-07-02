import settings from "../settings.js";

if (typeof (Storage) !== "undefined") {
    ;
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

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
        createManager(name, username, password)
    } else {
        alert("not submitted")
    }
}

async function createManager(name, username, password){
    const body = {
        id:0,
        name:name.value,
        username:username.value,
        password:password.value
    };
    const path = settings.server + "/managers";
    const config = {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(body)
    }
    const response = await fetch(path, config);
    const manager = await response.json();
    if (manager.id > 0){
        alert("You successfully made yourself a manager!")
        location.href = "/html/login.html"
    } else {
        alert(manager)
    }
}
document.getElementById("createButton").addEventListener("click", confirmDetails)