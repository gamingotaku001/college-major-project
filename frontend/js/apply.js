// ===============================
// 🔁 SWITCH
// ===============================
const switchToTeacher = document.getElementById("switchToTeacher");
const backToStudent = document.getElementById("backToStudent");

const studentFields = document.getElementById("studentFields");
const teacherFields = document.getElementById("teacherFields");
const parentFields = document.getElementById("parentFields");

const title = document.getElementById("formTitle");
const teacherSwitchText = document.getElementById("teacherSwitchText");

switchToTeacher.onclick = () => {
    studentFields.style.display = "none";
    parentFields.style.display = "none";
    teacherFields.style.display = "block";

    title.innerText = "Teacher Application";

    backToStudent.style.display = "block";
    teacherSwitchText.style.display = "none";
};

backToStudent.onclick = () => {
    studentFields.style.display = "block";
    parentFields.style.display = "block";
    teacherFields.style.display = "none";

    title.innerText = "Student Application";

    backToStudent.style.display = "none";
    teacherSwitchText.style.display = "block";
};


// ===============================
// 📥 SUBMIT
// ===============================
document.getElementById("applyBtn").onclick = async () => {

    try {

        // ======================
        // 👨‍🎓 STUDENT APPLY
        // ======================
        if (studentFields.style.display !== "none") {

            const data = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phoneNumber: document.getElementById("phoneNumber").value,

                studentClass: document.getElementById("studentClass").value,
                previousSchool: document.getElementById("previousSchool").value,
                previousClass: document.getElementById("previousClass").value,

                parentName: document.getElementById("parentName").value,
                parentPhone: document.getElementById("parentPhone").value,

                city: document.getElementById("city").value,
                address: document.getElementById("address").value
            };

            const res = await fetch("http://localhost:8080/api/apply/students",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("Student application submitted!");
                location.reload();
            } else {
                alert("Error submitting student");
            }
        }

        // ======================
        // 👨‍🏫 TEACHER APPLY
        // ======================
        else {

            const data = {

    firstName:
        document.getElementById("firstName").value,

    lastName:
        document.getElementById("lastName").value,

    email:
        document.getElementById("email").value,

    phoneNumber:
        document.getElementById("phoneNumber").value,

    subjects:
        document.getElementById("subjects").value,

    qualification:
        document.getElementById("qualification").value,

    experience:
        parseInt(
            document.getElementById("experience").value || "0"
        )
};

           const res = await fetch("http://localhost:8080/teachers", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(data)
});

            if (res.ok) {
                alert("Teacher application submitted!");
                location.reload();
            } else {
                alert("Error submitting teacher");
            }
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
};