// ================= Header Mobile Menu =================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    nav.classList.toggle('open');
});

// ================= Hero Slider =================
const slidesData = [
    {
        title: "Welcome to TMKM",
        highlight: "Excellence in Education",
        description: "At Tamirul Millat Kamil Madrasah, we nurture young minds to achieve academic excellence while instilling strong moral values. Our dedicated teachers guide students in every step of their educational journey.",
        image: "assets/hero/h-1.jpg"
    },
    {
        title: "Modern & Traditional Learning",
        highlight: "Balanced Curriculum",
        description: "We combine traditional Islamic teachings with modern academic subjects, ensuring that students gain both spiritual knowledge and practical skills to thrive in today's world.",
        image: "assets/hero/h-2.jpg"
    },
    {
        title: "Community & Growth",
        highlight: "Holistic Development",
        description: "Students participate in seminars, workshops, and community programs that promote leadership, teamwork, and personal growth, preparing them to make a positive impact in society.",
        image: "assets/hero/h-3.jpg"
    },
    {
        title: "Innovative Learning Environment",
        highlight: "Interactive & Engaging",
        description: "Our classrooms are equipped with modern tools and interactive learning methods, encouraging students to think critically, solve problems creatively, and engage actively in their studies.",
        image: "assets/hero/h-4.jpg"
    },
    {
        title: "Achieving Excellence",
        highlight: "Awards & Recognition",
        description: "Our students consistently achieve top results in academics, sports, and co-curricular activities, earning awards and recognition locally and nationally for their outstanding performance.",
        image: "assets/hero/h-5.jpg"
    }
];

const slidesTrack = document.getElementById('slidesTrack');
const thumbStrip = document.getElementById('thumbStrip');
const indicators = document.getElementById('sliderIndicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let slideInterval;

// Create slides dynamically
function createSlides() {
    slidesData.forEach((slide, index) => {
        // Slide element
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        if (index === 0) slideDiv.classList.add('active');
        slideDiv.innerHTML = `
            <div class="slide-bg" style="background-image:url('${slide.image}')"></div>
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h2 class="slide-title">${slide.title}</h2>
                <span class="slide-highlight">${slide.highlight}</span>
                <p class="slide-description">${slide.description}</p>
            </div>
        `;
        slidesTrack.appendChild(slideDiv);

        // Thumbnail
        const thumb = document.createElement('button');
        thumb.className = 'thumb-btn';
        thumb.style.backgroundImage = `url('${slide.image}')`;
        thumb.setAttribute('aria-current', index === 0 ? 'true' : 'false');
        thumb.addEventListener('click', () => goToSlide(index));
        thumbStrip.appendChild(thumb);

        // Indicator
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicators.appendChild(indicator);
    });
}

// Show slide by index
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb-btn');
    const inds = document.querySelectorAll('.indicator');

    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    thumbs.forEach((t, i) => t.setAttribute('aria-current', i === index ? 'true' : 'false'));
    inds.forEach((ind, i) => ind.classList.toggle('active', i === index));

    currentSlide = index;
    resetInterval();
}

// Next / Previous
function nextSlide() {
    currentSlide = (currentSlide + 1) % slidesData.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
    goToSlide(currentSlide);
}

// Auto-play
function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Initialize slider
createSlides();
startInterval();

// ================= Footer Year =================
document.getElementById('year').textContent = new Date().getFullYear();

