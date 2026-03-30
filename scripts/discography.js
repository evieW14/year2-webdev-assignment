window.addEventListener("load", () => {

    const albumList = [
        {
            title: "Dangerously in Love",
            released: "2003",
            image: "images/Dangerously_In_Love_Album.png",
            alt: "Beyonce Dangerously in Love Album Cover",
            tracks: [
              "Crazy in Love",
              "Naughty Girl",
              "Baby Boy",
              "Hip Hop Star",
              "Be with You",
              "Me, Myself and I",
              "Yes",
              "Signs",
              "Speechless",
              "That's How You Like It",
              "The Closer I Get to You",
              "Dangerously in Love 2",
              "Beyoncé Interlude",
              "Gift from Virgo",
              "Daddy"
            ]
        },
        {
            title: "B'Day",
            released: "2006",
            image: "images/Beyonce_-_B'Day.png",
            alt: "Beyonce B'Day Album Cover",
            tracks: [
              "Déjà Vu",
              "Get Me Bodied",
              "Suga Mama",
              "Upgrade U",
              "Ring the Alarm",
              "Kitty Kat",
              "Freakum Dress",
              "Green Light",
              "Irreplaceable",
              "Resentment"
            ]
        },
        {
            title: "I Am... Sasha Fierce",
            released: "2008",
            image: "images/I_Am..._Sasha_Fierce.png",
            alt: "Beyonce I Am... Sasha Fierce Album Cover",
            tracks: [
              "If I Were a Boy",
              "Halo",
              "Disappear",
              "Broken-Hearted Girl",
              "Ave Maria",
              "Smash into You",
              "Satellites",
              "That's Why You're Beautiful",
              "Single Ladies (Put a Ring on It)",
              "Radio",
              "Diva",
              "Sweet Dreams",
              "Video Phone",
              "Hello",
              "Ego",
              "Scared of Lonely"
            ]
        },
        {
            title: "4",
            released: "2011",
            image: "images/Beyonce_-_4.png",
            alt: "Beyonce 4 Album Cover",
            tracks: [
              "1+1",
              "I Care",
              "I Miss You",
              "Best Thing I Never Had",
              "Party",
              "Rather Die Young",
              "Start Over",
              "Love on Top",
              "Countdown",
              "End of Time",
              "I Was Here",
              "Run the World (Girls)"
            ]
        },
        {
            title: "Beyonce",
            released: "2013",
            image: "images/Beyonce_-_Beyonce.png",
            alt: "Beyonce Self Titled Album Cover",
            tracks: [
              "Pretty Hurts",
              "Haunted",
              "Drunk in Love",
              "Blow",
              "No Angel",
              "Partition",
              "Jealous",
              "Rocket",
              "Mine",
              "XO",
              "Flawless",
              "Superpower",
              "Heaven",
              "Blue"
            ]
        },
        {
            title: "Lemonade",
            released: "2016",
            image: "images/Beyonce_-_Lemonade.png",
            alt: "Beyonce Lemonade Album Cover",
            tracks: [
              "Pray You Catch Me",
              "Hold Up",
              "Don't Hurt Yourself",
              "Sorry",
              "6 Inch",
              "Daddy Lessons",
              "Love Drought",
              "Sandcastles",
              "Forward",
              "Freedom",
              "All Night",
              "Formation"
            ]
        },
        {
            title: "Renaissance",
            released: "2022",
            image: "images/Beyonce_-_Renaissance.png",
            alt: "Beyonce Renaissance Album Cover",
            tracks: [
              "I'm That Girl",
              "Cozy",
              "Alien Superstar",
              "Cuff It",
              "Energy",
              "Break My Soul",
              "Church Girl",
              "Plastic Off the Sofa",
              "Virgo's Groove",
              "Move",
              "Heated",
              "Thique",
              "All Up in Your Mind",
              "America Has a Problem",
              "Pure/Honey",
              "Summer Renaissance"
            ]
        },
        {
            title: "Cowboy Carter",
            released: "2024",
            image: "images/Cowboy_Carter.png",
            alt: "Beyonce Cowboy Carter Album Cover",
            tracks: [
              "Ameriican Requiem",
              "Blackbiird",
              "16 Carriages",
              "Protector",
              "My Rose",
              "Smoke Hour ★ Willie Nelson",
              "Texas Hold 'Em",
              "Bodyguard",
              "Dolly P",
              "Jolene",
              "Daughter",
              "Spaghettii",
              "Alliigator Tears",
              "Smoke Hour II",
              "Just for Fun",
              "II Most Wanted",
              "Levii's Jeans",
              "Flamenco",
              "The Linda Martell Show",
              "Ya Ya",
              "Oh Louisiana",
              "Desert Eagle",
              "Riiverdance",
              "II Hands II Heaven",
              "Tyrant",
              "Sweet ★ Honey ★ Buckiin'",
              "Amen"
            ]
        },
    ]

    renderAlbumContent(albumList, "albums");

});

function renderAlbumContent(albums, elementId) {
    const albumElement = document.getElementById(elementId);
    if (!albumElement) return;

    let output = "";

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

function openArtist(evt, artistName) {
  // Hide all tab content
  var tabcontent = document.getElementsByClassName("tabContent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove "active" from all tab buttons
  var tablinks = document.getElementsByClassName("tabLinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show selected tab and mark button active
  document.getElementById(artistName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("defaultOpen").click();
});
