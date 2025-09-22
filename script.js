// Apartment Building Window Interactions

document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window-frame');
    
    // City destinations mapping
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
    
    // Add click handlers to windows
    windows.forEach(window => {
        const cityName = window.dataset.city;
        const cityDescription = window.dataset.description;
        
        // Add click event
        window.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-8px) scale(0.98)';
            
            setTimeout(() => {
                // Navigate to destination
                const destination = cityDestinations[cityName] || 'page2.html';
                window.location.href = destination;
            }, 200);
        });
        
        // Enhanced hover effects
        window.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = `
                inset 0 0 30px rgba(78, 205, 196, 0.3),
                0 20px 50px rgba(0, 0, 0, 0.8),
                0 0 40px rgba(78, 205, 196, 0.4)
            `;
            
            // Play hover sound (optional)
            playHoverSound();
        });
        
        window.addEventListener('mouseleave', function() {
            // Reset transform
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
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
                // Reset all window states
                windows.forEach(w => {
                    w.style.transform = '';
                    w.style.boxShadow = '';
                });
                break;
        }
    });
    
    // Optional: Add subtle hover sound
    function playHoverSound() {
        // Create a subtle audio context for hover feedback
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const audioContext = new (AudioContext || webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Silently fail if audio context is not available
            }
        }
    }
    
    // Add loading animation for images
    const images = document.querySelectorAll('.window-image, .city-preview img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.5s ease';
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all windows for scroll animations
    windows.forEach(window => {
        window.style.opacity = '0';
        window.style.transform = 'translateY(30px)';
        window.style.transition = 'all 0.6s ease';
        observer.observe(window);
    });
    
    // Add ripple effect on click
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
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple animation CSS
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
    
    // Add ripple effect to all windows
    windows.forEach(window => {
        window.addEventListener('click', createRipple);
    });
    
    // Console welcome message
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
