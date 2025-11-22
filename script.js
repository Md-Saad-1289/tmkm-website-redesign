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
        image: "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/499701463_1105410588279634_1766685901482025379_n.jpg?_nc_cat=100&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sU1bb3cEylgQ7kNvwHl9l7R&_nc_oc=AdmT4idcMgB2jjJe32aa86GtA_UYYXpP-ToYPwcGwaZTqRYPyOGd1W4HSlaYvx9tjHc&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=6JnlhA8F8C7Hv7etauzYyA&oh=00_AfjB1vHcTjqBlPg8qrlUfSaoEAhf7JlyjQkXPICEFXkl9g&oe=6924DFDA"
    },
    {
        title: "Modern & Traditional Learning",
        highlight: "Balanced Curriculum",
        description: "We combine traditional Islamic teachings with modern academic subjects, ensuring that students gain both spiritual knowledge and practical skills to thrive in today's world.",
        image: "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/489917875_1074044198082940_3347898273933741231_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sGThb45Tr9AQ7kNvwFm9haQ&_nc_oc=AdnekpE6LWrOKkn_7DxGMDtJ2dqRO5ygfAhRaxGbwH69Q6okZ3R6G3qSTJsRBuaHfjs&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=2e8tALfa8O63FhHjNmi2Eg&oh=00_AfhltbpzGM-gS06_v2R81fcRRZtVVoTyqrHPfvc1fCAF_g&oe=6924D88E"
    },
    {
        title: "Community & Growth",
        highlight: "Holistic Development",
        description: "Students participate in seminars, workshops, and community programs that promote leadership, teamwork, and personal growth, preparing them to make a positive impact in society.",
        image: "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/492230825_1080966057390754_7323176602943000127_n.jpg?_nc_cat=100&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sGPV1KANzhsQ7kNvwEzljg6&_nc_oc=AdnGOgc4LgqsWNzVn-dPofGP5Oupveb3JQAawQgOYzpcUVqBz-cWeRdwxZJwiEU6jD4&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=9mCM6h_4sl7mq8GM0fbQvQ&oh=00_Afgloj6s5yqzM_Ym4XTeqDUNKaLeR4CWayWC4EiDSVcjxQ&oe=6924EA13"
    },
    {
        title: "Innovative Learning Environment",
        highlight: "Interactive & Engaging",
        description: "Our classrooms are equipped with modern tools and interactive learning methods, encouraging students to think critically, solve problems creatively, and engage actively in their studies.",
        image: "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/561392695_1224336999720325_2789459972682244218_n.jpg?_nc_cat=100&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XYccEWVBC54Q7kNvwG2sN3p&_nc_oc=Adle_3lryZWV1JlbJoGgtMl7uTbFgx_P9SzBK4eGAq_uqFY91TlW3iLuxBSSYVI7hUs&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=rTfzArF9d3npRs19AGhHyw&oh=00_Afhk9I6j3WpGhqt6y4Q7gnIzysmtHBPNKqMkXtTDHFJL7A&oe=6924FDF6"
    },
    {
        title: "Achieving Excellence",
        highlight: "Awards & Recognition",
        description: "Our students consistently achieve top results in academics, sports, and co-curricular activities, earning awards and recognition locally and nationally for their outstanding performance.",
        image: "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/489815515_1074966771324016_7911498437911227395_n.jpg?_nc_cat=101&cb2=99be929b-a592a72f&ccb=1-7&_nc_sid=833d8c&_nc_ohc=v9OR6gK4Z-0Q7kNvwE_ioIC&_nc_oc=AdnUjItii-BuhBGBNFfayTQdSrZb-9sW9001ZuC0XagfTgwgVDWcqcwCh9VfGGyRwt8&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=FY8X1NbkdB9aYIAZtf24cQ&oh=00_AfjdaEcZNe92g7hj56IK88GbI9mwjGXhhwZesMPIK30cpQ&oe=6924F0ED"
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

