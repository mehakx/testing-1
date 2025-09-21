// Music Collage Interactive Script
document.addEventListener('DOMContentLoaded', function() {
    const albumItems = document.querySelectorAll('.album-item');
    
    // Add hover sound effect (visual feedback)
    albumItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Add a subtle pulse effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add a subtle glow effect
            this.style.boxShadow = `0 20px 60px rgba(78, 205, 196, 0.3)`;
            
            // Trigger lyric reveal animation
            const lyricText = this.querySelector('.lyric-text');
            const albumInfo = this.querySelector('.album-info');
            
            if (lyricText && albumInfo) {
                lyricText.style.animationDelay = '0.1s';
                albumInfo.style.animationDelay = '0.2s';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset transform and shadow
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click interaction for additional feedback
        item.addEventListener('click', function() {
            // Create ripple effect
            createRipple(this, event);
            
            // Brief scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Create ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
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
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .album-item {
            overflow: visible !important;
        }
        
        .album-item > div:first-child {
            overflow: hidden;
            border-radius: 15px;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'r':
            case 'R':
                // Shuffle album positions slightly
                shuffleAlbums();
                break;
            case 's':
            case 'S':
                // Show all lyrics briefly
                showAllLyrics();
                break;
            case 'h':
            case 'H':
                // Hide all overlays
                hideAllOverlays();
                break;
        }
    });
    
    function shuffleAlbums() {
        albumItems.forEach(item => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotate = (Math.random() - 0.5) * 10;
            
            item.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            // Reset after 2 seconds
            setTimeout(() => {
                item.style.transform = '';
            }, 2000);
        });
    }
    
    function showAllLyrics() {
        albumItems.forEach((item, index) => {
            setTimeout(() => {
                const overlay = item.querySelector('.album-overlay');
                overlay.style.opacity = '1';
                
                setTimeout(() => {
                    overlay.style.opacity = '';
                }, 1500);
            }, index * 100);
        });
    }
    
    function hideAllOverlays() {
        albumItems.forEach(item => {
            const overlay = item.querySelector('.album-overlay');
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.style.opacity = '';
            }, 1000);
        });
    }
    
    // Add floating animation to corner elements
    const cornerElements = document.querySelectorAll('.corner-element');
    cornerElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });
    
    // Add floating keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Add subtle parallax effect to background
    document.addEventListener('mousemove', function(event) {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;
        
        document.body.style.backgroundPosition = `${x}% ${y}%`;
    });
    
    // Add loading animation
    albumItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    console.log('🎵 Music Collage Loaded!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   R - Shuffle albums');
    console.log('   S - Show all lyrics');
    console.log('   H - Hide all overlays');
});
