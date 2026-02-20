// Navbar Scroll Effect
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    // Header Style change
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        // Only remove if it's the index page and not blog page (which has it static)
        if (!document.body.classList.contains('blog-page') && window.location.pathname.indexOf('blog.html') === -1) {
            header.classList.remove('scrolled');
        }
    }

    // Scroll Top Button Visibility
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('bi-list', 'bi-x');
    } else {
        icon.classList.replace('bi-x', 'bi-list');
    }
});

// Close mobile menu when a link is clicked
const links = navLinks.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('bi-x', 'bi-list');
    });
});

// Smooth Scroll to Top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Preloader / Appearance logic (optional animation)
document.addEventListener('DOMContentLoaded', () => {
    // If it's the blog page, ensure header is scrolled by default
    if (window.location.pathname.indexOf('blog.html') !== -1 || document.querySelector('.article-content')) {
        header.classList.add('scrolled');
    }

    // --- Automatic TOC Generation ---
    const article = document.querySelector('.article-content');
    const tocList = document.querySelector('.toc-list');

    if (article && tocList) {
        const headings = article.querySelectorAll('h2, h3');
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.setAttribute('id', id);

            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';

            const a = document.createElement('a');
            a.setAttribute('href', `#${id}`);
            a.textContent = heading.textContent;

            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // TOC Toggle
    const tocHeader = document.querySelector('.toc-header');
    if (tocHeader) {
        tocHeader.addEventListener('click', () => {
            const list = document.querySelector('.toc-list');
            const icon = tocHeader.querySelector('i');
            if (list.style.display === 'none') {
                list.style.display = 'block';
                icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
            } else {
                list.style.display = 'none';
                icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
            }
        });
    }

    // --- FAQ Toggles ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
            const icon = q.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.replace('bi-plus', 'bi-dash');
            } else {
                icon.classList.replace('bi-dash', 'bi-plus');
            }
        });
    });

    // --- Social Sharing ---
    const shareBtns = document.querySelectorAll('.share-btn');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let shareUrl = '';
            if (btn.classList.contains('share-wa')) {
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
            } else if (btn.classList.contains('share-fb')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('share-tw')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            }
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
});
