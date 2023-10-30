// Function to fetch and populate latest posts
function populateLatestNews() {
    const latestNewsRow = document.getElementById("latest-news-row");
    fetch('pages/post_info.json')
        .then((response) => response.json())
        .then((data) => {
            // Sort the data by date
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
document.addEventListener("DOMContentLoaded", populateLatestNews);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function populateCarousel() {
    const randomPostsCarousel = document.getElementById("random-carousel");
    fetch('pages/post_info.json')
        .then((response) => response.json())
        .then((data) => {
            shuffleArray(data);
            // Ensure that we have at least 6 unique random posts
            const randomPosts = [];
            for (let i = 0; i < 6; i++) {
                randomPosts.push(data[i % data.length]); // Cyclic selection from the shuffled array
            }
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
document.addEventListener("DOMContentLoaded", populateCarousel);