document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
        });

        this.classList.add('active');

        if (window.innerWidth <= 1024) {
            closeSidebar();
        }
    });
});

window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.docs-section');
    const navItems = document.querySelectorAll('.nav-item');

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSectionId}`) {
            item.classList.add('active');
        }
    });
});

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const overlay = document.getElementById('overlay');

function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

sidebarToggle.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', closeSidebar);
});

function handleResize() {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('resize', handleResize);

document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;
    if (hash) {
        const targetItem = document.querySelector(`.nav-item[href="${hash}"]`);
        if (targetItem) {
            document.querySelectorAll('.nav-item').forEach(i => {
                i.classList.remove('active');
            });
            targetItem.classList.add('active');
        }
    }
});


const sidebarNav = document.querySelector('.sidebar-nav');
const searchInput = document.createElement('input');
const noResultsMessage = document.createElement('div');

searchInput.type = 'search';
searchInput.placeholder = 'Search';
searchInput.className = 'sidebar-search';

noResultsMessage.className = 'no-results-message';
noResultsMessage.innerHTML = `
<div class="no-results-icon">🔍</div>
<div class="no-results-title">نتیجه‌ای یافت نشد</div>
<div class="no-results-hint">مطمئن شوید که عبارت را به درستی تایپ کرده‌اید</div>
<div class="no-results-tips">
    <span>نکات جستجو:</span>
    <ul>
        <li>از کلمات کلیدی اصلی استفاده کنید</li>
        <li>املا را بررسی کنید</li>
        <li>ممکن است API مورد نظر در دسته‌بندی دیگری باشد</li>
    </ul>
</div>
`;

const searchStyle = document.createElement('style');
searchStyle.textContent = `
.sidebar-search {
    width: calc(100% - 40px);
    padding: 12px 16px;
    margin: 20px 20px 25px 20px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(120, 200, 255, 0.35);
    border-radius: 14px;
    color: var(--text);
    font-family: 'Vazirmatn', sans-serif;
    font-size: 15px;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
    display: block;
}

.sidebar-search:focus {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(58, 168, 255, 0.25),
                inset 0 0 15px rgba(58, 168, 255, 0.1);
}

.sidebar-search::placeholder {
    color: var(--muted);
    opacity: 0.8;
}

.nav-item.hidden {
    display: none;
}

.nav-section.hidden {
    display: none;
}

.nav-section:has(.nav-item:not(.hidden)) {
    display: block;
}

.no-results-message {
    display: none;
    text-align: center;
    padding: 40px 20px;
    color: var(--muted);
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    margin: 0 20px 20px 20px;
    border: 1px dashed rgba(120, 200, 255, 0.2);
}

.no-results-message.active {
    display: block;
}

.no-results-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.no-results-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text);
}

.no-results-hint {
    font-size: 14px;
    margin-bottom: 24px;
    opacity: 0.8;
}

