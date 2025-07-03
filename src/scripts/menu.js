// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

function openMobileMenu() {
    mobileMenu.classList.remove('opacity-0', 'invisible');
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeMobileMenu() {
    mobileMenu.classList.add('opacity-0', 'invisible');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('invisible')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Optional: close menu when clicking outside nav (mobile only)
    mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});


const mobileTopicsBtns = document.querySelectorAll('.mobile-topics-btn');
mobileTopicsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const container = btn.parentElement;
        const mobileTopicsDropdown = container.querySelector('.mobile-topics-dropdown');
        const mobileTopicsChevron = btn.querySelector('.mobile-topics-chevron');
        
        if (mobileTopicsDropdown && mobileTopicsChevron) {
        mobileTopicsDropdown.classList.toggle('hidden');
        mobileTopicsChevron.classList.toggle('rotate-180');
        }
    });
});