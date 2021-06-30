import settings from "../settings.js";

if (typeof (Storage) !== "undefined") {
    const userId = sessionStorage.adventureInsuranceUserId;
    console.log(userId);
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

const claimTableBody = document.getElementById("claimTableBody");
const claimButton = document.getElementById("claimButton");

async function sendClaim() {
    const path = settings.server + "/claims";
    const claim = document.getElementById("claim");
    const amount = document.getElementById("amount");
    
    const req = {
        claim: claim.value,
        amount: amount.value,
    };
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    };

    const resp = await fetch(path, config);
    const claims = await resp.json();
    console.log(claims);

    let rows = "";
    for (let claim of claims) {
        rows += `<tr>
            <td>${claim.claim}</td>
            <td>${claim.amount}</td>
            <td><i class="${icon(claim.approved)}"></i></td>
            </tr>`
    };
    claimTableBody.innerHTML = rows;
};

function icon(approved) {
    console.log(approved)
    if (approved === true) {
        return "fa fa-check"
    } else if (approved === false) {
        return "fa fa-remove"
    }
}

claimButton.addEventListener("click", sendClaim);
