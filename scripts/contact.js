// Handle contact form validation
async function validateForm() {
    const isEmailValid = validateEmail();
    if (!isEmailValid) {
        return false; // stop form submission
    }

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
        // Send POST request to the mailing list server with the user's input
        const response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/ash/api/mailinglist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fullName,
                email: email
            })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Handle success response with alert.
        const data = await response.json();
        console.log("Success:", data);
        alert("You have been added to the mailing list!");

        document.querySelector(".mailing-form").reset(); //reset form on success
    } catch (error) {
        // Catch error and alert the user
        console.error("Error:", error);
        alert("There was a problem adding you to the mailing list.");
        // Form is not reset, so they can amend their inputs and retry.
    }

    return false;
}


// Handle validating user's email
function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const email = emailInput.value.trim();

    emailError.textContent = "";
    emailError.style.display = "none";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email address.";
        emailError.style.display = "block";
        return false;
    }

    return true;
}

document.getElementById("email").addEventListener("input", () => {
    const emailError = document.getElementById("emailError");
    emailError.textContent = "";
    emailError.style.display = "none";
});
