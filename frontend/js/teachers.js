const teachersGrid =
document.getElementById("teachersGrid");


async function loadTeachers(){

    try{

        const res = await fetch(
            "http://localhost:8080/teachers/approved"
        );

        const teachers = await res.json();


        teachersGrid.innerHTML = "";


        if(teachers.length === 0){

            teachersGrid.innerHTML = `

                <h2>
                    No teachers found.
                </h2>

            `;

            return;
        }


        teachers.forEach(teacher => {

            teachersGrid.innerHTML += `

                <div class="teacher-card">

                    <div class="teacher-top">

                        <div class="teacher-image">

                            <i class="fa-solid fa-user"></i>

                        </div>

                        <div class="teacher-name">

                            <h2>
                                ${teacher.firstName}
                                ${teacher.lastName}
                            </h2>

                            <p>
    ${teacher.assignedClass 
        ? `Assigned Class: ${teacher.assignedClass}`
        : "Faculty Member"
    }
</p>

                        </div>

                    </div>

                    <div class="teacher-details">

                        <div class="teacher-info">

                            <span>
                                Subject
                            </span>

                            <p>
                                ${teacher.subjects || "Not Assigned"}
                            </p>

                        </div>

                        <div class="teacher-info">

                            <span>
                                Qualification
                            </span>

                            <p>
                                ${teacher.qualification || "N/A"}
                            </p>

                        </div>

                        <div class="teacher-info">

                            <span>
                                Experience
                            </span>

                            <p>
                                ${teacher.experience || 0} Years
                            </p>

                        </div>

                    </div>

                </div>
            `;
        });

    }
    catch(err){

        console.error(err);

        teachersGrid.innerHTML = `

            <h2>
                Error loading teachers.
            </h2>

        `;
    }
}


loadTeachers();