import settings from "../settings.js";

async function createUser(){
    const path = settings.server + "/users";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const occupation = document.getElementById("occupation").value;
    const planId = document.getElementById("planId").value;

    const req = {
        id: 0,
        occupation: occupation,
        name: name,
        username: username,
        password: password,
        planId: null
    }
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    };

    const resp = await fetch(path, config);
    const body = await resp.json();
    if(resp.status == 201) alert("Created Successfully");
    else alert("Failed to create user");


}

async function getPlans(){
    console.log("I am in the getPlans function");
    const path = settings.server + "/plans";
    const planList = document.getElementById("planSelector");
    let planContent = planList.getAttribute("innerHTML");
    const config = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }

    const resp = await fetch(path,config);
    const plans = await resp.json();

    for(let plan of plans){
        planContent += `<option>${plan.name}</option>`;
    }
}
document.addEventListener("DOMContentLoaded", getPlans());
const createButton = document.getElementById("createButton");
createButton.addEventListener("click",createUser);
