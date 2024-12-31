// 深色模式切換
const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌓';
});

// 改進縮放控制
const zoomControl = document.getElementById('zoom-control');
zoomControl.addEventListener('input', (e) => {
    const zoomLevel = e.target.value;
    document.documentElement.style.setProperty('--zoom-level', `${zoomLevel}%`);
    document.body.style.zoom = `${zoomLevel}%`;
    // 備用方案
    if (typeof document.body.style.zoom === 'undefined') {
        document.body.style.transform = `scale(${zoomLevel / 100})`;
    }
});

// 改進主題顏色控制
const themeColor = document.getElementById('theme-color');
themeColor.addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--theme-color', color);
    
    // 更新相關元素的顏色
    document.querySelectorAll('.theme-colored').forEach(el => {
        el.style.color = color;
    });
    
    // 更新漸變背景
    document.querySelectorAll('.gradient-bg').forEach(el => {
        el.style.background = `linear-gradient(45deg, ${color}15, ${color}30)`;
    });
});

// 增加字體大小控制
const fontSizeControl = document.getElementById('font-size-control');
fontSizeControl.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--base-font-size', `${e.target.value}px`);
});

// 動畫速度控制
const animationSpeed = document.getElementById('animation-speed');
animationSpeed.addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--animation-speed', e.target.value);
});

// 頁腳主題切換
const footerTheme = document.getElementById('footer-theme');
footerTheme.addEventListener('change', (e) => {
    const footer = document.querySelector('.site-footer');
    footer.className = 'site-footer ' + e.target.value;
});

// 滑鼠hover效果
document.querySelectorAll('section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.01)';
        section.style.transition = 'transform 0.3s ease';
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)';
    });
});

// 圖片hover效果
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.filter = 'brightness(1.1)';
        img.style.transition = 'all 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.filter = 'brightness(1)';
    });
});

// 平滑捲動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 滾動進入動畫
function handleScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        fadeInObserver.observe(section);
    });
}

// 滑鼠跟隨效果
function createMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
}

// GTA V Mods Gallery
function initModGallery() {
    const mainImage = document.querySelector('.mod-main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    let currentIndex = 0;

    function updateGallery(index) {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        mainImage.src = thumbnails[index].src;
        currentIndex = index;
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateGallery(index));
    });

    prevBtn.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;
        updateGallery(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = currentIndex === thumbnails.length - 1 ? 0 : currentIndex + 1;
        updateGallery(newIndex);
    });

    // 鍵盤控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// 添加滑鼠視差效果
function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.05;

        document.querySelectorAll('.parallax-item').forEach(item => {
            const speed = item.dataset.speed || 1;
            item.style.transform = `translate3d(${moveX * speed}px, ${moveY * speed}px, 50px)`;
        });
    });
}

// 添加打字機效果
function typeWriter(element, text, speed = 50) { // 將速度從 100 改為 50
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 添加捲動進度條
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 工��經驗時間軸動畫
function initTimelineAnimation() {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// 圖片模態框
function initImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal hidden';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="" alt="Modal Image">
            <button class="modal-close">×</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.zoomable-image').forEach(img => {
        img.addEventListener('click', () => {
            modal.querySelector('img').src = img.src;
            modal.classList.remove('hidden');
        });
    });

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

// 增強版主題切換
function enhanceThemeToggle() {
    const themes = {
        default: {
            '--theme-color': '#FF6B6B',
            '--secondary-color': '#4ECDC4',
            '--accent-color': '#45B7AF'
        },
        ocean: {
            '--theme-color': '#2193b0',
            '--secondary-color': '#6dd5ed',
            '--accent-color': '#45b7af'
        },
        sunset: {
            '--theme-color': '#ff9a9e',
            '--secondary-color': '#fad0c4',
            '--accent-color': '#ffd1ff'
        },
        forest: {
            '--theme-color': '#134E5E',
            '--secondary-color': '#71B280',
            '--accent-color': '#2ecc71'
        },
        cyber: {
            '--theme-color': '#ff00ff',
            '--secondary-color': '#00ffff',
            '--accent-color': '#33ff33'
        },
        minimal: {
            '--theme-color': '#2c3e50',
            '--secondary-color': '#34495e',
            '--accent-color': '#7f8c8d'
        },
        neon: {
            '--theme-color': '#ff1493',
            '--secondary-color': '#00ff00',
            '--accent-color': '#ff4500'
        },
        midnight: {
            '--theme-color': '#4B0082',
            '--secondary-color': '#8A2BE2',
            '--accent-color': '#9400D3'
        }
    };

    const themeSelect = document.getElementById('theme-select');
    themeSelect.addEventListener('change', (e) => {
        const theme = themes[e.target.value];
        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    });
}

