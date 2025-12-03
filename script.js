// Store Data - 19개 매장
const stores = [
    // 서울
    { id: 1, name: "마포점", region: "서울", address: "서울 마포구 월드컵북로 73 1층", phone: "0507-1397-5682" },
    { id: 2, name: "영등포점", region: "서울", address: "서울 영등포구 당산로16길 16-1 1층", phone: "0507-1429-5621" },
    { id: 3, name: "종로점", region: "서울", address: "서울 종로구 종로31길 46-1, 1층", phone: "070-4012-1317" },
    { id: 4, name: "신림본점", region: "서울", address: "서울 관악구 봉천로 214 1층", phone: "0507-1367-4711" },

    // 경기
    { id: 5, name: "안양점", region: "경기", address: "경기 안양시 만안구 안양천서로 177 1타임상가16호", phone: "031-348-4387" },
    { id: 6, name: "분당야탑점", region: "경기", address: "경기 성남시 분당구 야탑동 321-8 102호", phone: "031-778-7712" },
    { id: 7, name: "양주점", region: "경기", address: "경기 양주시 옥정동로 193, 1동 403호", phone: "031-868-7981" },

    // 충청
    { id: 8, name: "대전서구점", region: "충청", address: "대전광역시 서구 도안대로 58, 1층 101호", phone: "042-710-0723" },
    { id: 9, name: "천안신부점", region: "충청", address: "충남 천안시 동남구 봉명2길 4", phone: "070-4010-6000" },
    { id: 10, name: "충주점", region: "충청", address: "충북 충주시 연수서림2길 11 상가7동 지하1층 108호", phone: "070-7804-1002" },

    // 전라
    { id: 11, name: "군산점", region: "전라", address: "전북 군산시 상지곡안1길 20-2", phone: "063-468-5882" },
    { id: 12, name: "여수학동점", region: "전라", address: "전남 여수시 학동복길 7 8층 102호", phone: "061-920-4543" },
    { id: 13, name: "화순점", region: "전라", address: "전남 화순군 화순읍 철종로 141-7 114동 1층 119A호", phone: "070-4048-0560" },
    
    // 경상
    { id: 14, name: "울산동구점", region: "경상", address: "울산 동구 봉덕5로 1층", phone: "033-912-7702" },
    { id: 15, name: "부산사직점", region: "경상", address: "부산광역시 동래구 사직동 78-9", phone: "070-4010-1719" },
    { id: 16, name: "영남대점", region: "경상", address: "경북 경산시 압량읍 압량2로2길 3-1 평촌역 영남대점", phone: "053-811-7779" },
    { id: 17, name: "경주용황점", region: "경상", address: "경북 경주시 금성로 309 302동 206호", phone: "02-426-7882" },
    { id: 18, name: "기장정관점", region: "경상", address: "부산 기장군 정관읍 솔마로 1366-3", phone: "051-715-9911" },
    { id: 19, name: "기장일광점", region: "경상", address: "부산 기장군 기장읍 차성로4 36번길6-2 103호", phone: "051-721-8745" }
];

// Pagination
let currentPage = 1;
const itemsPerPage = 9;

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

// Render Stores with Pagination
function renderStores(page = 1) {
    const storesGrid = document.getElementById('storesGrid');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedStores = stores.slice(startIndex, endIndex);

    storesGrid.innerHTML = paginatedStores.map(store => `
        <div class="store-card fade-in">
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
                <a href="tel:${store.phone.replace(/-/g, '')}" class="btn btn-primary store-call-btn">전화 예약하기</a>
            </div>
        </div>
    `).join('');

    renderPagination();
}

// Render Pagination
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const totalPages = Math.ceil(stores.length / itemsPerPage);

    let paginationHTML = '';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">‹</button>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">›</button>`;
    }

    paginationContainer.innerHTML = paginationHTML;
}

// Change Page
function changePage(page) {
    currentPage = page;
    renderStores(currentPage);

    // Scroll to stores section
    document.getElementById('stores').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                const offset = 80;
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

    const animateElements = document.querySelectorAll('.product-card, .solution-card, .step, .store-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add phone call analytics
function trackPhoneCall(storeName) {
    console.log(`Phone call initiated to: ${storeName}`);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    renderStores(1);
    initFAQ();
    initSmoothScroll();
    initScrollAnimation();

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

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized');
    }, 250);
});

// Prevent default form submission
document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submission prevented - implement form handling');
});

// Export functions
window.BingDongDeng = {
    renderStores,
    stores,
    initCountdown,
    initFAQ,
    changePage
};
