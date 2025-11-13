// ===========================
// 공통 컴포넌트 로드
// ===========================
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}

// 모달을 body에 직접 추가
async function loadModal(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const modal = tempDiv.firstElementChild;
        if (modal) {
            document.body.appendChild(modal);
        }
    } catch (error) {
        console.error(`Error loading modal ${filePath}:`, error);
    }
}

// 현재 페이지 경로에 따라 active 클래스 설정
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// 개인정보처리방침 모달 기능
function initPrivacyModal() {
    const privacyLink = document.getElementById('privacy-policy-link');
    const privacyModal = document.getElementById('privacyModal');
    const privacyModalClose = privacyModal ? privacyModal.querySelector('.privacy-modal-close') : null;
    
    if (privacyLink && privacyModal) {
        // 개인정보처리방침 링크 클릭 시 모달 열기
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 모달 닫기 버튼
    if (privacyModalClose) {
        privacyModalClose.addEventListener('click', () => {
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // 모달 배경 클릭 시 닫기
    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                privacyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// 이용약관 모달 기능
function initTermsModal() {
    const termsLink = document.getElementById('terms-of-service-link');
    const termsModal = document.getElementById('termsModal');
    const termsModalClose = termsModal ? termsModal.querySelector('.privacy-modal-close') : null;
    
    if (termsLink && termsModal) {
        // 이용약관 링크 클릭 시 모달 열기
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // 모달 닫기 버튼
    if (termsModalClose) {
        termsModalClose.addEventListener('click', () => {
            termsModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // 모달 배경 클릭 시 닫기
    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                termsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ESC 키로 모든 모달 닫기
function initModalEscapeKey() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const privacyModal = document.getElementById('privacyModal');
            const termsModal = document.getElementById('termsModal');
            
            if (privacyModal && privacyModal.classList.contains('active')) {
                privacyModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (termsModal && termsModal.classList.contains('active')) {
                termsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// 컴포넌트 로드 및 초기화
document.addEventListener('DOMContentLoaded', async () => {
    // Header와 Footer 로드
    await loadComponent('header-container', 'components/header.html');
    await loadComponent('footer-container', 'components/footer.html');
    
    // 모달 로드
    await loadModal('components/privacy-modal.html');
    await loadModal('components/terms-modal.html');
    
    // Active 링크 설정
    setActiveNavLink();
    
    // Footer 로드 후 모달 초기화 (약간의 지연을 두어 DOM이 완전히 렌더링되도록)
    setTimeout(() => {
        initPrivacyModal();
        initTermsModal();
        initModalEscapeKey();
    }, 100);
    
    // 기존 script.js의 기능들이 로드된 후 실행되도록 보장
    if (typeof window.initComponents === 'function') {
        window.initComponents();
    }
});

