function populateLatestNews() {
    const latestNewsRow = document.getElementById("latest-news-row");
    const latestPosts = posts_info.slice(0, 3);
    // Populate the Latest News section with the latest posts
    latestPosts.forEach((post) => {
        const postHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="single-latest-news">
                    <a href="${post.link}">
                    <div class="latest-news-bg ${post.image}"></div>
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
}
document.addEventListener("DOMContentLoaded", populateLatestNews);

// Create a new element for the provided HTML
function createNewElement(index) {
    var newElement = document.createElement('div');
    newElement.className = 'owl-item cloned';
    newElement.style.width = '197px';
    newElement.style.marginRight = '30px';
    newElement.innerHTML = `
    <div class="single-logo-item">
        <div class="single-latest-news">
            <a href="${posts_info[index].link}">
                <div class="latest-news-bg ${posts_info[index].image}"></div>
            </a>
            <div class="news-text-box">
                <h3><a href="${posts_info[index].link}">${posts_info[index].title}</a></h3>
                <p class="blog-meta">
                    <span class="author"><i class="fas fa-user"></i> ${posts_info[index].author}</span>
                    <span class="date"><i class="fas fa-calendar"></i> ${posts_info[index].date}</span>
                </p>
                <a href="${posts_info[index].link}" class="read-more-btn">read more <i class="fas fa-angle-right"></i></a>
            </div>
        </div>
    </div>
    `;
    return newElement;
}

var randomCarousel = document.getElementById('random-carousel');
for (let i = 2; i < Math.min(posts_info.length, 6); i++) {
    randomCarousel.appendChild(createNewElement(i));
}