// 移動裝置導航欄切換
const navToggle = document.createElement('button');
navToggle.id = 'nav-toggle';
navToggle.innerHTML = '☰';
document.querySelector('header').appendChild(navToggle);

navToggle.addEventListener('click', () => {
    document.querySelector('.nav-list').classList.toggle('show');
});

// 點擊導航項目後自動關閉選單
document.querySelectorAll('.nav-list a').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-list').classList.remove('show');
        }
    });
});

// Back to Top Button Functionality
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Section Animations
function initSectionEffects() {
    document.querySelectorAll('section').forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(section);
    });
}

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.image-modal');
    const modalImg = document.querySelector('.modal-content img');
    const closeModal = document.querySelector('.modal-close');

    // Function to open modal with the clicked image
    function openModal(event) {
        modal.style.display = 'flex';
        modalImg.src = event.target.src;
    }

    // Attach click event to all images in GTA and 3D model sections
    const images = document.querySelectorAll('.gta-section img, .modeling-section img');
    images.forEach(img => {
        img.addEventListener('click', openModal);
    });

    // Close modal when the close button is clicked
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function changeMainImage(src) {
    const mainImage = document.querySelector('#mainGTAImage');
    if (mainImage) mainImage.src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-item img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) thumb.classList.add('active');
    });
}

// Function to change main overview image
function changeMainOverviewImage(src) {
    const mainImage = document.getElementById('mainOverviewImage');
    if (mainImage) mainImage.src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.model-overview .thumbnail-item img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) thumb.classList.add('active');
    });
}

// Function to change main model image
function changeMainModelImage(src, modelId) {
    const mainImage = document.getElementById(`mainModelImage${modelId}`);
    if (mainImage) mainImage.src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll(`.model-item[data-model-id="${modelId}"] .thumbnail-item img`);
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) thumb.classList.add('active');
    });
}

// Function to change video editing image
function changeVideoImage(src) {
    const mainImage = document.querySelector('#mainVideoImage');
    if (mainImage) mainImage.src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.video-gallery .thumbnail-item img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) thumb.classList.add('active');
    });
}

// Initialize video gallery
function initVideoGallery() {
    const mainImage = document.querySelector('#mainVideoImage');
    const thumbnails = document.querySelectorAll('.video-gallery .thumbnail-item img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// Function to change UI design image
function changeUIImage(src) {
    document.getElementById('mainUIImage').src = src;
    document.querySelectorAll('.thumbnails-row img').forEach(img => {
        img.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize UI gallery
function initUIGallery() {
    const mainImage = document.querySelector('#mainUIImage');
    const thumbnails = document.querySelectorAll('.ui-design-section .thumbnail-item img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// 添加滾動漸現效果
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
    createMouseFollower();
    initModGallery();
    initParallaxEffect();
    initScrollProgress();
    initTimelineAnimation();
    initImageModal();
    enhanceThemeToggle();
    initBackToTop();
    initSectionEffects();
    initVideoGallery();
    initUIGallery();
    initScrollAnimations();
    
    // 為標題添加打字機效果
    const welcomeText = document.querySelector('.about-content h2');
    if (welcomeText) {
        typeWriter(welcomeText, welcomeText.textContent);
    }
    
    // Initialize model overview gallery
    const overviewThumbnails = document.querySelectorAll('.model-overview .thumbnail-item img');
    overviewThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => changeMainOverviewImage(thumb.src));
    });
    
    // Initialize individual model galleries
    document.querySelectorAll('.model-item').forEach((item, index) => {
        item.setAttribute('data-model-id', index + 1);
        const thumbnails = item.querySelectorAll('.thumbnail-item img');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => changeMainModelImage(thumb.src, index + 1));
        });
    });
});