const BASE =
"http://localhost:8080";

/* ================= STUDENT ================= */

const student =
JSON.parse(
    localStorage.getItem(
        "studentData"
    )
);

/* ================= AUTH ================= */

if(!student){

    window.location.href =
    "student-login.html";
}

/* ================= LOAD PAGE ================= */

window.onload = () => {

    /* PROFILE */

    document.getElementById(
        "studentName"
    ).innerText =

    `${student.firstName}
    ${student.lastName}`;

    document.getElementById(
        "studentClass"
    ).innerText =

    student.studentClass || "-";

    document.getElementById(
        "studentRoll"
    ).innerText =

    student.rollNumber || "-";

    document.getElementById(
        "studentEmail"
    ).innerText =

    student.email || "-";

    document.getElementById(
        "parentName"
    ).innerText =

    student.parentName || "-";

    document.getElementById(
        "parentPhone"
    ).innerText =

    student.parentPhone || "-";

    /* ATTENDANCE */

    loadAttendance();
};

/* ================= ATTENDANCE ================= */

async function loadAttendance(){

    try{

        const records =
        await fetch(

            `${BASE}/attendance/student/${student.id}`

        )

        .then(r => r.json());

        /* PRESENT */

        const present =
        records.filter(r =>

            r.status === "PRESENT"

        ).length;

        /* ABSENT */

        const absent =
        records.filter(r =>

            r.status === "ABSENT"

        ).length;

        /* TOTAL */

        const total =
        records.length;

        /* PERCENTAGE */

        let percent = 0;

        if(total > 0){

            percent = Math.round(

                (present / total) * 100
            );
        }

        /* UI */

        document.getElementById(
            "presentCount"
        ).innerText = present;

        document.getElementById(
            "absentCount"
        ).innerText = absent;

        document.getElementById(
            "attendancePercent"
        ).innerText =
        `${percent}%`;

        /* CIRCLE */

        const degree =
        percent * 3.6;

        document.querySelector(
            ".circle"
        ).style.background =

        `conic-gradient(
            #ff5c8a ${degree}deg,
            #444450 ${degree}deg
        )`;

        /* HISTORY */

        loadHistory(records);
    }

    catch(err){

        console.error(err);
    }
}

/* ================= HISTORY ================= */
/* ================= HISTORY ================= */

function loadHistory(records){

    const history =
    document.getElementById(
        "attendanceHistory"
    );

    history.innerHTML = "";

    if(records.length === 0){

        history.innerHTML = `

            <div class="history-item">

                No attendance records yet

            </div>

        `;

        return;
    }

    /* LATEST FIRST */

    records.reverse();

    /* ONLY LATEST 3 */

    const latest =
    records.slice(0,3);

    latest.forEach(record => {

        let statusClass =
        "present-status";

        let statusText =
        "Present";

        if(record.status === "ABSENT"){

            statusClass =
            "absent-status";

            statusText =
            "Absent";
        }

        history.innerHTML += `

            <div class="history-item">

                <div class="history-top">

                    <div>

                        <strong>

                            ${record.attendanceDate}

                        </strong>

                        <p>

                            Attendance Record

                        </p>

                    </div>

                    <span class="${statusClass}">

                        ${statusText}

                    </span>

                </div>

            </div>
        `;
    });
}
/* ================= HOME ================= */

function goHome(){

    window.location.href =
    "index.html";
}