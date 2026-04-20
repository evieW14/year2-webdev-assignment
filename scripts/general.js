// List for all pages in the website, to show in the navigation bar
const pages = [
    {
        href:"home.html",
        title:"Home"
    },
    {
        href:"about.html",
        title:"About"
    },
    {
        href:"discography.html",
        title:"Discography"
    },
    {
        href:"contact.html",
        title:"Contact"
    },
    {
        href:"hall-of-fame.html",
        title: "Hall Of Fame"
    }
]

// Load the nav bar when the page loads
window.addEventListener("DOMContentLoaded", () => {
    renderNavBar(pages, "nav");
});

// Handle rendering the Navigation Bar
function renderNavBar(pages, elementId) {
    let output = ""

    // Allow for each page title to navigate to its respective page
    for (const page of pages) {
        output += `
            <li><a href="${page.href}">${page.title}</a></li>
        `
    }

    let navBar = `
        <ul>
            ${output}
        </ul>
    `
    document.getElementById(elementId).innerHTML = navBar;
}