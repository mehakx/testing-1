// Apartment Building Window Interactions
document.addEventListener('DOMContentLoaded', function () {
  // grabbing all the windows from the page
  const windows = document.querySelectorAll('.window-frame');

  // mapping city names → which page they should link to
  const cityDestinations = {
    'NYC Night': 'page2.html',
    'Italian Kitchen': 'page2.html',
    'Paris Café': 'page2.html',
    'Tropical Market': 'music-page-grid.html',
    'Manhattan Day': 'music-page-grid.html',
    'Little Italy': 'music-page-grid.html',
    'Café Culture': 'page2.html',
    'Academic Life': 'music-page-grid.html',
    'Sports Culture': 'music-page-grid.html',
    'Central Park': 'page2.html',
    'Literary World': 'page2.html'
  };

  // loop through each window and give it behaviors
  windows.forEach((window) => {
    const cityName = window.dataset.city; // custom data from HTML
    const cityDescription = window.dataset.description;

    // when I click a window → shrink slightly → then go to page
    window.addEventListener('click', function () {
      this.style.transform = 'translateY(-8px) scale(0.98)'; // lil bounce
      setTimeout(() => {
        const destination = cityDestinations[cityName] || 'page2.html';
        window.location.href = destination; // go there
      }, 200);
    });

    // when I hover → glow + sound
    window.addEventListener('mouseenter', function () {
      this.style.boxShadow = `
        inset 0 0 30px rgba(78, 205, 196, 0.3),
        0 20px 50px rgba(0, 0, 0, 0.8),
        0 0 40px rgba(78, 205, 196, 0.4)
      `;
      playHoverSound(); // optional lil beep
    });

    // when I leave → reset back to normal
    window.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // keyboard shortcuts: 1, 2, 3 jump to pages, esc resets
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case '1':
        window.location.href = 'apartment-index.html';
        break;
      case '2':
        window.location.href = 'page2.html';
        break;
      case '3':
        window.location.href = 'music-page-grid.html';
        break;
      case 'Escape':
        windows.forEach((w) => {
          w.style.transform = '';
          w.style.boxShadow = '';
        });
        break;
    }
  });

  // hover sound effect using AudioContext
  function playHoverSound() {
    if (
      typeof AudioContext !== 'undefined' ||
      typeof webkitAudioContext !== 'undefined'
    ) {
      try {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // if no AudioContext, just ignore
      }
    }
  }

  // images load in w/ fade + scale animation
  const images = document.querySelectorAll('.window-image, .city-preview img');
  images.forEach((img) => {
    img.addEventListener('load', function () {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });

    // start hidden & smaller
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'all 0.5s ease';
  });

  // scroll animation → fade windows up as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // all windows start low + faded
  windows.forEach((window) => {
    window.style.opacity = '0';
    window.style.transform = 'translateY(30px)';
    window.style.transition = 'all 0.6s ease';
    observer.observe(window);
  });

  // ripple effect when I click a window
  function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(78, 205, 196, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    `;

    button.appendChild(ripple);

    // clean it up after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // inject ripple animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }

    .window-frame {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // attach ripple to every window
  windows.forEach((window) => {
    window.addEventListener('click', createRipple);
  });

  // lil welcome in the console
  console.log(`
    🏢 Welcome to Windows to the World!
    
    Keyboard shortcuts:
    • Press '1' for Windows page
    • Press '2' for Vogue page  
    • Press '3' for Sonic page
    • Press 'Escape' to reset window states
    
    Click any window to explore that city's story!
  `);
});

