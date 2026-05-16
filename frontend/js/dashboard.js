const BASE = "http://localhost:8080";

/* ================= ADMIN AUTH ================= */

const admin =
localStorage.getItem(
    "admin"
);

if(admin !== "true"){

    window.location.href =
    "admin-login.html";
}

// ================= NAVIGATION =================

function showView(view) {

    /* HIDE ALL */

    document.getElementById(
        "dashboardView"
    ).style.display = "none";

    document.getElementById(
        "studentsView"
    ).style.display = "none";

    document.getElementById(
        "teachersView"
    ).style.display = "none";

    document.getElementById(
        "noticesView"
    ).style.display = "none";

    /* SHOW SELECTED */

    document.getElementById(
        view + "View"
    ).style.display = "block";

    /* DASHBOARD */

    if (view === "dashboard") {

        loadApplications();

        loadDashboardStats();
    }

    /* STUDENTS */

    if (view === "students") {

        loadStudents();
    }

    /* TEACHERS */

    if (view === "teachers") {

        loadTeachers();
    }

    /* NOTICES */

    if (view === "notices") {

        loadNotices();
    }
}

// ================= APPLICATIONS =================
async function loadApplications() {

    const students = await fetch(`${BASE}/api/apply/students`)
        .then(r => r.json());

    const teachers = await fetch(`${BASE}/teachers/pending`)
        .then(r => r.json());

    const div = document.getElementById("applications");

    div.innerHTML = "";

    // STUDENTS
    students.forEach(s => {

        div.innerHTML += `
        <div class="application-card">

            <h3>
                Student:
                ${s.firstName} ${s.lastName}
            </h3>

            <button class="view-btn"
                onclick="viewStudent(${s.id})">
                View
            </button>

            <button class="edit-btn"
                onclick="approve(${s.id})">
                Approve
            </button>

            <button class="delete-btn"
                onclick="reject(${s.id})">
                Reject
            </button>

        </div>
        `;
    });

    // TEACHERS
    teachers.forEach(t => {

        div.innerHTML += `
        <div class="application-card">

            <h3>
                Teacher:
                ${t.firstName} ${t.lastName}
            </h3>

            <button class="view-btn"
                onclick="viewTeacher(${t.id})">
                View
            </button>

            <button class="edit-btn"
                onclick="approveTeacher(${t.id})">
                Approve
            </button>

            <button class="delete-btn"
                onclick="rejectTeacher(${t.id})">
                Reject
            </button>

        </div>
        `;
    });
}

// ================= APPROVE STUDENT =================
async function approve(id) {

    await fetch(
        `${BASE}/students/${id}/status?status=APPROVED`,
        {
            method: "PUT"
        }
    );

    loadApplications();
    loadStudents();
}

// ================= REJECT STUDENT =================
async function reject(id) {

    await fetch(
        `${BASE}/students/${id}/status?status=REJECTED`,
        {
            method: "PUT"
        }
    );

    loadApplications();
}

// ================= APPROVE TEACHER =================
async function approveTeacher(id) {

    await fetch(
        `${BASE}/teachers/${id}/status?status=APPROVED`,
        {
            method: "PUT"
        }
    );

    loadApplications();
    loadTeachers();
}

// ================= REJECT TEACHER =================
async function rejectTeacher(id) {

    await fetch(
        `${BASE}/teachers/${id}/status?status=REJECTED`,
        {
            method: "PUT"
        }
    );

    loadApplications();
}

