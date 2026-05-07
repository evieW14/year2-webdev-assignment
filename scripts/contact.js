// Handle contact form validation
async function validateForm(event) {
    event.preventDefault(); // stops the page refresh

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    if (!isEmailValid || !isNameValid) {
        return false;
    }

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    let response;
    try {
        response = await fetch("https://mudfoot.doc.stu.mmu.ac.uk/ash/api/mailinglist", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name: fullName, email: email })
        });
    } catch (error) {
        console.error("Error:", error);
        showFormStatus("Could not reach the server. Please check your connection", "error");
    }

    // Handle error response from server
    if (!response.ok) {
        const errorText = await response.json().catch(() => null);
        const responseMessage = errorData?.message || errorData?.error || response.statusText;
        console.error("Server error:", responseMessage);
        showFormStatus(`There was a problem signing you up: ${responseMessage}`, "error");
        return;
    }

    const data = await response.json();
    console.log("Success:", data);
    showFormStatus("You have been added to the mailing list!", "success");
    document.querySelector(".mailing-form").reset();

}

// Show status of the form (error/success)
function showFormStatus(message, type) {
    const formStatus = document.getElementById("formStatus");
    formStatus.textContent = message;
    formStatus.className = type;
}

// Validate name
function validateName() {
    const nameInput = document.getElementById("fullName");
    const nameError = document.getElementById("nameError");
    const name = nameInput.value.trim();

    nameError.textContent = "";
    nameError.style.display = "none";

    const fullNameRegex = /^[A-Za-z][A-Za-z'-]*(?: [A-Za-z][A-Za-z'-]*)+$/;

    if (!fullNameRegex.test(name)) {
        nameError.textContent = "Invalid full name.";
        nameError.style.display = "block";
        return false;
    }

    return true;
}

// Validate email
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

// Clear errors on input
document.getElementById("fullName").addEventListener("input", () => {
    document.getElementById("nameError").style.display = "none";
    document.getElementById("formStatus").textContent = "";
    document.getElementById("formStatus").className = "";
});

document.getElementById("email").addEventListener("input", () => {
    document.getElementById("emailError").style.display = "none";
    document.getElementById("formStatus").textContent = "";
    document.getElementById("formStatus").className = "";
});

document.querySelector(".mailing-form").addEventListener("submit", validateForm);