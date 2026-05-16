const BASE =
"http://localhost:8080";

/* ================= LOGIN ================= */

document
.getElementById("teacherLoginBtn")

.addEventListener(
    "click",

    async () => {

        const email =
        document.querySelector(
            "input[placeholder='Email']"
        ).value.trim();

        const phone =
        document.querySelector(
            "input[placeholder='Phone Number']"
        ).value.trim();

        if(!email || !phone){

            alert(
                "Please fill all fields"
            );

            return;
        }

        try{

            const teachers =
            await fetch(
                `${BASE}/teachers`
            )

            .then(r => r.json());

            const found =
            teachers.find(t =>

                t.email === email &&

                t.phoneNumber === phone
            );

            if(found){

                localStorage.setItem(
                    "teacher",
                    JSON.stringify(found)
                );

                localStorage.setItem(
                    "role",
                    "teacher"
                );

                alert(
                    "Teacher login successful"
                );

                window.location.href =
                "teacher-dashboard.html";
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

/* ================= GO BACK ================= */

function goBack(){

    window.location.href =
    "student-login.html";
}