// ================= LOAD STUDENTS =================
async function loadStudents() {

    const data = await fetch(`${BASE}/students`)
        .then(r => r.json());

    // SORT
    data.sort((a, b) => {

        if (
            (parseInt(a.studentClass) || 0) !==
            (parseInt(b.studentClass) || 0)
        ) {

            return (
                (parseInt(a.studentClass) || 0) -
                (parseInt(b.studentClass) || 0)
            );
        }

        return (
            (parseInt(a.rollNumber) || 0) -
            (parseInt(b.rollNumber) || 0)
        );
    });

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    data.forEach(s => {

        table.innerHTML += `
        <tr>

            <td>
                ${s.firstName} ${s.lastName}
            </td>

            <td>
                ${s.studentClass || "-"}
            </td>

            <td>
                ${s.rollNumber || "-"}
            </td>

            <td>

                <button class="view-btn"
                    onclick="viewStudent(${s.id})">
                    View
                </button>

                <button class="edit-btn"
                    onclick="editStudent(${s.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${s.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    });
}

// ================= VIEW STUDENT =================
async function viewStudent(id) {

    const s = await fetch(`${BASE}/students/${id}`)
        .then(r => r.json());

    document.getElementById("modalContent").innerHTML = `

        <h3>Student Details</h3>

        <p>
            <b>Name:</b>
            ${s.firstName} ${s.lastName}
        </p>

        <p>
            <b>Email:</b>
            ${s.email}
        </p>

        <p>
            <b>Phone:</b>
            ${s.phoneNumber}
        </p>

        <p>
            <b>Class:</b>
            ${s.studentClass || "-"}
        </p>

        <p>
            <b>Roll:</b>
            ${s.rollNumber || "-"}
        </p>

        <p>
            <b>Parent:</b>
            ${s.parentName}
        </p>

        <p>
            <b>Parent Phone:</b>
            ${s.parentPhone}
        </p>

        <p>
            <b>Address:</b>
            ${s.address}
        </p>

        <p>
            <b>City:</b>
            ${s.city}
        </p>
    `;

    document.getElementById("modal")
        .classList.add("show");
}

// ================= EDIT STUDENT =================
async function editStudent(id) {

    const s = await fetch(`${BASE}/students/${id}`)
        .then(r => r.json());

    document.getElementById("modalContent").innerHTML = `

        <h3>Edit Student</h3>

        <div class="form-group">
            <label>First Name</label>
            <input id="sFirst"
                value="${s.firstName || ""}">
        </div>

        <div class="form-group">
            <label>Last Name</label>
            <input id="sLast"
                value="${s.lastName || ""}">
        </div>

        <div class="form-group">
            <label>Email</label>
            <input id="sEmail"
                value="${s.email || ""}">
        </div>

        <div class="form-group">
            <label>Phone</label>
            <input id="sPhone"
                value="${s.phoneNumber || ""}">
        </div>

        <div class="form-group">

    <label>Class</label>

    <select id="sClass">

        <option value="">Select Class</option>

        <option value="1A">1A</option>
        <option value="1B">1B</option>
        <option value="1C">1C</option>

        <option value="2A">2A</option>
        <option value="2B">2B</option>
        <option value="2C">2C</option>

        <option value="3A">3A</option>
        <option value="3B">3B</option>
        <option value="3C">3C</option>

        <option value="4A">4A</option>
        <option value="4B">4B</option>
        <option value="4C">4C</option>

        <option value="5A">5A</option>
        <option value="5B">5B</option>
        <option value="5C">5C</option>

        <option value="6A">6A</option>
        <option value="6B">6B</option>
        <option value="6C">6C</option>

        <option value="7A">7A</option>
        <option value="7B">7B</option>
        <option value="7C">7C</option>

        <option value="8A">8A</option>
        <option value="8B">8B</option>
        <option value="8C">8C</option>

        <option value="9A">9A</option>
        <option value="9B">9B</option>
        <option value="9C">9C</option>

        <option value="10A">10A</option>
        <option value="10B">10B</option>
        <option value="10C">10C</option>

    </select>

</div>

        <div class="form-group">
            <label>Roll Number</label>
            <input id="sRoll"
                value="${s.rollNumber || ""}">
        </div>

        <div class="form-group">
            <label>Parent Name</label>
            <input id="sParent"
                value="${s.parentName || ""}">
        </div>

        <div class="form-group">
            <label>Parent Phone</label>
            <input id="sParentPhone"
                value="${s.parentPhone || ""}">
        </div>

        <div class="form-group">
            <label>Address</label>
            <input id="sAddress"
                value="${s.address || ""}">
        </div>

        <div class="form-group">
            <label>City</label>
            <input id="sCity"
                value="${s.city || ""}">
        </div>

        <button class="save-btn"
            onclick="saveStudent(${id})">

            Save Changes

        </button>
    `;

    document.getElementById("modal")
        .classList.add("show");
        document.getElementById("sClass").value =
    s.studentClass || "";
}

// ================= SAVE STUDENT =================
async function saveStudent(id) {

    const body = {

        firstName:
            document.getElementById("sFirst").value,

        lastName:
            document.getElementById("sLast").value,

        email:
            document.getElementById("sEmail").value,

        phoneNumber:
            document.getElementById("sPhone").value,

        studentClass:
            document.getElementById("sClass").value,

        rollNumber:
            document.getElementById("sRoll").value,

        parentName:
            document.getElementById("sParent").value,

        parentPhone:
            document.getElementById("sParentPhone").value,

        address:
            document.getElementById("sAddress").value,

        city:
            document.getElementById("sCity").value
    };

    const res = await fetch(`${BASE}/students/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(body)
    });

    if (!res.ok) {

        alert("Failed to update student ❌");

        return;
    }

    closeModal();

    loadStudents();
}

// ================= DELETE STUDENT =================
async function deleteStudent(id) {

    const ok = confirm(
        "Delete this student permanently?"
    );

    if (!ok) return;

    await fetch(`${BASE}/students/${id}`, {

        method: "DELETE"
    });

    loadStudents();
}


