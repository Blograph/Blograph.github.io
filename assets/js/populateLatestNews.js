// Function to fetch and populate latest posts
function populateLatestNews() {
    const latestNewsRow = document.getElementById("latest-news-row");

    // Fetch the JSON data containing information about posts
    fetch('pages/post_info.json') // Replace with the actual path or URL to your JSON file
        .then((response) => response.json())
        .then((data) => {
            // Sort the data by date (you might need to parse dates)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Take the top 3 posts (the latest 3)
            const latestPosts = data.slice(0, 3);

            // Populate the Latest News section with the latest posts
            latestPosts.forEach((post) => {
                const postHTML = `
                        <div class="col-lg-4 col-md-6">
                            <div class="single-latest-news">
                                <a href="${post.link}">
                                    <div class="latest-news-bg news-bg-1"></div>
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

                latestNewsRow.innerHTML += postHTML;
            });
        })
        .catch((error) => {
            console.error("Failed to fetch latest posts:", error);
        });
}

// Call the function to populate the Latest News section when the page loads
window.addEventListener("load", populateLatestNews);


// Function to fetch random posts and populate the carousel
function populateRandomPosts() {
    const randomPostsCarousel = document.getElementById("random-posts-carousel");

    // Fetch the JSON data containing information about posts
    fetch('path/to/your/posts.json') // Replace with the actual path or URL to your JSON file
        .then((response) => response.json())
        .then((data) => {
            // Shuffle the data to get random posts (you may need to implement a shuffle function)
            shuffleArray(data);

            // Duplicate posts if there are fewer than 6
            const randomPosts = data;
            while (randomPosts.length < 6) {
                randomPosts.push(...data);
            }

            // Take the first 6 posts for the carousel
            randomPosts.length = 6;

            // Populate the carousel with random posts
            randomPosts.forEach((post) => {
                const postHTML = `
                        <div class="single-logo-item">
                            <div class="single-latest-news">
                                <a href="${post.link}">
                                    <div class="latest-news-bg news-bg-2"></div>
                                </a>
                                <div class="news-text-box">
                                    <h3><a href="${post.link}">${post.title}</a></h3>
                                    <p class="blog-meta">
                                        <span class="author"><i class="fas fa-user"></i> ${post.author}</span>
                                        <span class="date"><i class="fas fa-calendar"></i> ${post.date}</span>
                                    </p>
                                    <a href="${post.link}" class="read-more-btn">read more <i class="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    `;

                randomPostsCarousel.innerHTML += postHTML;
            });
        })
        .catch((error) => {
            console.error("Failed to fetch random posts:", error);
        });
}

// Shuffle function to randomize the posts order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Call the function to populate the random posts when the page loads
window.addEventListener("load", populateRandomPosts);