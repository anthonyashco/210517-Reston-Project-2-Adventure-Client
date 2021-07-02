import settings from "../settings.js";

let userId;
let occupation;
let planId;
let manager;

if (typeof (Storage) !== "undefined") {
    userId = sessionStorage.adventureInsuranceUserId;
    occupation = sessionStorage.adventureInsuranceOccupation;
    planId = sessionStorage.adventureInsurancePlanId;
    manager = ((sessionStorage.adventureInsuranceManager) === "true" ? true : false);
    console.log(userId);
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

async function choose(x) {
    const result = confirm(`Are you sure you want to choose the ${wordify(x)} plan?`);
    if(result){
        const path = `${settings.server}/users/${userId}/plans/${x}`;
        const config = {
            method: "PUT",
            headers: { "id": userId },
        };
        const resp = await fetch(path, config);
        const user = await resp.json();
        planId = user.planId;
        sessionStorage.adventureInsurancePlanId = user.planId;
        showPlan();
    };
};

function showPlan() {
    if (manager) {
        plan.innerHTML = "Manager";
    } else {
        plan.innerHTML = `${wordify(planId)} Plan`;
        plan.style.color = colorizer(planId);
    }
};

function wordify(x) {
    switch (Number(x)) {
        case 1:
            return "Gold";
        case 2:
            return "Silver";
        case 3:
            return "Bronze";
    };
};

function colorizer(x) {
    switch (Number(x)) {
        case 1:
            return "gold";
        case 2:
            return "silver";
        case 3:
            return "peru";
    };
};

document.getElementById("choose1").addEventListener("click", () => {choose(1)}); // gold
document.getElementById("choose2").addEventListener("click", () => {choose(2)}); // silver
document.getElementById("choose3").addEventListener("click", () => {choose(3)}); // bronze
document.addEventListener("DOMContentLoaded", showPlan());
