function loadSection2(sectionId, sectionPath) {
    const sectionPlaceholder = document.getElementById(sectionId);
    if (sectionPlaceholder) {
        fetch(sectionPath) // Load the external section content
            .then((response) => response.text())
            .then((data) => {
                sectionPlaceholder.innerHTML = data;
            })
            .catch((error) => {
                console.error("Failed to load section:", error);
            });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadSection2("header-placeholder", "assassets/latest-news/header.html"); // Load the header
    loadSection2("footer-placeholder", "assets/latest-news/footer.html"); // Load the footer
});