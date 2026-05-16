/* ================= SIDEBAR ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const menuBtn =
        document.getElementById(
            "menuBtn"
        );

        const sidebar =
        document.getElementById(
            "sidebar"
        );

        const closeSidebar =
        document.getElementById(
            "closeSidebar"
        );

        const overlay =
        document.getElementById(
            "overlay"
        );

        /* SAFETY CHECK */

        if(
            !menuBtn ||
            !sidebar ||
            !closeSidebar ||
            !overlay
        ){

            console.error(
                "Sidebar elements missing"
            );

            return;
        }

        /* ================= OPEN ================= */

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.add(
                    "active"
                );

                overlay.classList.add(
                    "active"
                );
            }
        );

        /* ================= CLOSE BUTTON ================= */

        closeSidebar.addEventListener(
            "click",
            closeMenu
        );

        /* ================= OVERLAY CLOSE ================= */

        overlay.addEventListener(
            "click",
            closeMenu
        );

        /* ================= ESC KEY CLOSE ================= */

        document.addEventListener(
            "keydown",
            (e) => {

                if(e.key === "Escape"){

                    closeMenu();
                }
            }
        );

        /* ================= CLOSE FUNCTION ================= */

        function closeMenu(){

            sidebar.classList.remove(
                "active"
            );

            overlay.classList.remove(
                "active"
            );
        }
    }
);

/* ================= PROFILE ================= */

function openProfile(){

    const role =
    localStorage.getItem("role");

    // STUDENT

    if(role === "student"){

        window.location.href =
        "student-profile.html";
    }

    // TEACHER

    else if(role === "teacher"){

        window.location.href =
        "teacher-dashboard.html";
    }

    // NOT LOGGED IN

    else{

        window.location.href =
        "student-login.html";
    }
}
/* ================= HOME COUNTS ================= */

const BASE =
"http://localhost:8080";

async function loadHomeCounts(){

    try{

        /* STUDENTS */

        const students =
        await fetch(`${BASE}/students`)
        .then(r => r.json());

        /* TEACHERS */

        const teachers =
        await fetch(`${BASE}/teachers`)
        .then(r => r.json());

        /* UI */

        document.getElementById(
            "homeStudentCount"
        ).innerText =
        students.length;

        document.getElementById(
            "homeTeacherCount"
        ).innerText =
        teachers.length;
    }

    catch(err){

        console.error(
            "Home count error:",
            err
        );
    }
}

/* ================= LOAD ================= */

loadHomeCounts();
/* ================= NOTICES ================= */

function openNotices(){

    const role =
    localStorage.getItem(
        "role"
    );

    /* STUDENT */

    if(role === "student"){

        window.location.href =
        "notices.html";
    }

    /* TEACHER */

    else if(role === "teacher"){

        window.location.href =
        "notices.html";
    }

    /* NOT LOGGED IN */

    else{

        alert(
            "Please login first"
        );

        window.location.href =
        "student-login.html";
    }
}