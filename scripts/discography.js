
const data = {
    "destinys-child": {
        albums: dcAlbumList,
        singles: dcSingleList,
    },
    beyonce: {
        albums: beyonceAlbumList,
        singles: beyonceSingleList,
    },
};

let activeArtist = "beyonce";
let activeCategory = "albums";

function renderDiscography() {
    const content = document.getElementById("content");
    const items = data[activeArtist][activeCategory];

    const categoryLabels = { albums: "Albums", singles: "Singles", tours: "Tours" };
    let htmlOutput = `<p class="category-label">${categoryLabels[activeCategory]}</p>`;

    if (activeCategory === "albums") {
        htmlOutput += `<div class="albums">`;

        items.forEach((item, index) => {
        const modalId = `modal-${index}`;
        const btnId = `btn-${index}`;

        htmlOutput += `
            <div class="album-item">
                <img class="album-image" src="${item.image}" alt="${item.alt}">
                <div class="album-details">
                    <h2>${item.title}</h2>
                    <h3>${item.released}</h3>
                    <button id="${btnId}">Show Track List...</button>
                </div>
            </div>

            <!-- Modal -->
            <div id="${modalId}" class="modal">
                <div class="modal-content">
                    <span class="close" data-close="${modalId}">&times;</span>
                    <h2>${item.title} - Track List</h2>
                    <ul>
                        ${item.tracks.map(track => `<li>${track}</li>`).join("")}
                    </ul>
                </div>
            </div>
            `;
        });
        htmlOutput += `</div>`;
        initAllModals()

    } else if (activeCategory === "singles") {
        htmlOutput += `<div clas="singles-grid">`;
        items.forEach(item => {
            htmlOutput += `
                <div class="single-card">
                    <div class="single-title">${item.title}</div>
                    <div class="single-released">${item.released}</div>
                </div>`;
        });
        htmlOutput += `</div>`;

    } else if (activeCategory === "tours") {
        htmlOutput += `<div clas="tours-grid">`;
        items.forEach(item => {
            htmlOutput += `
                <div class="tour-card">
                    <div class="tour-info">
                        <div class="tour-title">${item.title}</div>
                    </div>
                    <span class="tour-released">${item.released}</div>
                </div>`;
        });
        htmlOutput += `</div>`;
    }

    content.innerHTML = htmlOutput;
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
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeArtist = btn.dataset.artist
        renderDiscography();
    });
});

document.getElementById("category-select").addEventListener("change", e => {
    activeCategory = e.target.value;
    renderDiscography();
});

renderDiscography();