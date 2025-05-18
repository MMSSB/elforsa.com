 document.addEventListener('DOMContentLoaded', () => {
            // Select elements
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const dotsContainer = document.querySelector('.dots-container');
            
            // Variables
            let currentIndex = 0;
            let autoSlideInterval;
            const autoSlideDelay = 3500; // 3 seconds
            
            // Available transition effects
            const transitionEffects = ['fade', 'slideRight', 'slideLeft', 'zoom', 'slideUp'];
            
            // Initialize - make first slide active
            slides[0].classList.add('active');
            slides[0].classList.add(`transition-${transitionEffects[0]}`);
            
            // Create dot indicators
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => showSlide(index));
                dotsContainer.appendChild(dot);
            });
            
            // Get all dots
            const dots = document.querySelectorAll('.dot');
            
            // Main function to show a slide
            function showSlide(index) {
                // Handle index boundaries
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                
                // Skip if already on this slide
                if (index === currentIndex) return;
                
                // Remove active class from all slides and dots
                slides.forEach(slide => {
                    slide.classList.remove('active');
                    slide.classList.remove('transition-fade', 'transition-slideRight', 
                                          'transition-slideLeft', 'transition-zoom', 'transition-slideUp');
                });
                
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Apply random transition effect
                const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
                slides[index].classList.add(`transition-${randomEffect}`);
                
                // Activate the new slide and dot
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                
                // Update the current index
                currentIndex = index;
                
                // Reset auto slide timer
                resetAutoSlide();
            }
            
            // Next slide function
            function nextSlide() {
                showSlide(currentIndex + 1);
            }
            
            // Previous slide function
            function prevSlide() {
                showSlide(currentIndex - 1);
            }
            
            // Start auto slide
            function startAutoSlide() {
                autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
            }
            
            // Reset auto slide timer
            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }
            
            // Event listeners
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            // Touch events for mobile swipe
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                // Pause auto slide while touching
                clearInterval(autoSlideInterval);
            });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                // Restart auto slide after touch
                startAutoSlide();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide(); // Swipe left -> next slide
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide(); // Swipe right -> prev slide
                }
            }
            
            // Pause auto slide on hover
            slider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });
            
            // Initialize auto slide
            startAutoSlide();
        });