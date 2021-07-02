import settings from "../settings.js";

if (typeof (Storage) !== "undefined") {
    ;
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

async function login(route) {
    const username = document.getElementById("uname");
    const password = document.getElementById("psw");
    if (username.value === "" || password.value === "") {
        return
    };
    const form = {
        username: username.value,
        password: password.value,
    };
    const path = settings.server + route;
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    };

    const login = await fetch(path, config);
    const userId = await login.json();

    if (userId.id > 0) {
        let userPath;
        if (route === "/login") {
            userPath = `${settings.server}/users/${userId.id}`;
        } else if (route === "/login/managers") {
            userPath = `${settings.server}/managers/${userId.id}`;
        }
        const resp = await fetch(userPath, { method: "GET" });
        const user = await resp.json();
        sessionStorage.adventureInsuranceUserId = user.id;
        sessionStorage.adventureInsuranceOccupation = user.occupation;
        sessionStorage.adventureInsurancePlanId = user.planId;
        sessionStorage.adventureInsuranceManager = (route === "/login/managers" ? true : false);
        location.href = "/html/claims.html";
        return true
    } else {
        document.getElementById("message").innerText = "Noperino!";
        return false
    };
};

document.getElementById("loginButton").addEventListener("click", () => { login("/login") });
document.getElementById("managerButton").addEventListener("click", () => { login("/login/managers") });
