// --- VALIDATE FORM ---

async function validateHofForm() {
    event.preventDefault();  // stops page reload completely
    document.getElementById("hofResults").innerHTML = "";
    document.getElementById("hofHeader").innerHTML = "";

    const isYearValid = validateYear();
    if (!isYearValid) return false;

    const year = document.getElementById("year").value.trim();

    try {
        const response = await fetch(
            `https://mudfoot.doc.stu.mmu.ac.uk/ash/api/halloffame?year=${year}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (!validateData(data)) {
            document.getElementById("hofHeader").innerHTML =
                `<h2>No Hall of Fame data found for year: ${year}</h2>`;
            return;
        }
        console.log("Success:", data);
        renderHofResults(data);

    } catch (error) {
        console.error("Error:", error);
        alert("There was a problem fetching Hall of Fame data.");
    }

    return false;
}

// --- YEAR VALIDATION ---
function validateYear() {
    const yearInput = document.getElementById("year");
    const yearError = document.getElementById("yearError");
    const year = yearInput.value.trim();

    yearError.textContent = "";
    yearError.style.display = "none";

    const yearRegex = /^\d{4}$/;

    if (!yearRegex.test(year)) {
        yearError.textContent = "Invalid Year - Please Try Again";
        yearError.style.display = "block";
        return false;
    }
    return true;
}

function fixEncoding(str) {
    return str
        .replace(/â€¯/g, " ")   // replace narrow no-break space with normal space
        .normalize("NFC");      // normalize Unicode
}

function validateInductedBy(str) {
    if (str.includes("undefined")) {
        return null;
    } else {
        return str;
    }
}

function validateData(data) {
    return data && Array.isArray(data.data) && data.data.length > 0;
}

// --- RENDER RESULTS ---
function renderHofResults(data) {
    const container = document.getElementById("hofResults");
    if (!container) return;

    document.getElementById("hofHeader").innerHTML =
        `<h2>Hall of Fame - ${data.year}</h2>`;

    data.data.forEach(entry => {
        const card = document.createElement("div");
        card.classList.add("hof-card");

        // Only show inducted members if they exist
        let membersSection = "";
        if (entry.inducted_members.length > 0) {
            const membersList = entry.inducted_members
                .map(m => `<li><a href="${m.url}" target="_blank">${fixEncoding(m.name)}</a></li>`)
                .join("")   ;

            membersSection = `
                <details>
                    <summary>Inducted Members</summary>
                    <ul>${membersList}</ul>
                </details>
            `;
        }

        card.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Rock_and_Roll_Hall_of_Fame_-_Joy_of_Museums_1.jpg/960px-Rock_and_Roll_Hall_of_Fame_-_Joy_of_Museums_1.jpg" alt="${entry.image.title}">
            <div class="hof-info">
                <h3>
                    <a href="${entry.band.url}" target="_blank">${entry.band.name}</a>
                </h3>

                <p><strong>Inducted by:</strong>
                    ${
                        entry.inducted_by && entry.inducted_by.name && entry.inducted_by.url
                            ? `<a href="${entry.inducted_by.url}" target="_blank">
                                   ${validateInductedBy(entry.inducted_by.name)}
                               </a>`
                            : "N/A"
                    }
                </p>
                ${membersSection}
            </div>
        `;

        container.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    loadInitialYear();
});

async function loadInitialYear() {
    const defaultYear = 2021;
    document.getElementById("year").value = defaultYear;

    try {
        const response = await fetch(
            `https://mudfoot.doc.stu.mmu.ac.uk/ash/api/halloffame?year=${defaultYear}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        renderHofResults(data);

    } catch (error) {
        console.error("Error:", error);
        alert("There was a problem fetching initial Hall of Fame data.");
    }
}
