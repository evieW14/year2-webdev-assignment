async function validateHofForm() {
    const isYearValid = validateYear();
    if (!isYearValid) return false;

    const year = document.getElementById("year").value.trim();

    try {
        const response = await fetch(
            `https://mudfoot.doc.stu.mmu.ac.uk/ash/api/halloffame?year=${year}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Success:", data);

    } catch (error) {
        console.error("Error:", error);
        alert("There was a problem fetching Hall of Fame data.");
    }

    return false;
}


function validateYear() {
    const yearInput = document.getElementById("year");
    const yearError = document.getElementById("yearError");
    const year = yearInput.value.trim();

    yearError.textContent = "";
    yearError.style.display = "none";

    const yearRegex = /\b\d{4}\b/;

    if (!yearRegex.test(year)) {
        yearError.textContent = "Invalid year.";
        yearError.style.display = "block";
        return false;
    }

    return true;
}