// ================= LOAD TEACHERS =================
async function loadTeachers() {

    const data = await fetch(`${BASE}/teachers`)
        .then(r => r.json());

    // 🔥 SORT BY CLASS
    data.sort((a, b) => {

        return (a.assignedClass || "")
            .localeCompare(b.assignedClass || "");
    });

    // 🔥 SEARCH
    const search = document
        .getElementById("teacherSearch")
        ?.value
        .toLowerCase() || "";

    const table = document.getElementById("teacherTable");

    table.innerHTML = "";

    data
    .filter(t => {

        return (

            `${t.firstName} ${t.lastName}`
            .toLowerCase()
            .includes(search)

            ||

            (t.subjects || "")
            .toLowerCase()
            .includes(search)

            ||

            (t.assignedClass || "")
            .toLowerCase()
            .includes(search)
        );
    })
    .forEach(t => {

        table.innerHTML += `
        <tr>

            <td>
                ${t.firstName} ${t.lastName}
            </td>

            <td>
                ${t.subjects || "-"}
            </td>

            <td>
                ${t.assignedClass || "-"}
            </td>

            <td>

                <button class="view-btn"
                    onclick="viewTeacher(${t.id})">
                    View
                </button>

                <button class="edit-btn"
                    onclick="editTeacher(${t.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTeacher(${t.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    });
}

// ================= VIEW TEACHER =================
async function viewTeacher(id) {

    const t = await fetch(`${BASE}/teachers/${id}`)
        .then(r => r.json());

    document.getElementById("modalContent").innerHTML = `

        <h3>Teacher Details</h3>

        <p>
            <b>Name:</b>
            ${t.firstName} ${t.lastName}
        </p>

        <p>
            <b>Email:</b>
            ${t.email}
        </p>

        <p>
            <b>Phone:</b>
            ${t.phoneNumber}
        </p>

        <p>
            <b>Subjects:</b>
            ${t.subjects || "-"}
        </p>

        <p>
            <b>Class Teacher:</b>
            ${t.assignedClass || "-"}
        </p>

        <p>
            <b>Qualification:</b>
            ${t.qualification}
        </p>

        <p>
            <b>Experience:</b>
            ${t.experience}
        </p>
    `;

    document.getElementById("modal")
        .classList.add("show");
}

// ================= EDIT TEACHER =================
async function editTeacher(id) {

    const t = await fetch(`${BASE}/teachers/${id}`)
        .then(r => r.json());

    document.getElementById("modalContent").innerHTML = `

        <h3>Edit Teacher</h3>

        <div class="form-group">
            <label>First Name</label>
            <input id="tFirst"
                value="${t.firstName || ""}">
        </div>

        <div class="form-group">
            <label>Last Name</label>
            <input id="tLast"
                value="${t.lastName || ""}">
        </div>

        <div class="form-group">
            <label>Email</label>
            <input id="tEmail"
                value="${t.email || ""}">
        </div>

        <div class="form-group">
            <label>Phone</label>
            <input id="tPhone"
                value="${t.phoneNumber || ""}">
        </div>

        <div class="form-group">
            <label>Subjects</label>
            <input id="tSubjects"
                value="${t.subjects || ""}">
        </div>

        <div class="form-group">

    <label>Class Teacher</label>

    <select id="tClass">

        <option value="">None</option>

        <option value="1A">1A</option>
        <option value="1B">1B</option>
        <option value="1C">1C</option>

        <option value="2A">2A</option>
        <option value="2B">2B</option>
        <option value="2C">2C</option>

        <option value="3A">3A</option>
        <option value="3B">3B</option>
        <option value="3C">3C</option>

        <option value="4A">4A</option>
        <option value="4B">4B</option>
        <option value="4C">4C</option>

        <option value="5A">5A</option>
        <option value="5B">5B</option>
        <option value="5C">5C</option>

        <option value="6A">6A</option>
        <option value="6B">6B</option>
        <option value="6C">6C</option>

        <option value="7A">7A</option>
        <option value="7B">7B</option>
        <option value="7C">7C</option>

        <option value="8A">8A</option>
        <option value="8B">8B</option>
        <option value="8C">8C</option>

        <option value="9A">9A</option>
        <option value="9B">9B</option>
        <option value="9C">9C</option>

        <option value="10A">10A</option>
        <option value="10B">10B</option>
        <option value="10C">10C</option>

    </select>

</div>

        <div class="form-group">
            <label>Qualification</label>
            <input id="tQual"
                value="${t.qualification || ""}">
        </div>

        <div class="form-group">
            <label>Experience</label>
            <input id="tExp"
                value="${t.experience || 0}">
        </div>

        <button class="save-btn"
            onclick="saveTeacher(${id})">

            Save Changes

        </button>
    `;

    document.getElementById("modal")
        .classList.add("show");

    document.getElementById("tClass").value =
    t.assignedClass || "";
}

// ================= SAVE TEACHER =================
async function saveTeacher(id) {

    const body = {

        firstName:
            document.getElementById("tFirst").value,

        lastName:
            document.getElementById("tLast").value,

        email:
            document.getElementById("tEmail").value,

        phoneNumber:
            document.getElementById("tPhone").value,

        subjects:
            document.getElementById("tSubjects").value,

        assignedClass:
            document.getElementById("tClass").value,

        qualification:
            document.getElementById("tQual").value,

        experience:
            parseInt(document.getElementById("tExp").value)
    };

    const res = await fetch(`${BASE}/teachers/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(body)
    });

    if (!res.ok) {

        alert("Failed to update ❌");

        return;
    }

    closeModal();

    loadTeachers();
}

