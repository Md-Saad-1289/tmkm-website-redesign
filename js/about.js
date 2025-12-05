
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

