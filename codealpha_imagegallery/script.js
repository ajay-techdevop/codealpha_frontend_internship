
const galleryImages = Array.from(
    document.querySelectorAll(".gallery img")
);

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

// Filter images by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        galleryImages.forEach(img => {
            img.style.display =
                category === "all" ||
                img.dataset.category === category
                ? "block"
                : "none";
        });
    });
});

// Open lightbox
galleryImages.forEach(img => {
    img.addEventListener("click", () => {

        currentImages = galleryImages.filter(
            image => image.style.display !== "none"
        );

        currentIndex = currentImages.indexOf(img);

        showImage();
        lightbox.style.display = "flex";
    });
});

function showImage() {
    lightboxImage.src = currentImages[currentIndex].src;
    lightboxImage.alt = currentImages[currentIndex].alt;
}

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex + 1) % currentImages.length;

    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + currentImages.length)
        % currentImages.length;

    showImage();
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close when clicking background
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
});
