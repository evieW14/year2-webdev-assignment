// Display an error message in the HOF error element
function showHofError(message) {
    const hofError = document.getElementById("hofError");
    if (hofError) hofError.textContent = message;
}

// Handle validating the year selection form
async function validateHofForm() {
    event.preventDefault();  // stops page reload completely
    document.getElementById("hofResults").innerHTML = "";
    document.getElementById("hofHeader").innerHTML = "";

    const isYearValid = validateYear();
    if (!isYearValid) return false;

    const year = document.getElementById("year").value.trim();

    try {
        // Handle fetching the data from the hall of fame server
        const response = await fetch(
            `https://mudfoot.doc.stu.mmu.ac.uk/ash/api/halloffame?year=${year}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // Return clear message for no data returned
        if (!validateData(data)) {
            document.getElementById("hofHeader").innerHTML =
                `<h2>No Hall of Fame data found for year: ${year}</h2>`;
            return;
        }

        // Handle successful response
        console.log("Success:", data);
        renderHofResults(data);

    } catch (error) {
        console.error("Error:", error);
        showHofError("There was a problem fetching Hall of Fame data.");
    }

    return false;
}

// Validate the year input
function validateYear() {
    const yearInput = document.getElementById("year");
    const yearError = document.getElementById("yearError");
    const year = yearInput.value.trim();

    yearError.textContent = "";
    yearError.style.display = "none";

    const yearRegex = /^\d{4}$/;

    // Alert user on error for year validation
    if (!yearRegex.test(year)) {
        yearError.textContent = "Invalid Year - Please Try Again";
        yearError.style.display = "block";
        return false;
    }
    return true;
}

// Fix names for responses
function fixEncoding(str) {
    return str
        .replace(/â€¯/g, " ")   // replace narrow no-break space with normal space
        .normalize("NFC");      // normalize Unicode
}

// Validate if inductedBy field result
// Inducted By will not be shown if 'undefined', to keep the page clean
function validateInductedBy(str) {
    if (str.includes("undefined")) {
        return null;
    } else {
        return str;
    }
}

// Validate their is return data
function validateData(data) {
    return data && Array.isArray(data.data) && data.data.length > 0;
}

// Render results from the Hall of Fame server
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

        // Images returned from the server are not accessible so replaced with static Hall of Fame image
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

// Upon page being loaded, populate with an initial year selected
window.addEventListener("DOMContentLoaded", () => {
    loadInitialYear();
});

// Load '2021' data as initial data
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
        showHofError("There was a problem fetching initial Hall of Fame data.");
    }
}
