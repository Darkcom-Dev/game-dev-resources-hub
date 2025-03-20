
fetch('../../header-footer.json')
.then(response => response.json())
.then(data => {
    // Crea el header
    const header = document.createElement('header');
    header.innerHTML = `
    <div class="header-img">
        <a href="${data.links.header["home"]}"><img src="${data.logo}" alt="favicon" height="200px"></a>
         
    </div>
    <nav class="menu">
        <a class="a-menu" href="${data.links.header["home"]}">Home</a>
        <a class="a-menu" href="${data.links.header["about"]}" target="_blank">About</a>
        <a class="a-menu" href="${data.links.header["contact"]}">Contact</a>
        <a class="a-menu" href="${data.links.header["fonts"]}">Fonts</a>
        <a class="a-menu" href="${data.links.header["palettes"]}">Palettes</a>
        <a class="a-menu" href="${data.links.header["model-loader"]}">Model Loader</a>
        <a class="a-menu" href="${data.links.header["user-manual"]}">User Manual</a>
    </nav>
    `;
    document.body.insertBefore(header, document.body.firstChild);
    // Crea el footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <ul>
        <li><a href="${data.links.footer["privacy-policy"]}">Privacy Policy</a></li>
        <li><a href="${data.links.footer["terms-and-conditions"]}">Terms and Conditions</a></li>
        <li><a href="${data.links.footer["site-map"]}">Site Map</a></li>
        <li><a href="${data.links.footer["contact"]}">Contact</a></li>
    </ul>
    `;
    document.body.appendChild(footer);
})
.catch(error => console.error(error));