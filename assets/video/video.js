
// YouTube API setup
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player(document.querySelector('.slide.active iframe'), {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // YouTube player is ready
}

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  
  // Initialize slider
  function showSlide(index) {
    // Pause current video before switching
    const activeVideo = slides[currentIndex].querySelector('video');
    if (activeVideo) {
      activeVideo.pause();
    }
    
    // If YouTube, pause it
    if (typeof player !== 'undefined' && player.pauseVideo) {
      player.pauseVideo();
    }
    
    // Update slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
    
    // Load YouTube API if this slide has YouTube
    if (slides[index].querySelector('iframe') && 
        slides[index].querySelector('iframe').src.includes('youtube.com')) {
      if (typeof YT === 'undefined') {
        loadYouTubeAPI();
      }
    }
  }
  
  // Load YouTube API dynamically
//   function loadYouTubeAPI() {
//     const tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//   }
  
  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }
  
  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event from reaching video
      showSlide(index);
    });
  });
  
  // Button navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
  
  // Initialize first slide
  showSlide(0);
  
  // Special handling for YouTube iframes
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('click', (e) => {
      e.stopPropagation(); // Allow clicks inside iframe
    });
  });
  
  // Special handling for local videos
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', (e) => {
      e.stopPropagation(); // Allow video controls to work
    });
  });
});
