const gallery = document.getElementById("gallery");
const filtersContainer = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const scrollBtn = document.getElementById("scrollTop");
const themeBtn = document.getElementById("themeToggle");

let currentIndex = 0;
let filteredImages = [];

const images = [
    { src: "https://picsum.photos/600/400?1", category: "nature", title: "Nature 1" },
    { src: "https://picsum.photos/600/400?2", category: "city", title: "City 1" },
    { src: "https://picsum.photos/600/400?3", category: "animals", title: "Animal 1" },
    { src: "https://picsum.photos/600/400?4", category: "nature", title: "Nature 2" },
    { src: "https://picsum.photos/600/400?5", category: "city", title: "City 2" },
    { src: "https://picsum.photos/600/400?6", category: "animals", title: "Animal 2" }
];

init();

function init() {
    createFilters();
    renderGallery();
    setupTheme();
    setupScroll();
}

function createFilters() {
    const categories = ["all", ...new Set(images.map(img => img.category))];

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.toggle("active", cat === "all");

        btn.onclick = () => {
            document.querySelector(".filters .active").classList.remove("active");
            btn.classList.add("active");
            renderGallery(cat);
        };

        filtersContainer.appendChild(btn);
    });
}

function renderGallery(category = "all") {
    gallery.innerHTML = "";
    filteredImages = images.filter(img => category === "all" || img.category === category);

    filteredImages.forEach((imgData, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
      <img src="${imgData.src}">
      <div class="overlay">${imgData.title}</div>
    `;

        div.onclick = () => {
            currentIndex = index;
            openLightbox();
        };

        gallery.appendChild(div);
    });
}

function openLightbox() {
    updateLightbox();
    lightbox.style.display = "flex";
}

function updateLightbox() {
    lightboxImg.src = filteredImages[currentIndex].src;
    document.getElementById("counter").textContent =
        `${currentIndex + 1} / ${filteredImages.length}`;
}

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
};

closeBtn.onclick = () => lightbox.style.display = "none";

lightbox.onclick = e => {
    if (e.target === lightbox) lightbox.style.display = "none";
};

function setupScroll() {
    window.onscroll = () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };

    scrollBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

function setupTheme() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }

    themeBtn.onclick = () => {
        document.body.classList.toggle("light");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("light") ? "light" : "dark"
        );
    };
}