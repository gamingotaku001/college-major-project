/* ================= LOAD NOTICES ================= */

function loadNotices(){

    const notices =
    JSON.parse(

        localStorage.getItem(
            "schoolNotices"
        )

    ) || [];

    const list =
    document.getElementById(
        "noticeList"
    );

    list.innerHTML = "";

    /* EMPTY */

    if(notices.length === 0){

        list.innerHTML = `

            <div class="notice-card">

                <h3>

                    No Notices

                </h3>

                <p>

                    No school notices available.

                </p>

            </div>

        `;

        return;
    }

    /* SHOW ALL */

[...notices].reverse().forEach(notice => {
    
        list.innerHTML += `

            <div class="notice-card">

                <h3>

                    ${notice.title}

                </h3>

                <p>

                    ${notice.message}

                </p>

            </div>

        `;
    });
}

/* ================= BACK ================= */

function goBack(){

    history.back();
}

/* ================= INIT ================= */

loadNotices();