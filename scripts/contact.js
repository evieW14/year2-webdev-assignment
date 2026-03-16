async function validateForm() {
    const isEmailValid = validateEmail();
    if (!isEmailValid) {
        return false; // stop form submission
    }

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
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

        const data = await response.json();
        console.log("Success:", data);
        alert("You have been added to the mailing list!");

    } catch (error) {
        console.error("Error:", error);
        alert("There was a problem adding you to the mailing list.");
    }

    return false; // prevent page reload
}


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


function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const email = emailInput.value.trim();

    // Reset error message
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
