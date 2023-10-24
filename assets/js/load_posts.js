// Function to populate the latest news section with data
function populateLatestNews(posts, currentPage, postsPerPage) {
    const latestNewsContent = document.getElementById("latest-news-content");
    latestNewsContent.innerHTML = "";

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);

    currentPosts.forEach((post) => {
        const postHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="single-latest-news">
                    <a href="${post.link}">
                        <div class="latest-news-bg news-bg-${post.newsBg}"></div>
                    </a>
                    <div class="news-text-box">
                        <h3><a href="${post.link}">${post.title}</a></h3>
                        <p class="blog-meta">
                            <span class="author"><i class="fas fa-user"></i> ${post.author}</span>
                            <span class="date"><i class="fas fa-calendar"></i> ${post.date}</span>
                        </p>
                        <p class="excerpt">${post.excerpt}</p>
                        <a href="${post.link}" class="read-more-btn">read more <i class="fas fa-angle-right"></i></a>
                    </div>
                </div>
            </div>
        `;

        latestNewsContent.innerHTML += postHTML;
    });
}

// Function to create pagination links
function createPagination(posts, postsPerPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const pageCount = Math.ceil(posts.length / postsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = i;
        link.href = "#"; // You can add click event listeners to these links
        listItem.appendChild(link);
        pagination.appendChild(listItem);
    }
}

var posts = [];

// Example data structure for posts (replace this with your JSON data)
function fetchPostsFromJSON() {
    fetch("pages/post_info.json") // Replace with the correct path to your JSON file
        .then((response) => response.json())
        .then((data) => {
            const posts = data; // Assuming the JSON structure matches your provided format

            const postsPerPage = 6;
            let currentPage = 1;

            // Initial population and pagination creation
            populateLatestNews(posts, currentPage, postsPerPage);
            createPagination(posts, postsPerPage);

            // Event listener for pagination (you can use a library like jQuery for better handling)
            document.getElementById("pagination").addEventListener("click", (event) => {
                if (event.target.tagName === "A") {
                    currentPage = parseInt(event.target.textContent);
                    populateLatestNews(posts, currentPage, postsPerPage);
                }
            });
        })
        .catch((error) => {
            console.error("Failed to fetch posts:", error);
        });
}

// Fetch and populate posts when the page loads
fetchPostsFromJSON();

const postsPerPage = 6;
let currentPage = 1;

// Initial population and pagination creation
populateLatestNews(posts, currentPage, postsPerPage);
createPagination(posts, postsPerPage);

// Event listener for pagination (you can use a library like jQuery for better handling)
document.getElementById("pagination").addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        currentPage = parseInt(event.target.textContent);
        populateLatestNews(posts, currentPage, postsPerPage);
    }
});