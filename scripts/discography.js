import { beyonceAlbumList } from "./data/beyonce.js";
import { dcAlbumList } from "./data/destinys_child.js";

window.addEventListener("load", () => {
    renderAlbumContent(dcAlbumList, "DC-albums");
    renderAlbumContent(beyonceAlbumList, "Beyonce-albums");
});

// Set currentArtist to be used later
let currentArtist = null;

// Artist Tab Switching Handler
function openArtist(evt, artistName) {
    currentArtist = artistName;

    // Remove active class to hide other tabs
    document.querySelectorAll(".tabLinks").forEach(btn => {
        btn.classList.remove("active");
    });

    // Show selected artist
    document.querySelectorAll(".tabContent").forEach(sec => sec.classList.remove("active"));
    document.getElementById(artistName).classList.add("active");
    evt.currentTarget.classList.add("active");

    // Show correct sub-section
    const dropdown = document.getElementById("subSelect");
    openCategory(dropdown.value);
}

// Category Switching Handler
function openCategory(category) {
    if (!currentArtist) return;

    // Hide other sub contents
    const contents = document.getElementsByClassName("subContent");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // Create artist + category id
    const id = `${currentArtist}-${category}`;
    const section = document.getElementById(id);

    // Display section
    if (section) {
        section.classList.add("active");
    }
}

// Handle Album Content
function renderAlbumContent(albums, elementId) {
    const albumElement = document.getElementById(elementId);
    if (!albumElement) return;

    let output = "";

    // Create each album objects
    albums.forEach((album, index) => {
        const modalId = `modal-${index}`;
        const btnId = `btn-${index}`;

        output += `
        <div class="album-item">
            <img class="album-image" src="${album.image}" alt="${album.alt}">
            <div class="album-details">
                <h2>${album.title}</h2>
                <h3>${album.released}</h3>
                <button id="${btnId}">Show Track List...</button>
            </div>
        </div>

        <!-- Modal -->
        <div id="${modalId}" class="modal">
            <div class="modal-content">
                <span class="close" data-close="${modalId}">&times;</span>
                <h2>${album.title} - Track List</h2>
                <ul>
                    ${album.tracks.map(track => `<li>${track}</li>`).join("")}
                </ul>
            </div>
        </div>
        `;
    });

    albumElement.innerHTML = output;

    initAllModals();
}

// Handle creating all track modals
function initAllModals() {
    const buttons = document.querySelectorAll("button[id^='btn-']");
    const modals = document.querySelectorAll(".modal");

    buttons.forEach((btn) => {
        const index = btn.id.split("-")[1];
        const modal = document.getElementById(`modal-${index}`);

        btn.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });

    // Close buttons
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const modalId = closeBtn.dataset.close;
            document.getElementById(modalId).style.display = "none";
        });
    });

    // Click outside to close
    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}


// Load the default tab
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("defaultOpen").click();
});

window.openArtist = openArtist;
window.openCategory = openCategory;
