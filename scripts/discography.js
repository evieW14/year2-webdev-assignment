const data = {
    "destinys-child": {
        albums: dcAlbumList,
        singles: dcSingleList,
        tours: dcTourList,
    },
    beyonce: {
        albums: beyonceAlbumList,
        singles: beyonceSingleList,
        tours: beyonceTourList,
    },
};

let activeArtist = "destinys-child";
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
                        <button class="btn-tracks" data-album-index="${index}">Show Track List...</button>
                    </div>
                </div>
                `;
        });
        htmlOutput += `</div>`;

    } else if (activeCategory === "singles") {
        htmlOutput += `<div class="singles-grid">`;
        items.forEach(item => {
            htmlOutput += `
                <div class="single-card">
                    <div class="single-title">${item.title}</div>
                    <div class="single-released">${item.released}</div>
                </div>`;
        });
        htmlOutput += `</div>`;

    } else if (activeCategory === "tours") {
        htmlOutput += `<div class="tours-list">`;
        items.forEach(item => {
            htmlOutput += `
                <div class="tour-card">
                    <div class="tour-info">
                        <div class="tour-title">${item.title}</div>
                    </div>
                    <span class="tour-year">${item.year}</span>
                </div>`;
        });
        htmlOutput += `</div>`;
    }

    content.innerHTML = htmlOutput;
}


// Modal Logic
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalTracks = document.getElementById("modal-tracks");

// Handle opening a modal and showing tracks/numbers
function openModal(albumIndex) {
    const album = data[activeArtist].albums[albumIndex];

    modalTitle.textContent = album.title;

    modalTracks.innerHTML = album.tracks
        .map((track, i) => `
            <li>
                <span class="modal-track-number">${i + 1}</span>
                <span class="modal-track-name">${track}</span>
            </li>
        `)
        .join("");

    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

// Handle closing modal logic
function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

// Click overlay to close modal
window.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
});

// Click X button to close modal
document.querySelector(".modal-close").addEventListener("click", closeModal);

// Open modal when clicking a track button
document.getElementById("content").addEventListener("click", (event) => {
    const btn = event.target.closest(".btn-tracks");
    if (btn) openModal(Number(btn.dataset.albumIndex));
});

// Changing Artist tab listener
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeArtist = btn.dataset.artist
        renderDiscography();
    });
});

// Changing category listener
document.getElementById("category-select").addEventListener("change", e => {
    activeCategory = e.target.value;
    renderDiscography();
});

renderDiscography();