// ================= DELETE TEACHER =================
async function deleteTeacher(id) {

    const ok = confirm("Delete this teacher?");

    if (!ok) return;

    await fetch(`${BASE}/teachers/${id}`, {
        method: "DELETE"
    });

    loadTeachers();
}

// ================= MODAL =================
function closeModal() {
    document.getElementById("modal")
        .classList.remove("show");
}


// ================= INIT =================
loadApplications();
/* ================= DASHBOARD STATS ================= */

async function loadDashboardStats(){

    try{

        /* STUDENTS */

        const students =
        await fetch(`${BASE}/students`)
        .then(r => r.json());

        /* TEACHERS */

        const teachers =
        await fetch(`${BASE}/teachers`)
        .then(r => r.json());

        console.log(teachers);

        /* TODAY ATTENDANCE */

        const today =
        new Date()
        .toISOString()
        .split("T")[0];

        const attendance =
        await fetch(

            `${BASE}/attendance/date?date=${today}`

        )

        .then(r => r.json());

        /* COUNTS */

        document.getElementById(
            "totalStudents"
        ).innerText =
        students.length;

        document.getElementById(
            "totalTeachers"
        ).innerText =
        teachers.length;

        /* PRESENT */

        const present =
        attendance.filter(a =>

            a.status === "PRESENT"

        ).length;

        const total =
        students.length;

        let percent = 0;

        if(total > 0){

            percent = Math.round(

                (present / total) * 100
            );
        }

        /* UI */

        document.getElementById(
            "schoolAttendancePercent"
        ).innerText =
        `${percent}%`;

        document.getElementById(
            "attendanceText"
        ).innerText =

        `${present} Present / ${total} Students`;

        /* CIRCLE */

        const degree =
        percent * 3.6;

        document.querySelector(
            ".attendance-circle"
        ).style.background =

        `conic-gradient(
            #ff5c8a ${degree}deg,
            #444450 ${degree}deg
        )`;

    }

    catch(err){

        console.error(err);
    }

}
    loadDashboardStats();
    /* ================= NOTICES ================= */

function getNotices(){

    return JSON.parse(

        localStorage.getItem(
            "schoolNotices"
        )

    ) || [];
}

/* ================= LOAD ================= */

function loadNotices(){

    const notices =
    getNotices();

    const list =
    document.getElementById(
        "noticeList"
    );

    list.innerHTML = "";

    if(notices.length === 0){

        list.innerHTML = `

            <p>
                No notices yet
            </p>

        `;

        return;
    }

[...notices].reverse().forEach((n,index) => {
        list.innerHTML += `

            <div class="notice-card">

                <h3>

                    ${n.title}

                </h3>

                <p>

                    ${n.message}

                </p>

                <button
                    class="delete-btn"
                    onclick="deleteNotice(${index})"
                >

                    Delete

                </button>

            </div>
        `;
    });
}

/* ================= ADD ================= */

function addNotice(){

    const title =
    document.getElementById(
        "noticeTitle"
    ).value.trim();

    const message =
    document.getElementById(
        "noticeMessage"
    ).value.trim();

    if(!title || !message){

        alert(
            "Fill all fields"
        );

        return;
    }

    const notices =
    getNotices();

    notices.push({

        title,
        message
    });

    localStorage.setItem(

        "schoolNotices",

        JSON.stringify(notices)
    );

    document.getElementById(
        "noticeTitle"
    ).value = "";

    document.getElementById(
        "noticeMessage"
    ).value = "";

    loadNotices();
}

/* ================= DELETE ================= */

function deleteNotice(index){

    const notices =
    getNotices();

    notices.splice(index,1);

    localStorage.setItem(

        "schoolNotices",

        JSON.stringify(notices)
    );

    loadNotices();
}

// ================= LOGOUT =================
function logout() {

    localStorage.removeItem(
        "admin"
    );

    localStorage.removeItem(
        "studentData"
    );

    localStorage.removeItem(
        "teacherData"
    );

    localStorage.removeItem(
        "role"
    );

    sessionStorage.clear();

    window.location.href =
    "index.html";
}