// ===========================
// 헤더 스크롤 효과
// ===========================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// 모바일 메뉴
// ===========================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer (Fade In Animation)
// ===========================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// fade-in 클래스를 가진 요소들을 관찰
document.querySelectorAll('.fade-in').forEach(element => {
    element.classList.add('fade-in-view');
    observer.observe(element);
});

// ===========================
// Portfolio Filter (Works 페이지)
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 포트폴리오 아이템 필터링
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===========================
// Portfolio Modal (Works 페이지)
// ===========================
const portfolioModal = document.getElementById('portfolioModal');
const portfolioModalImagesGrid = document.getElementById('portfolioModalImages');
const portfolioModalClose = document.querySelector('.portfolio-modal-close');

// 포트폴리오 아이템 클릭 시 모달 열기
if (portfolioItems.length > 0) {
    portfolioItems.forEach(item => {
        const portfolioImage = item.querySelector('.portfolio-image img');
        
        if (portfolioImage) {
            item.addEventListener('click', (e) => {
                // 필터 버튼 클릭은 무시
                if (e.target.classList.contains('filter-btn')) {
                    return;
                }
                
                const imageFolder = item.getAttribute('data-image-folder');
                
                if (portfolioModal && portfolioModalImagesGrid) {
                    // 기존 이미지 제거
                    portfolioModalImagesGrid.innerHTML = '';
                    
                    if (imageFolder) {
                        // 폴더 내 모든 이미지 로드
                        loadFolderImages(imageFolder, portfolioModalImagesGrid);
                    } else {
                        // 단일 이미지인 경우 (기존 방식)
                        const imageSrc = portfolioImage.getAttribute('src');
                        const imageAlt = portfolioImage.getAttribute('alt') || '';
                        const img = document.createElement('img');
                        img.src = imageSrc;
                        img.alt = imageAlt;
                        portfolioModalImagesGrid.appendChild(img);
                    }
                    
                    portfolioModal.classList.add('active');
                }
            });
        }
    });
}

// 폴더 내 이미지 로드 함수
function loadFolderImages(folderPath, container) {
    // game-anniversary 폴더의 경우
    if (folderPath.includes('game-anniversary')) {
        const imageFiles = [
            'game-annive1.jpg',
            'game-annive2.jpg',
            'game-annive3.jpg',
            'game-annive4.jpg',
            'game-annive5.jpg'
        ];
        
        imageFiles.forEach((filename, index) => {
            const img = document.createElement('img');
            img.src = `${folderPath}/${filename}`;
            img.alt = `Game Anniversary ${index + 1}`;
            img.loading = 'lazy';
            container.appendChild(img);
        });
    } else {
        // 다른 폴더의 경우 기본 이미지 표시
        const portfolioImage = document.querySelector('.portfolio-image img');
        if (portfolioImage) {
            const imageSrc = portfolioImage.getAttribute('src');
            const imageAlt = portfolioImage.getAttribute('alt') || '';
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = imageAlt;
            container.appendChild(img);
        }
    }
}

// 단일 이미지 추가 시에도 클릭 이벤트 추가
if (portfolioModalImagesGrid) {
    // 동적으로 추가되는 이미지에 대해 이벤트 위임
    portfolioModalImagesGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            openImageLightbox(e.target.src, e.target.alt);
        }
    });
}

// 모달 닫기 함수
function closePortfolioModal() {
    if (portfolioModal) {
        portfolioModal.classList.remove('active');
    }
}

// 닫기 버튼 클릭
if (portfolioModalClose) {
    portfolioModalClose.addEventListener('click', closePortfolioModal);
}

// 모달 외부 클릭 시 닫기
if (portfolioModal) {
    // 모달 콘텐츠 내부 클릭은 이벤트 전파 방지
    const portfolioModalContent = document.querySelector('.portfolio-modal-content');
    if (portfolioModalContent) {
        portfolioModalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // 모달 배경 클릭 시 닫기
    portfolioModal.addEventListener('click', (e) => {
        // 모달 콘텐츠 클릭은 무시
        if (e.target === portfolioModal || e.target.closest('.portfolio-modal-content')) {
            if (e.target === portfolioModal) {
                closePortfolioModal();
            }
            return;
        }
    });
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (portfolioModal && portfolioModal.classList.contains('active')) {
            closePortfolioModal();
        }
        if (imageLightbox && imageLightbox.classList.contains('active')) {
            closeImageLightbox();
        }
    }
});

