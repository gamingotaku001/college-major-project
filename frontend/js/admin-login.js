/* ================= LOGIN ================= */

function loginAdmin(){

    const password =
    document.getElementById(
        "adminPassword"
    ).value.trim();

    if(!password){

        alert(
            "Enter password"
        );

        return;
    }

    if(password === "gamingotaku"){

        localStorage.setItem(
            "admin",
            "true"
        );

        alert(
            "Login successful"
        );

        window.location.href =
        "dashboard.html";
    }

    else{

        alert(
            "Incorrect password"
        );
    }
}