.no-results-tips {
    text-align: right;
    font-size: 13px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.no-results-tips span {
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
    color: var(--primary);
}

.no-results-tips ul {
    padding-right: 20px;
    margin: 0;
}

.no-results-tips li {
    margin-bottom: 6px;
    opacity: 0.8;
}

.search-results-count {
    font-size: 13px;
    color: var(--primary);
    background: rgba(58, 168, 255, 0.1);
    padding: 4px 10px;
    border-radius: 10px;
    margin-right: 20px;
    display: inline-block;
    margin-top: 5px;
}

@media (max-width: 1024px) {
    .sidebar-search {
        margin: 15px 15px 20px 15px;
        width: calc(100% - 30px);
        padding: 14px 16px;
    }
    
    .no-results-message {
        margin: 0 15px 15px 15px;
        padding: 30px 15px;
    }
}
`;

document.head.appendChild(searchStyle);

const sidebarHeader = document.querySelector('.sidebar-header');
sidebarHeader.insertAdjacentElement('afterend', searchInput);

sidebarNav.appendChild(noResultsMessage);

function advancedSearch(searchTerm, text) {
    if (!searchTerm || searchTerm.length < 2) return false;

    const searchLower = searchTerm.toLowerCase();
    const textLower = text.toLowerCase();

    if (textLower.includes(searchLower)) {
        return { match: true, score: 10 };
    }

    const searchWords = searchLower.split(' ').filter(word => word.length > 0);
    let wordMatchCount = 0;

    for (const word of searchWords) {
        if (textLower.includes(word)) {
            wordMatchCount++;
        }
    }

    if (wordMatchCount > 0) {
        return { match: true, score: 5 + wordMatchCount };
    }

    if (searchLower.length >= 3) {
        const fuzzyPattern = searchLower.split('').join('.*?');
        const fuzzyRegex = new RegExp(fuzzyPattern, 'i');

        if (fuzzyRegex.test(text)) {
            return { match: true, score: 3 };
        }

        const firstLetters = textLower.split(' ')
            .filter(word => word.length > 0)
            .map(word => word[0])
            .join('');

        if (firstLetters.includes(searchLower)) {
            return { match: true, score: 4 };
        }
    }

    return { match: false, score: 0 };
}

searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    const navItems = document.querySelectorAll('.nav-item');
    const navSections = document.querySelectorAll('.nav-section');

    noResultsMessage.classList.remove('active');

    if (searchTerm.length < 2) {
        navItems.forEach(item => {
            item.classList.remove('hidden');
            item.style.order = '';
        });

        navSections.forEach(section => {
            section.classList.remove('hidden');
        });

        return;
    }

    let foundInSection = new Set();
    let totalResults = 0;

    navItems.forEach(item => {
        const text = item.textContent;
        const href = item.getAttribute('href') || '';
        const apiName = item.getAttribute('data-api') || '';
        const apiDesc = item.getAttribute('data-description') || '';

        const searchInText = advancedSearch(searchTerm, text);
        const searchInHref = advancedSearch(searchTerm, href);
        const searchInApiName = advancedSearch(searchTerm, apiName);
        const searchInDesc = advancedSearch(searchTerm, apiDesc);

        const match = searchInText.match || searchInHref.match ||
            searchInApiName.match || searchInDesc.match;

        if (match) {
            item.classList.remove('hidden');
            totalResults++;

            const totalScore =
                (searchInText.score || 0) +
                (searchInHref.score || 0) +
                (searchInApiName.score || 0) +
                (searchInDesc.score || 0);

            item.style.order = -totalScore;

            const parentSection = item.closest('.nav-section');
            if (parentSection) {
                foundInSection.add(parentSection);
            }
        } else {
            item.classList.add('hidden');
            item.style.order = '';
        }
    });

    navSections.forEach(section => {
        if (foundInSection.has(section) || Array.from(section.querySelectorAll('.nav-item:not(.hidden)')).length > 0) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    if (totalResults === 0) {
        noResultsMessage.classList.add('active');

        if (searchTerm.length >= 2) {
            const suggestions = [];
            const allItems = document.querySelectorAll('.nav-item');

            allItems.forEach(item => {
                const text = item.textContent.trim();
                if (text.length > 0) {
                    suggestions.push(text.substring(0, 3));
                }
            });

            if (suggestions.length > 0) {
                const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);
                const tipsElement = noResultsMessage.querySelector('.no-results-tips');
                if (tipsElement) {
                    const tipsHTML = `
                    <span>پیشنهادات جستجو:</span>
                    <ul>
                        ${uniqueSuggestions.map(s => `<li>${s}...</li>`).join('')}
                        <li>از جستجوی دقیق‌تر استفاده کنید</li>
                    </ul>
                `;
                    tipsElement.innerHTML = tipsHTML;
                }
            }
        }
    } else {
        let resultsCounter = document.querySelector('.search-results-count');
        if (!resultsCounter) {
            resultsCounter = document.createElement('div');
            resultsCounter.className = 'search-results-count';
            searchInput.parentNode.insertBefore(resultsCounter, searchInput.nextSibling);
        }
        resultsCounter.textContent = `${totalResults} نتیجه یافت شد`;

        setTimeout(() => {
            if (resultsCounter) {
                resultsCounter.remove();
            }
        }, 3000);
    }
});

searchInput.addEventListener('focus', function () {
    this.style.transform = 'translateY(-1px)';
    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
});

searchInput.addEventListener('blur', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
});

searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        this.value = '';
        this.dispatchEvent(new Event('input'));
        this.blur();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        if (!item.hasAttribute('data-description')) {
            const title = item.getAttribute('title') || '';
            const text = item.textContent || '';
            item.setAttribute('data-description', title || text);
        }

        if (!item.hasAttribute('data-api')) {
            const text = item.textContent || '';
            item.setAttribute('data-api', text.trim());
        }
    });
});