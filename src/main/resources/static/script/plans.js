import settings from "../settings.js";

let userId;
let occupation;
let planId;

if (typeof (Storage) !== "undefined") {
    userId = sessionStorage.adventureInsuranceUserId;
    occupation = sessionStorage.adventureInsuranceOccupation;
    planId = sessionStorage.adventureInsurancePlanId;
    console.log(userId);
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

async function choose(x) {
    const result = confirm(`Are you sure you want to choose the ${wordify(x)} plan?`);
    if(result){
        const path = `${settings.server}/users/${userId}/plans/${x}`;
        const config = {
            method: "POST",
            headers: { "id": userId },
        };
        const resp = await fetch(path, config);
        const user = await resp.json();
        planId = user.planId;
        sessionStorage.adventureInsurancePlanId = user.planId;
    };
};

function wordify(x) {
    switch (x) {
        case 1:
            return "gold";
        case 2:
            return "silver";
        case 3:
            return "bronze";
    }
}

document.getElementById("choose1").addEventListener("click", () => {choose(1)}); // gold
document.getElementById("choose2").addEventListener("click", () => {choose(2)}); // silver
document.getElementById("choose3").addEventListener("click", () => {choose(3)}); // bronze
