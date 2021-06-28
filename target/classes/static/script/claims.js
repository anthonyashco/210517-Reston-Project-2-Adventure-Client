import settings from "../settings.js"

const claimTableBody = document.getElementById("claimTableBody");
const claimButton = document.getElementById("claimButton");

async function sendClaim() {
    const path = settings.server + "/claim";
    const resp = await fetch(path);
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
