// Store Data
const stores = [
    {
        id: 1,
        name: "빙동댕 강남점",
        region: "서울",
        address: "서울시 강남구 테헤란로 123",
        phone: "02-1234-5678",
        emoji: "🏢"
    },
    {
        id: 2,
        name: "빙동댕 홍대점",
        region: "서울",
        address: "서울시 마포구 홍익로 45",
        phone: "02-2345-6789",
        emoji: "🎨"
    },
    {
        id: 3,
        name: "빙동댕 명동점",
        region: "서울",
        address: "서울시 중구 명동길 78",
        phone: "02-3456-7890",
        emoji: "🛍️"
    },
    {
        id: 4,
        name: "빙동댕 신촌점",
        region: "서울",
        address: "서울시 서대문구 신촌로 234",
        phone: "02-4567-8901",
        emoji: "📚"
    },
    {
        id: 5,
        name: "빙동댕 잠실점",
        region: "서울",
        address: "서울시 송파구 올림픽로 567",
        phone: "02-5678-9012",
        emoji: "🎡"
    },
    {
        id: 6,
        name: "빙동댕 분당점",
        region: "경기",
        address: "경기도 성남시 분당구 판교역로 89",
        phone: "031-1234-5678",
        emoji: "🌳"
    },
    {
        id: 7,
        name: "빙동댕 수원점",
        region: "경기",
        address: "경기도 수원시 영통구 광교중앙로 123",
        phone: "031-2345-6789",
        emoji: "🏰"
    },
    {
        id: 8,
        name: "빙동댕 일산점",
        region: "경기",
        address: "경기도 고양시 일산서구 중앙로 456",
        phone: "031-3456-7890",
        emoji: "🌸"
    },
    {
        id: 9,
        name: "빙동댕 인천구월점",
        region: "인천",
        address: "인천시 남동구 구월동 예술로 789",
        phone: "032-1234-5678",
        emoji: "⚓"
    },
    {
        id: 10,
        name: "빙동댕 송도점",
        region: "인천",
        address: "인천시 연수구 센트럴로 234",
        phone: "032-2345-6789",
        emoji: "🌊"
    }
];

// Countdown Timer
function initCountdown() {
    const countdownDate = new Date("Dec 31, 2025 23:59:59").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Store Filtering and Display
function renderStores(filterRegion = 'all') {
    const storesGrid = document.getElementById('storesGrid');
    const filteredStores = filterRegion === 'all' 
        ? stores 
        : stores.filter(store => store.region === filterRegion);
    
    storesGrid.innerHTML = filteredStores.map(store => `
        <div class="store-card fade-in">
            <div class="store-image">${store.emoji}</div>
            <div class="store-info">
                <h3 class="store-name">${store.name}</h3>
                <div class="store-address">
                    <span>📍</span>
                    <span>${store.address}</span>
                </div>
                <div class="store-phone">
                    <span>📞</span>
                    <a href="tel:${store.phone.replace(/-/g, '')}">${store.phone}</a>
                </div>
                <a href="tel:${store.phone.replace(/-/g, '')}" class="btn btn-primary">전화 문의하기</a>
            </div>
        </div>
    `).join('');
}

// Store Filter Buttons
function initStoreFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter region and render stores
            const region = button.getAttribute('data-region');
            renderStores(region);
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80; // Offset for fixed headers if any
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animation - Fade in elements
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.product-card, .solution-card, .step, .store-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add phone call analytics (optional)
function trackPhoneCall(storeName) {
    console.log(`Phone call initiated to: ${storeName}`);
    // Add analytics tracking here if needed (e.g., Google Analytics)
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer
    initCountdown();
    
    // Render initial stores (all stores)
    renderStores('all');
    
    // Initialize store filter
    initStoreFilter();
    
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimation();
    
    // Add tracking to phone links
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href.startsWith('tel:')) {
            const storeCard = e.target.closest('.store-card');
            if (storeCard) {
                const storeName = storeCard.querySelector('.store-name').textContent;
                trackPhoneCall(storeName);
            }
        }
    });
    
    console.log('🎉 빙동댕 프로모션 페이지가 로드되었습니다!');
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Add any resize-specific logic here if needed
        console.log('Window resized');
    }, 250);
});

// Prevent default form submission if forms are added later
document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submission prevented - implement form handling');
});

// Export functions for potential external use
window.BingDongDeng = {
    renderStores,
    stores,
    initCountdown,
    initFAQ
};