// ===========================
// 이미지 확대 Lightbox
// ===========================
const imageLightbox = document.getElementById('imageLightbox');
const imageLightboxImage = document.querySelector('.image-lightbox-image');
const imageLightboxClose = document.querySelector('.image-lightbox-close');

// 이미지 확대 모달 열기
function openImageLightbox(imageSrc, imageAlt) {
    if (imageLightbox && imageLightboxImage) {
        imageLightboxImage.src = imageSrc;
        imageLightboxImage.alt = imageAlt || '';
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 이미지 확대 모달 닫기
function closeImageLightbox() {
    if (imageLightbox) {
        imageLightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 닫기 버튼 클릭
if (imageLightboxClose) {
    imageLightboxClose.addEventListener('click', closeImageLightbox);
}

// Lightbox 외부 클릭 시 닫기
if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox || e.target === imageLightboxImage) {
            closeImageLightbox();
        }
    });
    
    // 이미지 클릭은 이벤트 전파 방지 (닫기 방지)
    if (imageLightboxImage) {
        imageLightboxImage.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// ===========================
// Contact Form (연락 폼 제출)
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // EmailJS 초기화 (Public Key는 EmailJS 계정에서 발급받은 값으로 변경 필요)
    // EmailJS가 로드된 후에만 초기화
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS 대시보드에서 발급받은 Public Key로 변경
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // EmailJS가 로드되지 않은 경우 경고
        if (typeof emailjs === 'undefined') {
            alert('이메일 서비스가 로드되지 않았습니다. 페이지를 새로고침해주세요.');
            return;
        }

        // EmailJS를 사용한 이메일 전송
        // Service ID와 Template ID는 EmailJS 대시보드에서 확인 후 변경 필요
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
            .then(function(response) {
                console.log('이메일 전송 성공!', response.status, response.text);
                
                // 성공 메시지 표시
                alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                
                // 폼 초기화
                contactForm.reset();
            }, function(error) {
                console.log('이메일 전송 실패:', error);
                
                // 실패 메시지 표시
                alert('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나 직접 이메일로 문의해주세요.');
            });
    });
}

// ===========================
// Apply Button (채용 공고 지원)
// ===========================
const applyButtons = document.querySelectorAll('.apply-btn');

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 실제로는 지원 페이지로 이동하거나 모달을 열 수 있습니다
        alert('채용 지원 페이지로 이동합니다. careers@n-creation.com으로 이력서를 보내주세요.');
    });
});

// ===========================
// Video Autoplay (비디오 자동 재생 보장)
// ===========================
const videoElement = document.querySelector('.video-background video');

if (videoElement) {
    // 비디오가 로드되면 자동 재생
    videoElement.addEventListener('loadeddata', () => {
        videoElement.play().catch(err => {
            console.log('Video autoplay failed:', err);
        });
    });

    // 페이지가 보이면 비디오 재생
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && videoElement.paused) {
            videoElement.play().catch(err => {
                console.log('Video play failed:', err);
            });
        }
    });
}

// ===========================
// Lazy Loading for Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    // data-src 속성을 가진 이미지들에 대해 lazy loading 적용
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Portfolio Item Animation
// ===========================
portfolioItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);
});

// ===========================
// Active Navigation Link
// ===========================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// ===========================
// Parallax Effect for Hero Section
// ===========================
const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===========================
// Scroll Progress Indicator
// ===========================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 서브 페이지에서만 스크롤 프로그레스 표시
if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
    createScrollProgress();
}

// ===========================
// Back to Top Button
// ===========================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createBackToTopButton();

// 커서 효과 제거됨

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Prevent Right Click on Images (Optional)
// ===========================
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//     });
// });

console.log('N-CREATION website loaded successfully!');

