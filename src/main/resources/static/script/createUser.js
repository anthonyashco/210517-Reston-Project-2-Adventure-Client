import settings from "../settings.js";

async function createUser(){
    const path = settings.server + "/users";
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const name = document.getElementById("nameInput").value;
    const occupation = document.getElementById("occupationInput").value;
    const planId = document.getElementById("planSelectorInput").getAttribute("name");

    const req = {
        id: 0,
        occupation: occupation,
        name: name,
        username: username,
        password: password,
        planId: planId
    }
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    };

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
    console.log("I have made the request?");
    console.log(resp);
    const plans = await resp.json();
    console.log(plans);
    let options = "<option  disabled selected value>--Please select a plan--</option>"
    for(let plan of plans){
        options += `<option name="${plan.id}">${plan.name}</option>`;
        console.log(`I tried adding ${plan.name} to the option select`);
        console.log(options);
    }
    planList.innerHTML+=options;
    console.log(planList);
    console.log("I am the end of the function?");
}
document.addEventListener("DOMContentLoaded", getPlans());
const createButton = document.getElementById("createButton");
createButton.addEventListener("click",createUser);
