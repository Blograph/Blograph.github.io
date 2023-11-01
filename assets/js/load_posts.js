$(document).ready(function() {
    // Load the JSON file
    $.getJSON('assets/latest-news/latest-news-info.json', function(data) {
        // Sort posts by date in descending order
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Define the number of posts per page
        const postsPerPage = 6;
        let currentPage = 1;

        // Function to display posts for the current page
        function displayPosts() {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const paginatedPosts = data.slice(startIndex, endIndex);

            const $latestNewsContent = $('#latest-news-content');
            $latestNewsContent.empty();

            paginatedPosts.forEach((post) => {
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
                $latestNewsContent.append(postHTML);
            });
        }

        // Function to update pagination links
        function updatePagination() {
            const $pagination = $('#pagination');
            $pagination.empty();

            const totalPages = Math.ceil(data.length / postsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const isActive = i === currentPage ? 'active' : '';
                const paginationHTML = `<li class="page-item ${isActive}"><a class="page-link" href="#">${i}</a></li>`;
                $pagination.append(paginationHTML);
            }

            // Add click event for pagination links
            $pagination.find('a').on('click', function(e) {
                e.preventDefault();
                currentPage = parseInt($(this).text());
                displayPosts();
                updatePagination();
            });
        }

        // Initialize the display and pagination
        displayPosts();
        updatePagination();
    });
});