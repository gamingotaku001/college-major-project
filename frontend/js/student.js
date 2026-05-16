const student = JSON.parse(localStorage.getItem("studentData"));

const div = document.getElementById("studentInfo");

if (student) {
    div.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Roll: ${student.roll}</p>
        <p>Class: ${student.studentClass}</p>
    `;
}