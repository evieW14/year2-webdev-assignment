window.addEventListener("load", () => {

    const albumList = [
        {
            title: "Dangerously in Love",
            released: "2003",
            image: "images/Dangerously_In_Love_Album.png",
            alt: "Beyonce Dangerously in Love Album Cover"
        },
        {
            title: "B'Day",
            released: "2006",
            image: "images/Beyonce_-_B'Day.png",
            alt: "Beyonce B'Day Album Cover"
        },
        {
            title: "I Am... Sasha Fierce",
            released: "2008",
            image: "images/I_Am..._Sasha_Fierce.png",
            alt: "Beyonce I Am... Sasha Fierce Album Cover"
        },
        {
            title: "4",
            released: "2011",
            image: "images/Beyonce_-_4.png",
            alt: "Beyonce 4 Album Cover"
        },
        {
            title: "Beyonce",
            released: "2013",
            image: "images/Beyonce_-_Beyonce.png",
            alt: "Beyonce Self Titled Album Cover"
        },
        {
            title: "Lemonade",
            released: "2016",
            image: "images/Beyonce_-_Lemonade.png",
            alt: "Beyonce Lemonade Album Cover"
        },
        {
            title: "Renaissance",
            released: "2022",
            image: "images/Beyonce_-_Renaissance.png",
            alt: "Beyonce Renaissance Album Cover"
        },
        {
            title: "Cowboy Carter",
            released: "2024",
            image: "images/Cowboy_Carter.png",
            alt: "Beyonce Cowboy Carter Album Cover"
        },
    ]

    renderAlbumContent(albumList, "albums");
});

function renderAlbumContent(albums, elementId) {
    const albumElement = document.getElementById(elementId);
    if (!albumElement) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    let output = "";

    for (const album of albums) {
        output += `
        <div class="album-item">
            <img class="album-image" src="${album.image}" alt="${album.alt}">
            <div class="album-details">
                <h2> ${album.title}</h2>
                <h3> ${album.released} </h3>
            </div>
        </div>
        `;
    }

    document.getElementById(elementId).innerHTML = output;
}