/* ===============================
🔹 GET LOGIN BUTTON
=============================== */

const loginBtn =
document.getElementById(
    "loginBtn"
);

/* ===============================
🔹 STUDENT LOGIN
=============================== */

if(loginBtn){

    loginBtn.addEventListener(

        "click",

        async () => {

            const roll =
            document.querySelector(
                "input[placeholder='Roll Number']"
            ).value.trim();

            const studentClass =
            document.querySelector(
                "input[placeholder='Class']"
            ).value.trim();

            const password =
            document.querySelector(
                "input[type='password']"
            ).value.trim();

            if(
                !roll ||
                !studentClass ||
                !password
            ){

                alert(
                    "Please fill all fields"
                );

                return;
            }

            try{

                const students =
                await fetch(
                    "http://localhost:8080/students"
                )

                .then(r => r.json());

                const found =
                students.find(s =>

                    s.rollNumber === roll &&

                    s.studentClass
                    .toLowerCase() ===

                    studentClass
                    .toLowerCase() &&

                    s.password === password
                );

                if(found){

                    localStorage.setItem(
                        "role",
                        "student"
                    );

                    localStorage.setItem(
                        "studentData",
                        JSON.stringify(found)
                    );

                    alert(
                        "Login successful"
                    );

                    window.location.href =
                    "student-profile.html";
                }

                else{

                    alert(
                        "Invalid credentials"
                    );
                }
            }

            catch(err){

                console.error(err);

                alert(
                    "Server error"
                );
            }
        }
    );
}

/* ===============================
🔹 CREATE PASSWORD REDIRECT
=============================== */

const createPassBtn =
document.getElementById(
    "createPassBtn"
);

if(createPassBtn){

    createPassBtn.addEventListener(

        "click",

        () => {

            window.location.href =
            "set-password.html";
        }
    );
}

/* ===============================
🔹 SET PASSWORD PAGE
=============================== */

const setPassBtn =
document.getElementById(
    "setPassBtn"
);

if(setPassBtn){

    setPassBtn.addEventListener(

        "click",

        async () => {

            const inputs =
            document.querySelectorAll(
                "input"
            );

            const roll =
            inputs[0].value.trim();

            const studentClass =
            inputs[1].value.trim();

            const pass1 =
            inputs[2].value.trim();

            const pass2 =
            inputs[3].value.trim();

            if(
                !roll ||
                !studentClass ||
                !pass1 ||
                !pass2
            ){

                alert(
                    "All fields required"
                );

                return;
            }

            if(pass1 !== pass2){

                alert(
                    "Passwords do not match"
                );

                return;
            }

            try{

                const res =
                await fetch(

                    "http://localhost:8080/students/set-password",

                    {

                        method:"PUT",

                        headers:{
                            "Content-Type":
                            "application/json"
                        },

                        body:JSON.stringify({

                            rollNumber:roll,

                            studentClass:
                            studentClass,

                            password:pass1
                        })
                    }
                );

                if(res.ok){

                    alert(
                        "Password created successfully"
                    );

                    window.location.href =
                    "student-login.html";
                }

                else{

                    alert(
                        "Student not found"
                    );
                }
            }

            catch(err){

                console.error(err);

                alert(
                    "Server error"
                );
            }
        }
    );
}