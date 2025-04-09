// Wedding album slideshow with navigation controls
document.addEventListener('DOMContentLoaded', function() {
    const albumPages = document.querySelectorAll('.album-page');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentPage = 0;
    let slideInterval;

    const albumCover = document.querySelector('.album-cover img');
    const albumTitle = document.querySelector('.album-title');

    function showPage(index) {
        // Hide all photos
        albumPages.forEach(page => {
            page.classList.remove('active');
            page.style.opacity = '0';
        });
        
        // Show current photo
        currentPage = index;
        albumPages[currentPage].classList.add('active');
        albumPages[currentPage].style.opacity = '1';
        
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[currentPage].classList.add('active');
        
        // Update album cover with clicked photo
        const thumbImg = thumbnails[currentPage].querySelector('img');
        if (thumbImg && albumCoverImg) {
            albumCoverImg.src = thumbImg.src;
            albumCoverImg.alt = thumbImg.alt;
        }
    }

    function startSlideshow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            const nextPage = (currentPage + 1) % albumPages.length;
            showPage(nextPage);
        }, 3000);
    }

    // Navigation controls with proper event handling
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const prevPage = (currentPage - 1 + albumPages.length) % albumPages.length;
        showPage(prevPage);
        startSlideshow();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const nextPage = (currentPage + 1) % albumPages.length;
        showPage(nextPage);
        startSlideshow();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const prevPage = (currentPage - 1 + albumPages.length) % albumPages.length;
            showPage(prevPage);
            startSlideshow();
        } else if (e.key === 'ArrowRight') {
            const nextPage = (currentPage + 1) % albumPages.length;
            showPage(nextPage);
            startSlideshow();
        }
    });

    // Thumbnail navigation
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            showPage(index);
            startSlideshow();
        });
    });

    // Initialize and start slideshow with 5 photos
    if (albumPages.length > 0) {
        // Ensure we don't exceed available photos
        currentPage = Math.min(currentPage, 4);
        showPage(currentPage);
        startSlideshow();
    }
});

// Maintain 3D hover effect on album cover
const albumCover = document.querySelector('.album-cover');
if (albumCover) {
    albumCover.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        albumCover.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    albumCover.addEventListener('mouseenter', () => {
        albumCover.style.transition = 'all 0.5s ease';
    });

    albumCover.addEventListener('mouseleave', () => {
        albumCover.style.transition = 'all 0.5s ease';
        albumCover.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}
