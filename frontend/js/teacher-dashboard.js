const BASE = "http://localhost:8080";

let attendanceData = [];

/* ================= VIEWS ================= */

function showView(view){

    document.getElementById(
        "profileView"
    ).style.display = "none";

    document.getElementById(
        "attendanceView"
    ).style.display = "none";

    document.getElementById(
        "noticesView"
    ).style.display = "none";

    document.getElementById(
        view + "View"
    ).style.display = "block";
}

/* ================= TEACHER ================= */

const teacher =
JSON.parse(localStorage.getItem("teacher"));

/* ================= PAGE LOAD ================= */

window.onload = () => {

    /* ================= AUTH CHECK ================= */

    if(!teacher){

        window.location.href =
        "teacher-login.html";

        return;
    }

    /* ================= PROFILE CARD ================= */

    document.getElementById(
        "profileName"
    ).innerText =
    `${teacher.firstName} ${teacher.lastName}`;

    document.getElementById(
        "profileEmail"
    ).innerText =
    teacher.email || "-";

    document.getElementById(
        "profilePhone"
    ).innerText =
    teacher.phoneNumber || "-";

    document.getElementById(
        "profileSubject"
    ).innerText =
    teacher.subjects || "-";

    document.getElementById(
        "profileClass"
    ).innerText =
    teacher.assignedClass || "None";

    document.getElementById(
        "profileQualification"
    ).innerText =
    teacher.qualification || "-";

    document.getElementById(
        "profileExperience"
    ).innerText =
    `${teacher.experience || 0} Years`;
};

/* ================= LOAD STUDENTS ================= */

async function loadStudents(){

    const table =
    document.getElementById(
        "attendanceTable"
    );

    table.innerHTML = "";

    attendanceData = [];

    if(!teacher?.assignedClass){

        alert(
            "No class assigned to teacher"
        );

        return;
    }

    document.getElementById(
        "classDisplay"
    ).value =
    teacher.assignedClass;

    const students =
    await fetch(`${BASE}/students`)
    .then(r => r.json());

    const classStudents =
    students.filter(s =>
        s.studentClass ===
        teacher.assignedClass
    );

    document.getElementById(
        "totalCount"
    ).innerText =
    classStudents.length;

    classStudents.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>
                ${student.rollNumber || "-"}
            </td>

            <td>
                ${student.firstName}
                ${student.lastName}
            </td>

            <td>

                <div class="status-buttons">

                    <button
                        id="present-${student.id}"

                        class="inactive"

                        onclick="
                        markAttendance(
                            ${student.id},
                            'PRESENT',
                            '${student.firstName} ${student.lastName}',
                            '${student.rollNumber}'
                        )
                        "
                    >

                        Present

                    </button>

                    <button
                        id="absent-${student.id}"

                        class="inactive"

                        onclick="
                        markAttendance(
                            ${student.id},
                            'ABSENT',
                            '${student.firstName} ${student.lastName}',
                            '${student.rollNumber}'
                        )
                        "
                    >

                        Absent

                    </button>

                </div>

            </td>

        </tr>
        `;
    });

    updateStats();
}

/* ================= MARK ================= */

function markAttendance(
    studentId,
    status,
    studentName,
    rollNumber
){

    const date =
    document.getElementById(
        "attendanceDate"
    ).value;

    if(!date){

        alert("Select date first");

        return;
    }

    const existing =
    attendanceData.find(
        a => a.studentId === studentId
    );

    if(existing){

        existing.status = status;
    }
    else{

        attendanceData.push({

            studentId,

            studentName,

            rollNumber,

            studentClass:
            teacher.assignedClass,

            attendanceDate:date,

            status
        });
    }

    const presentBtn =
    document.getElementById(
        `present-${studentId}`
    );

    const absentBtn =
    document.getElementById(
        `absent-${studentId}`
    );

    if(status === "PRESENT"){

        presentBtn.className =
        "present-active";

        absentBtn.className =
        "inactive";
    }
    else{

        absentBtn.className =
        "absent-active";

        presentBtn.className =
        "inactive";
    }

    updateStats();
}

/* ================= STATS ================= */

function updateStats(){

    const present =
    attendanceData.filter(
        a => a.status === "PRESENT"
    ).length;

    const absent =
    attendanceData.filter(
        a => a.status === "ABSENT"
    ).length;

    const total =
    parseInt(
        document.getElementById(
            "totalCount"
        ).innerText
    ) || 0;

    document.getElementById(
        "presentCount"
    ).innerText = present;

    document.getElementById(
        "absentCount"
    ).innerText = absent;

    let percent = 0;

    if(total > 0){

        percent = Math.round(
            (present / total) * 100
        );
    }

    document.getElementById(
        "attendancePercent"
    ).innerText =
    `${percent}%`;

    const circle =
    document.querySelector(".circle");

    const degree =
    percent * 3.6;

    if(circle){

        circle.style.background =
        `conic-gradient(
            #ff5c8a ${degree}deg,
            #444450 ${degree}deg
        )`;
    }
}

/* ================= SAVE ================= */

async function saveAttendance(){

    if(attendanceData.length === 0){

        alert(
            "No attendance selected"
        );

        return;
    }

    try{

        for(const data of attendanceData){

            await fetch(
                `${BASE}/attendance`,
                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(data)
                }
            );
        }

        alert(
            "Attendance saved successfully"
        );

        attendanceData = [];

    }
    catch(err){

        console.error(err);

        alert(
            "Error saving attendance"
        );
    }
}

/* ================= HOME ================= */

function goHome(){

    window.location.href =
    "index.html";
}

/* ================= LOGOUT ================= */

function logout(){

    localStorage.clear();

    window.location.href =
    "index.html";
}
/* ================= HISTORY ================= */

async function loadAttendanceHistory(){

    try{

        const records =
        await fetch(

            `${BASE}/attendance/class/${teacher.assignedClass}`

        )

        .then(r => r.json());

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

        /* GROUP BY DATE */

        const grouped = {};

        records.forEach(record => {

            const date =
            record.attendanceDate;

            if(!grouped[date]){

                grouped[date] = [];
            }

            grouped[date].push(record);
        });

        /* LATEST FIRST */

        const dates =
        Object.keys(grouped).reverse();

        dates.slice(0,3).forEach(date => {

            const dayRecords =
            grouped[date];

            const total =
            dayRecords.length;

            const present =
            dayRecords.filter(r =>
                r.status === "PRESENT"
            ).length;

            const percent =
            Math.round(
                (present / total) * 100
            );

            let badgeClass =
            "green-badge";

            if(percent < 75){

                badgeClass =
                "yellow-badge";
            }

            history.innerHTML += `

                <div class="history-item">

                    <div class="history-top">

                        <div class="history-left">

                            <span class="history-dot">

                            </span>

                            <div>

                                <strong>

                                    ${teacher.assignedClass}
                                    -
                                    ${date}

                                </strong>

                                <p>

                                    ${present}
                                    Present /
                                    ${total - present}
                                    Absent

                                </p>

                            </div>

                        </div>

                        <span class="${badgeClass}">

                            ${percent}%

                        </span>

                    </div>

                </div>
            `;
        });
    }

    catch(err){

        console.error(err);
    }
}
/* ================= FORCE LOAD HISTORY ================= */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        setTimeout(() => {

            loadAttendanceHistory();

        },500);
    }
);
/* ================= VIEW ALL ================= */

function viewAllAttendance(){

    alert(
        "Full attendance page coming soon 😄"
    );
}