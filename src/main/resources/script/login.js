import settings from "../settings.js";

async function login(event) {
    const username = document.getElementById("uname");
    const password = document.getElementById("psw");
    const form = {
        user: username.value,
        pass: password.value,
    }
    const path = settings.server + "/login";
    const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    };

    const resp = await fetch(path, config);
    const user = await resp.json();

    if (user > 0) {
        location.href = "claims.html";
    };
};

document.getElementById("loginButton").addEventListener("click", login);
