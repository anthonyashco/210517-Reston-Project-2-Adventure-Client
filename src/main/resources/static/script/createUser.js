import settings from "../settings.js";

function validateInput(){
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const passwordConfirm = document.getElementById("passwordConfirmInput").value;
    const name = document.getElementById("nameInput").value;
    const occupation = document.getElementById("occupationInput").value;
    const optionsList = document.getElementById("planSelector");
    const planId = optionsList.options[optionsList.selectedIndex].name;
    if(username==="" || password===""||name===""||occupation===""||planId===""){
        alert("Empty fields. Please fill them out");
    } 
    else if(password !== passwordConfirm){
        alert("Passwords don't match");
    } 
    else{
        createUser(username,password,name,occupation,planId);
    }
}


async function createUser(){
    const path = settings.server + "/users";
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const name = document.getElementById("nameInput").value;
    const occupation = document.getElementById("occupationInput").value;
    const optionsList = document.getElementById("planSelector");
    console.log(optionsList);
    const planId = optionsList.options[optionsList.selectedIndex].value;
    console.log(planId);

    const req = {
        id: 0,
        occupation: occupation,
        name: name,
        username: username,
        password: password,
        planId: parseFloat(planId)
    }
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    };

    console.log(config);
    const resp = await fetch(path, config);
    if(resp.status == 201) alert("Created Successfully");
    else alert("Failed to create user");


}

async function getPlans(){
    console.log("I am in the getPlans function");
    const path = settings.server + "/plans";
    const planList = document.getElementById("planSelector");
    const config = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }

    const resp = await fetch(path,config);
    const plans = await resp.json();
    let options = "<option  disabled selected value name =\"\">--Please select a plan--</option>"
    for(let plan of plans){
        console.log(plan);
        options += `<option value="${plan.planID}">${plan.name}</option>`;
        console.log(plan.planID);
    }
    planList.innerHTML+=options;
}


document.addEventListener("DOMContentLoaded", getPlans);
const createButton = document.getElementById("createButton");
createButton.addEventListener("click",validateInput);



