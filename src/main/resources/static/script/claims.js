import settings from "../settings.js";

let userId;
let occupation;
let planId;
let manager;
let dispType = "pending";

if (typeof (Storage) !== "undefined") {
    userId = sessionStorage.adventureInsuranceUserId;
    occupation = sessionStorage.adventureInsuranceOccupation;
    planId = sessionStorage.adventureInsurancePlanId;
    manager = ((sessionStorage.adventureInsuranceManager) === "true" ? true : false);
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

const claimTableBody = document.getElementById("claimTableBody");
const claimButton = document.getElementById("claimButton");
const plan = document.getElementById("plan");

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
        if(resp.status == 201){
            alert("Yay");
        }
        else alert("Oh no, it seems your claim wasn't created. Try again");
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

    function show(status) {
        switch (dispType) {
            case "pending":
                return (status === "Pending" ? true : false);
            case "all":
                return true;
            case "completed":
                return (status === "Pending" ? false : true);
        }
    }

    let rows = "";
    for (let claim of claims) {
        if (!manager || (manager && show(claim.status))) {
            rows += `
                <tr>
                <td>${claim.reason}</td>
                <td>${claim.amount}</td>
                <td><i class="${icon(claim.status)}"></i></td>
                <td>`;
            
            if (manager) {
                rows += `
                    <div class="btn-group" role="group">
                        <button
                            claimId=${claim.id}
                            choice="Accepted"
                            type="button"
                            class="btn-choice accept"
                        >
                        Sí
                        </button>&nbsp;
                        <button
                            claimId=${claim.id}
                            choice="Rejected"
                            type="button"
                            class="btn-choice deny"
                        >
                        No
                        </button>
                    </div>`
            }

            rows += `
                </td>
                </tr>`
        }
    };
    claimTableBody.innerHTML = rows;
};

function icon(approved) {
    if (approved === "Accepted") {
        return "fa fa-check"
    } else if (approved === "Rejected") {
        return "fa fa-remove"
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

async function choiceButton(event) {
    const path = `${settings.server}/claims/managers/${event.target.getAttribute("claimId")}`
    const req = {
        id: 0,
        date: 0.0,
        amount: 0.0,
        reason: "",
        status: event.target.getAttribute("choice"),
        userId: 0,
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
    console.log(await resp.json());
    console.log(`${event.target.getAttribute("choice")} ${event.target.getAttribute("claimId")}`);
    getClaims();
};

function checkRole() {
    if (manager) {
        document.getElementById("claims").style.display = "none";
        document.getElementById("views").style.display = "block";
    }
};

function loaded() {
    getClaims();
    showPlan();
    checkRole();
};

function views(view) {
    dispType = view;
    getClaims();
}

claimButton.addEventListener("click", sendClaim);
document.addEventListener("DOMContentLoaded", loaded());
document.getElementById("pending").addEventListener("click", () => {views("pending")});
document.getElementById("completed").addEventListener("click", () => {views("completed")});
document.getElementById("all").addEventListener("click", () => {views("all")});
document.body.addEventListener("click", (event) => {
    if (event.target.className === "btn-choice") {
        choiceButton(event);
    }
});
