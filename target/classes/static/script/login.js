import settings from "../settings.js";

if (typeof (Storage) !== "undefined") {
    ;
} else {
    console.log("Yikes! This browser doesn't support sessionStorage!");
};

async function login(event) {
    event.preventDefault();
    const username = document.getElementById("uname");
    const password = document.getElementById("psw");
    if (username.value === "" || password.value === "") {
        return
    };
    const form = {
        username: username.value,
        password: password.value,
    };
    const path = settings.server + "/login";
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    };

    const resp = await fetch(path, config);
    const user = await resp.json();
    sessionStorage.adventureInsuranceUserId = user.id;

    if (user.id > 0) {
        location.href = "/html/claims.html";
    } else {
        document.getElementById("message").innerText = "Noperino!";
        return
    };
};

document.getElementById("loginButton").addEventListener("click", login);
