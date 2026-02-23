window.onload = () => {
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
            href:"gallery.html",
            title:"Gallery"
        },
        {   
            href:"contact.html",
            title:"Contact"
        }
    ]

    renderNavBar(pages, "nav");
}

function renderNavBar(pages, elementId) {
    let output = ""

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