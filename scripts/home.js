window.addEventListener("load", () => {
    const galleryImages = [
        {
            src: "https://hips.hearstapps.com/hmg-prod/images/beyonce-superbowl-6842f55d6c927.jpg?crop=1.00xw:0.667xh;0,0.207xh&resize=1120:*",
            alt: "Beyonce Elle Cowboy Carter"
        },
        {
            src: "https://hips.hearstapps.com/hmg-prod/images/entertainer-beyonce-performs-on-stage-during-the-mrs-carter-news-photo-1634153930.jpg?crop=0.748xw:1.00xh;0.0962xw,0&resize=640:*",
            alt: "Beyonce Elle Life and Career"
        },
        {
            src: "https://imageio.forbes.com/specials-images/imageserve/6760517984921923e8effbcd/0x0.jpg?format=jpg&crop=1736,1737,x834,y79,safe&height=416&width=416&fit=bounds",
            alt: "Beyonce Forbes"
        },
        {
            src: "https://charts-static.billboard.com/img/2002/06/beyonce-n2a-344x344.jpg",
            alt: "Beyonce Billboard"
        }
    ];
    
    renderGallery(galleryImages, "gallery");

    const favouriteSong = { 
        title: "Ya-Ya",
        album: "Cowboy Carter",
        image: "images/Cowboy_Carter.png",
        alt: "Beyonce Cowboy Carter"
    }; 
    
    setFavouriteSong(favouriteSong);
});

// Handle rendering the gallery images for the home page
function renderGallery(images, elementId) {
    const galleryElement = document.getElementById(elementId);
    if (!galleryElement) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }
    let output = ""; 

    // Create each image with src and alternative text
    for (const image of images) { 
        output += ` 
        <div class="gallery-item"> 
            <img src="${image.src}" alt="${image.alt}"> 
        </div> 
        `; 
    } 

    document.getElementById(elementId).innerHTML = output;
}

// Handle favourite song section
function setFavouriteSong(song) {
    const titleElement = document.getElementById("fav-song-title");
    const albumElement = document.getElementById("fav-song-album");
    const imageElement = document.getElementById("fav-song-image");

    if (!titleElement || !albumElement || !imageElement) {
        console.error("One or more elements for the favourite song section are missing.");
        return;
    }

    document.getElementById("fav-song-title").textContent = song.title;
    document.getElementById("fav-song-album").textContent = song.album;
    document.getElementById("fav-song-image").src = song.image;
    document.getElementById("fav-song-image").alt = song.alt;
}
