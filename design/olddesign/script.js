// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeScrollEffects();
    initializeMobileMenu();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Canvas Node Graph Animation
function initializeCanvas() {
    const canvas = document.getElementById('nodeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [];
    const nodeCount = 80;

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 3 + 1;
            this.color = ['#0066FF', '#8B5CF6', '#00D9FF', '#10B981'][Math.floor(Math.random() * 4)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    
                    const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    gradient.addColorStop(0, nodes[i].color);
                    gradient.addColorStop(1, nodes[j].color);
                    
                    ctx.strokeStyle = gradient;
                    ctx.globalAlpha = (1 - distance / 200) * 0.3;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Scroll Effects
function initializeScrollEffects() {
    const reveals = document.querySelectorAll('.reveal');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const capabilityCards = document.querySelectorAll('.capability-card');
    const clcItems = document.querySelectorAll('.clc-item');
    const processSteps = document.querySelectorAll('.process-step');
    const statItems = document.querySelectorAll('.stat-item');
    const techVizCards = document.querySelectorAll('.tech-viz-card');
    const caseStudyCards = document.querySelectorAll('.case-study-card');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        // Standard reveals
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });

        // Capability cards - sequential animation
        capabilityCards.forEach((card, index) => {
            const elementTop = card.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                card.classList.add('animate-in');
            }
        });

        // CLC items - sequential animation
        clcItems.forEach((item, index) => {
            const elementTop = item.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                item.classList.add('animate-in');
            }
        });

        // Process steps - sequential animation
        processSteps.forEach((step, index) => {
            const elementTop = step.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                step.classList.add('animate-in');
            }
        });

        // Stat items - sequential animation
        statItems.forEach((stat, index) => {
            const elementTop = stat.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                stat.classList.add('animate-in');
            }
        });

        // Tech viz cards - sequential animation
        techVizCards.forEach((card, index) => {
            const elementTop = card.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                card.classList.add('animate-in');
            }
        });

        // Case study cards - sequential animation
        caseStudyCards.forEach((card, index) => {
            const elementTop = card.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                card.classList.add('animate-in');
            }
        });

        // Timeline items - sequential animation
        timelineItems.forEach((item, index) => {
            const elementTop = item.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 200);
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Animated Counters
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight - 100) {
        hasAnimated = true;
        
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth Scrolling
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Form Submit Handler
function handleSubmit(e) {
    e.preventDefault();
    alert('TRANSMISSION RECEIVED. RESPONSE VECTOR INITIALIZING...');
    e.target.reset();
    return false;
}

// Custom Cursor Glow
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.innerWidth >= 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}