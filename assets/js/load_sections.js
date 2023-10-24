function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("footer.html") // Load the external footer.html file
            .then((response) => response.text())
            .then((data) => {
                footerPlaceholder.innerHTML = data;
            })
            .catch((error) => {
                console.error("Failed to load footer:", error);
            });
    }
}

// Call the function to load the footer when the page loads
window.addEventListener("load", loadFooter);