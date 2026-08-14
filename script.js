/* ================= MOBILE MENU ================= */

function toggleMenu() {
    const nav = document.getElementById("navMenu");

    if (nav) {
        nav.classList.toggle("active");
    }
}


/* Close mobile menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

        const nav = document.getElementById("navMenu");

        if (nav) {
            nav.classList.remove("active");
        }

    });

});


/* ================= FOOTER YEAR ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================= GITHUB PROJECTS ================= */

async function loadGitHubProjects() {

    const container = document.getElementById("projectContainer");

    if (!container) {
        console.error("ERROR: projectContainer was not found.");
        return;
    }

    container.innerHTML = `
        <p class="loading">
            Loading GitHub projects...
        </p>
    `;

    try {

        const githubURL =
            "https://api.github.com/users/mnandu0011-design/repos?sort=updated&per_page=12";

        const response = await fetch(githubURL);

        console.log("GitHub response:", response);

        if (!response.ok) {

            throw new Error(
                `GitHub API Error: ${response.status}`
            );

        }

        const repositories = await response.json();

        console.log("Repositories:", repositories);


        /* No repositories */

        if (!repositories || repositories.length === 0) {

            container.innerHTML = `
                <div class="project-card">

                    <h3>
                        No Public Projects
                    </h3>

                    <p>
                        No public repositories were found
                        on the GitHub profile.
                    </p>

                    <a
                        href="https://github.com/mnandu0011-design"
                        target="_blank"
                    >
                        Open GitHub Profile →
                    </a>

                </div>
            `;

            return;
        }


        /* Clear loading message */

        container.innerHTML = "";


        /* Create project cards */

        repositories.forEach(function (repo) {

            const card =
                document.createElement("div");

            card.className =
                "project-card";


            const language =
                repo.language || "PROJECT";


            const description =
                repo.description ||
                "A project from my GitHub profile.";


            card.innerHTML = `

                <div>

                    <p class="green-text">
                        ${escapeHTML(language)}
                    </p>

                    <h3>
                        ${escapeHTML(repo.name)}
                    </h3>

                    <p>
                        ${escapeHTML(description)}
                    </p>

                </div>


                <a
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub →
                </a>

            `;


            container.appendChild(card);

        });

    }


    catch (error) {

        console.error(
            "GitHub projects error:",
            error
        );


        container.innerHTML = `

            <div class="project-card">

                <p class="green-text">
                    GITHUB
                </p>

                <h3>
                    GitHub Projects
                </h3>

                <p>
                    The projects could not be loaded
                    automatically right now.
                </p>

                <a
                    href="https://github.com/mnandu0011-design"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open GitHub Profile →
                </a>

            </div>

        `;

    }

}


/* ================= SECURITY ================= */

function escapeHTML(text) {

    return String(text).replace(
        /[&<>"']/g,
        function (character) {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return entities[character];

        }
    );

}


/* ================= START WEBSITE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadGitHubProjects();

    }
);