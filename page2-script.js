// VOGUE DECONSTRUCTED COLLAGE - PAGE 2 INTERACTIVE SCRIPT
// Static collage layout with hover-only glitch effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all interactive elements
    const letters = document.querySelectorAll('.letter');
    const wordFragments = document.querySelectorAll('.word-fragment');
    const stackLines = document.querySelectorAll('.stack-line');
    const magazineCovers = document.querySelectorAll('.magazine-cover');
    const chaosTexts = document.querySelectorAll('.chaos-text');
    const glitchElements = document.querySelectorAll('.glitch-element');
    const geoShapes = document.querySelectorAll('.geo-shape');
    
    let isGlitchMode = false;
    
    // Magazine cover interactions - HOVER ONLY, NO CLICK MOVEMENT
    magazineCovers.forEach((cover, index) => {
        // Hover effects only
        cover.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        cover.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
        
        // Subtle breathing animation
        setInterval(() => {
            if (!cover.matches(':hover')) {
                const randomX = (Math.random() - 0.5) * 2;
                const randomY = (Math.random() - 0.5) * 2;
                const originalTransforms = [
                    'rotate(-8deg)', 'rotate(12deg)', 'rotate(-5deg)', 'rotate(18deg)',
                    'rotate(-12deg)', 'rotate(8deg)', 'rotate(-15deg)', 'rotate(10deg)',
                    'rotate(-6deg)', 'rotate(14deg)', 'rotate(-10deg)', 'rotate(16deg)',
                    'rotate(-18deg)', 'rotate(9deg)'
                ];
                
                cover.style.transform = `${originalTransforms[index]} translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    cover.style.transform = originalTransforms[index];
                }, 1500);
            }
        }, 10000 + Math.random() * 15000);
    });
    
    // VOGUE letter interactions - click for explosion effects
    letters.forEach((letter, index) => {
        letter.addEventListener('click', function(e) {
            e.stopPropagation();
            createLetterExplosion(this.textContent, e.clientX, e.clientY);
        });
        
        // Random letter twitching
        setInterval(() => {
            if (!isGlitchMode && Math.random() < 0.08) {
                letter.style.animation = 'none';
                letter.style.transform = `scale(${0.9 + Math.random() * 0.2}) rotate(${(Math.random() - 0.5) * 10}deg)`;
                
                setTimeout(() => {
                    letter.style.animation = '';
                    letter.style.transform = '';
                }, 400);
            }
        }, 4000 + Math.random() * 6000);
    });
    
    // Word fragment interactions
    wordFragments.forEach((fragment, index) => {
        fragment.addEventListener('click', function(e) {
            e.stopPropagation();
            createWordExplosion(this.textContent, e.clientX, e.clientY);
        });
    });
    
    // Stack line interactions
    stackLines.forEach((line, index) => {
        line.addEventListener('click', function(e) {
            e.stopPropagation();
            stackLineGlitch(this);
        });
    });
    
    // Chaos text interactions - shuffle on click
    chaosTexts.forEach((text, index) => {
        text.addEventListener('click', function(e) {
            e.stopPropagation();
            shuffleChaosText(this);
        });
        
        // Set random rotation variable
        text.style.setProperty('--rotation', `${(Math.random() - 0.5) * 25}deg`);
        
        // Random color changes
        setInterval(() => {
            if (Math.random() < 0.12) {
                const colors = ['#ff0080', '#00ffff', '#ffff00', '#ff8000', '#8000ff', '#00ff80'];
                text.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                setTimeout(() => {
                    text.style.color = '';
                }, 2000);
            }
        }, 6000);
    });
    
    // Glitch element interactions
    glitchElements.forEach((element, index) => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            glitchElementCorrupt(this);
        });
    });
    
    // Geometric shape interactions
    geoShapes.forEach((shape, index) => {
        shape.addEventListener('click', function(e) {
            e.stopPropagation();
            shapeTransform(this);
        });
    });
    
    // Subtle mouse movement parallax (very reduced)
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Very subtle parallax on chaos text only
        chaosTexts.forEach((text, index) => {
            const speed = (index % 3 + 1) * 0.08;
            const x = (mouseX - 0.5) * speed * 6;
            const y = (mouseY - 0.5) * speed * 6;
            
            text.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Very subtle parallax on geometric shapes
        geoShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.12;
            const x = (mouseX - 0.5) * speed * 4;
            const y = (mouseY - 0.5) * speed * 4;
            
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
    
    // Keyboard interactions
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ') {
            e.preventDefault();
            shuffleTextElements(); // Only shuffle text, not magazine covers
        }
        
        if (e.key === 'g' || e.key === 'G') {
            toggleGlitchMode();
        }
        
        if (e.key === 'r' || e.key === 'R') {
            resetTextElements(); // Only reset text elements
        }
        
        if (e.key === 'c' || e.key === 'C') {
            chaosMode();
        }
    });
    
    // Auto-effects (reduced frequency)
    setInterval(() => {
        if (Math.random() < 0.15) {
            const randomElement = [...letters, ...chaosTexts][Math.floor(Math.random() * (letters.length + chaosTexts.length))];
            randomElement.style.animation = 'text-glitch 0.3s infinite';
            
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 800);
        }
    }, 10000);
    
    // FUNCTIONS
    
    function createLetterExplosion(letterText, x, y) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.textContent = letterText;
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.color = '#ff0080';
            particle.style.fontSize = '1.8rem';
            particle.style.fontFamily = 'Anton, sans-serif';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '2000';
            particle.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
            
            const angle = (i / 6) * Math.PI * 2;
            const velocity = 60 + Math.random() * 60;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');
            particle.style.animation = 'letter-explode 1.8s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1800);
        }
    }
    
    function createWordExplosion(wordText, x, y) {
        const chars = wordText.split('');
        chars.forEach((char, index) => {
            const charElement = document.createElement('div');
            charElement.textContent = char;
            charElement.style.position = 'fixed';
            charElement.style.left = x + 'px';
            charElement.style.top = y + 'px';
            charElement.style.color = '#00ffff';
            charElement.style.fontSize = '2.2rem';
            charElement.style.fontFamily = 'Bebas Neue, cursive';
            charElement.style.pointerEvents = 'none';
            charElement.style.zIndex = '2000';
            charElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
            
            const angle = (index / chars.length) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            charElement.style.setProperty('--vx', vx + 'px');
            charElement.style.setProperty('--vy', vy + 'px');
            charElement.style.animation = 'char-explode 1.5s ease-out forwards';
            
            document.body.appendChild(charElement);
            
            setTimeout(() => {
                if (document.body.contains(charElement)) {
                    document.body.removeChild(charElement);
                }
            }, 1500);
        });
    }
    
    function stackLineGlitch(line) {
        const originalText = line.textContent;
        const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□', '▪', '▫'];
        
        let glitchText = '';
        for (let i = 0; i < originalText.length; i++) {
            glitchText += Math.random() < 0.4 ? originalText[i] : glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        
        line.textContent = glitchText;
        line.style.color = '#ff0000';
        line.style.animation = 'text-glitch 0.5s infinite';
        
        setTimeout(() => {
            line.textContent = originalText;
            line.style.color = '';
            line.style.animation = '';
        }, 1200);
    }
    
    function shuffleChaosText(text) {
        const words = ['STYLE', 'POWER', 'REBEL', 'ICON', 'DREAM', 'BOLD', 'FIERCE', 'UNIQUE', 'VISION', 'FUTURE', 'VOGUE', 'FASHION', 'CULTURE', 'BEAUTY', 'AVANT', 'GARDE'];
        const newText = words[Math.floor(Math.random() * words.length)];
        
        text.style.animation = 'text-glitch 0.4s infinite';
        text.textContent = newText;
        
        setTimeout(() => {
            text.style.animation = '';
        }, 1000);
    }
    
    function glitchElementCorrupt(element) {
        const corruptTexts = ['CORRUPTED', 'ERROR', 'NULL', 'VOID', '404', 'CRASH', 'FATAL', 'OVERFLOW', 'SEGFAULT'];
        const originalText = element.textContent;
        
        element.textContent = corruptTexts[Math.floor(Math.random() * corruptTexts.length)];
        element.style.color = '#ff0000';
        element.style.fontSize = '1.1rem';
        element.style.animation = 'glitch-rapid 0.1s infinite';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
            element.style.fontSize = '';
            element.style.animation = '';
        }, 1800);
    }
    
    function shapeTransform(shape) {
        const transforms = [
            'scale(1.4) rotate(180deg)',
            'scaleX(1.8) skew(25deg)',
            'scaleY(1.8) skew(-25deg)',
            'scale(0.6) rotate(360deg)',
            'scale(1.2) skew(15deg, 15deg)'
        ];
        
        shape.style.transform = transforms[Math.floor(Math.random() * transforms.length)];
        shape.style.background = `hsl(${Math.random() * 360}, 60%, 40%)`;
        
        setTimeout(() => {
            shape.style.transform = '';
            shape.style.background = '';
        }, 1500);
    }
    
    function shuffleTextElements() {
        // Only shuffle text elements, not magazine covers
        chaosTexts.forEach(text => {
            const randomX = Math.random() * (window.innerWidth - 120);
            const randomY = Math.random() * (window.innerHeight - 60);
            const randomRotation = (Math.random() - 0.5) * 30;
            
            text.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            text.style.left = randomX + 'px';
            text.style.top = randomY + 'px';
            text.style.transform = `rotate(${randomRotation}deg)`;
            
            setTimeout(() => {
                text.style.transition = '';
            }, 1200);
        });
    }
    
    function toggleGlitchMode() {
        isGlitchMode = !isGlitchMode;
        document.body.classList.toggle('global-glitch-mode', isGlitchMode);
        
        if (isGlitchMode) {
            // Apply glitch effects to magazine covers
            magazineCovers.forEach(cover => {
                cover.querySelector('img').style.filter = 'hue-rotate(180deg) saturate(2) contrast(1.8)';
                cover.style.animation = 'image-glitch 0.2s infinite';
            });
            
            // Glitch text elements
            [...letters, ...chaosTexts].forEach(element => {
                element.style.animation = 'text-glitch 0.15s infinite';
            });
        } else {
            // Remove glitch effects
            magazineCovers.forEach(cover => {
                cover.querySelector('img').style.filter = '';
                cover.style.animation = '';
            });
            
            [...letters, ...chaosTexts].forEach(element => {
                element.style.animation = '';
            });
        }
    }
    
    function resetTextElements() {
        // Reset only text elements, keep magazine covers in place
        [...chaosTexts, ...letters, ...wordFragments, ...stackLines].forEach(element => {
            element.style.transition = 'all 1.8s ease';
            element.style.left = '';
            element.style.top = '';
            element.style.transform = '';
            element.style.color = '';
            element.style.filter = '';
            
            setTimeout(() => {
                element.style.transition = '';
            }, 1800);
        });
        
        // Reset glitch mode
        document.body.style.filter = '';
        document.body.classList.remove('global-glitch-mode');
        isGlitchMode = false;
        
        // Reset magazine covers
        magazineCovers.forEach(cover => {
            cover.querySelector('img').style.filter = '';
            cover.style.animation = '';
        });
    }
    
    function chaosMode() {
        // Apply chaos effects only to text elements
        [...chaosTexts, ...letters].forEach(element => {
            element.style.animation = 'text-glitch 0.08s infinite';
            element.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(2)`;
        });
        
        // Subtle chaos for magazine covers
        magazineCovers.forEach(cover => {
            cover.querySelector('img').style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(1.4) contrast(1.2)`;
        });
        
        setTimeout(() => {
            [...chaosTexts, ...letters].forEach(element => {
                element.style.animation = '';
                element.style.filter = '';
            });
            
            magazineCovers.forEach(cover => {
                cover.querySelector('img').style.filter = '';
            });
        }, 4000);
    }
});

// Add CSS for explosion animations
const style = document.createElement('style');
style.textContent = `
    @keyframes letter-explode {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes char-explode {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0);
            opacity: 0;
        }
    }
    
    .global-glitch-mode * {
        animation-duration: 0.08s !important;
    }
`;
document.head.appendChild(style);
