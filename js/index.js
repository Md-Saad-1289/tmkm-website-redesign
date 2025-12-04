// Notice Data and Functionality

        const notices = [
            {
                title: "Annual Examination 2025",
                desc: "The Annual Examination 2025 schedule has been released. Students must review the exam guidelines, syllabus coverage, and required materials. Attendance is mandatory, and exams will follow strict protocols to ensure fairness and smooth conduct.",
                category: "Academic",
                date: "2025-11-10",
                image: "assets/notices/annual-examination.png"
            },
            {
                title: "Admission Open for 2026",
                desc: "Admissions for the academic session 2026 are now open. Interested candidates should submit their applications before the deadline. Ensure all required documents are ready, including previous academic records and identification.",
                category: "Admission",
                date: "2025-11-05",
                image: "assets/notices/admissions-2026.png"
            },
            {
                title: "School Annual Day",
                desc: "Join us for the School Annual Day celebration featuring student performances, cultural programs, and award ceremonies. This event recognizes academic excellence, artistic talents, and contributions to the school community.",
                category: "Events",
                date: "2024-12-15",
                image: "assets/notices/school-annual-day.png"},
            {
                title: "Winter Break Announcement",
                desc: "The winter break for the academic year 2024-2025 is scheduled from 20th December 2024 to 5th January 2025. Students are encouraged to utilize this time for rest, family gatherings, and preparation for the upcoming semester.",
                category: "Holidays",
                date: "2024-12-15",
                image: "assets/notices/winter-break.png"
            }
        ];

        const noticeGrid = document.getElementById('noticeGrid');
        const noticeMoreBtn = document.querySelector('.notice-more a');
        const noticeSearch = document.getElementById('noticeSearch');
        const noticeCategory = document.getElementById('noticeCategory');
        const featuredImage = document.getElementById('featuredNoticeImage');
        const featuredTitle = document.getElementById('featuredNoticeTitle');
        const featuredDesc = document.getElementById('featuredNoticeDesc');

        let filteredNotices = [...notices];
        let loadedCount = 0;
        const loadStep = 3;

        // Modal setup
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop');
        modalBackdrop.innerHTML = `
<div class="modal">
    <button class="modal-close">&times;</button>
    <div class="modal-head">
        <h3 id="modalTitle"></h3>
        <time id="modalDate"></time>
    </div>
    <div class="modal-body">
        <img id="modalImage" src="" alt="" style="width:100%; border-radius:12px; margin-bottom:15px;">
        <p id="modalDesc"></p>
        <p id="modalCategory" style="font-weight:600; margin-top:10px;"></p>
    </div>
</div>`;
        document.body.appendChild(modalBackdrop);

        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDesc = document.getElementById('modalDesc');
        const modalCategory = document.getElementById('modalCategory');
        const modalImage = document.getElementById('modalImage');
        const modalClose = modalBackdrop.querySelector('.modal-close');

        modalClose.addEventListener('click', () => modalBackdrop.classList.remove('active'));
        modalBackdrop.addEventListener('click', e => {
            if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
        });

        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const options = { month: 'short' };
            return `${date.getDate()} ${date.toLocaleDateString('en-US', options)}`;
        }

        function setFeaturedNotice(notice) {
            featuredImage.src = notice.image;
            featuredTitle.textContent = notice.title;
            featuredDesc.textContent = notice.desc;
            featuredImage.parentElement.onclick = () => openModal(notice);
        }

        function renderNotices(data = filteredNotices) {
            noticeGrid.innerHTML = "";
            const nextBatch = data.slice(0, loadedCount + loadStep);
            nextBatch.forEach(notice => {
                const dateObj = formatDate(notice.date);
                const noticeCard = document.createElement('div');
                noticeCard.classList.add('notice-card');
                noticeCard.innerHTML = `
            <div class="notice-date-box">
                <span class="notice-day">${dateObj.split(' ')[0]}</span>
                <span class="notice-month">${dateObj.split(' ')[1]}</span>
            </div>
            <div class="notice-info">
                <h4 class="notice-title">${notice.title}</h4>
            </div>
        `;
                noticeCard.addEventListener('click', () => openModal(notice));
                noticeGrid.appendChild(noticeCard);
            });
            loadedCount += loadStep;
            noticeMoreBtn.style.display = loadedCount >= data.length ? 'none' : 'inline-block';
        }

        function openModal(notice) {
            modalTitle.textContent = notice.title;
            modalDate.textContent = formatDate(notice.date);
            modalDesc.textContent = notice.desc;
            modalCategory.textContent = `Category: ${notice.category}`;
            modalImage.src = notice.image;
            modalBackdrop.classList.add('active');
        }

        // Search & Filter
        noticeSearch.addEventListener('input', applyFilters);
        noticeCategory.addEventListener('change', applyFilters);

        function applyFilters() {
            const searchTerm = noticeSearch.value.toLowerCase();
            const selectedCategory = noticeCategory.value;
            filteredNotices = notices.filter(notice => {
                const matchesSearch = notice.title.toLowerCase().includes(searchTerm) || notice.desc.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });
            loadedCount = 0;
            renderNotices(filteredNotices);
            if (filteredNotices.length > 0) setFeaturedNotice(filteredNotices[0]);
        }

        // View More Button
        noticeMoreBtn.addEventListener('click', e => {
            e.preventDefault();
            renderNotices(filteredNotices);
        });

        // Initialize
        loadedCount = 0;
        renderNotices();
        if (filteredNotices.length > 0) setFeaturedNotice(filteredNotices[0]);

        document.addEventListener('DOMContentLoaded', () => {
            const galleryItems = document.querySelectorAll('.gallery-item img');
            const modal = document.getElementById('galleryModal');
            const modalImg = document.getElementById('modalImg');
            const closeBtn = modal.querySelector('.close');
            const prevBtn = document.getElementById('prevImg');
            const nextBtn = document.getElementById('nextImg');

            let currentIndex = 0;

            // Open modal with fade-in animation
            function openModal(index) {
                currentIndex = index;
                modalImg.src = galleryItems[currentIndex].src;
                modal.style.display = 'flex';
                modal.classList.add('fade-in');
                document.body.style.overflow = 'hidden';
            }

            // Close modal with fade-out
            function closeModal() {
                modal.classList.remove('fade-in');
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('fade-out');
                    document.body.style.overflow = '';
                }, 200);
            }

            // Click on gallery images
            galleryItems.forEach((img, index) => {
                img.addEventListener('click', () => openModal(index));
            });

            // Navigation functions
            function showNext() {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                modalImg.src = galleryItems[currentIndex].src;
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                modalImg.src = galleryItems[currentIndex].src;
            }

            // Event listeners
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
            prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'flex') {
                    if (e.key === 'ArrowRight') showNext();
                    else if (e.key === 'ArrowLeft') showPrev();
                    else if (e.key === 'Escape') closeModal();
                }
            });

            // Touch support for swipe on mobile
            let touchStartX = 0;
            let touchEndX = 0;

            modalImg.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
            modalImg.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchEndX - touchStartX > 50) showPrev();
                if (touchStartX - touchEndX > 50) showNext();
            });
        });


        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            counter.innerText = '0';

            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                const increment = target / 200;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });

