import settings from "../settings.js";

let userId;

if (typeof (Storage) !== "undefined") {
    userId = sessionStorage.adventureInsuranceUserId;
    console.log(userId);
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

const claimTableBody = document.getElementById("claimTableBody");
const claimButton = document.getElementById("claimButton");

async function sendClaim() {
    const result = confirm("Are you sure you want to submit this claim?");
    if(result){
        const path = settings.server + "/claims";
        const claim = document.getElementById("claim");
        const amount = document.getElementById("amount");
        
        const req = {
            id: 0,
            date: 0,
            reason: claim.value,
            amount: amount.value,
            status: "Pending",
            userId: userId
        };
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "id": userId,
            },
            body: JSON.stringify(req),
        };
        const resp = await fetch(path, config);
        getClaims();
    }
};

async function getClaims() {
    const path = settings.server + "/claims";
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id": userId,
        },
    };

    const resp = await fetch(path, config);
    const claims = await resp.json();
    console.log(claims);

    let rows = "";
    for (let claim of claims) {
        rows += `<tr>
            <td>${claim.reason}</td>
            <td>${claim.amount}</td>
            <td><i class="${icon(claim.status)}"></i></td>
            </tr>`
    };
    claimTableBody.innerHTML = rows;
}

function icon(approved) {
    console.log(approved)
    if (approved === "Accepted") {
        return "fa fa-check"
    } else if (approved === "Rejected") {
        return "fa fa-remove"
    }
}

claimButton.addEventListener("click", sendClaim);
document.addEventListener("DOMContentLoaded", getClaims());
