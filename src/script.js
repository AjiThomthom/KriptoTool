// LOADER + INIT
(function initLoader() {
    let progress = 0;
    const progressFill = document.getElementById('progress-fill');
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        if (progressFill) progressFill.style.width = progress + '%';
    }, 200);

    window.addEventListener('load', () => {
        clearInterval(interval);
        if (progressFill) progressFill.style.width = '100%';
        
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 700);
            }
            if (window.lucide) lucide.createIcons();

            if (window.innerWidth >= 768) openSidebar();
            else closeSidebar();
        }, 400);
    });
})();

// SIDEBAR
let isSidebarOpen = false;

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const floatingBtn = document.getElementById('floating-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const header = document.getElementById('main-header');

    sidebar.classList.remove('-translate-x-full');
    mainContent.classList.add('md:ml-64');
    header.classList.add('sidebar-open');
    floatingBtn.classList.add('hidden', 'opacity-0');
    
    if (window.innerWidth < 768) overlay.classList.remove('hidden');
    isSidebarOpen = true;
    setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 50);
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const floatingBtn = document.getElementById('floating-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const header = document.getElementById('main-header');

    sidebar.classList.add('-translate-x-full');
    mainContent.classList.remove('md:ml-64');
    header.classList.remove('sidebar-open');
    floatingBtn.classList.remove('hidden');
    overlay.classList.add('hidden');
    isSidebarOpen = false;
    setTimeout(() => { 
        floatingBtn.classList.remove('opacity-0');
        if (window.lucide) lucide.createIcons(); 
    }, 50);
}

function toggleSidebar() {
    if (isSidebarOpen) closeSidebar();
    else openSidebar();
}

window.addEventListener('resize', () => {
    const overlay = document.getElementById('sidebar-overlay');
    if (window.innerWidth >= 768) {
        overlay.classList.add('hidden');
        if (isSidebarOpen) document.getElementById('main-content').classList.add('md:ml-64');
    } else {
        if (isSidebarOpen) {
            overlay.classList.remove('hidden');
            document.getElementById('main-content').classList.remove('md:ml-64');
        }
    }
});

// TAB SWITCHING
const TAB_LABELS = {
    home: 'Dashboard',
    caesar: 'Caesar Cipher',
    vigenere: 'Vigenère Cipher',
    about: 'About'
};

function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('animate-fade-in-up');
    });

    const activeSection = document.getElementById(`section-${tabId}`);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        void activeSection.offsetWidth;
        activeSection.classList.add('animate-fade-in-up');
    }

    const breadcrumb = document.getElementById('breadcrumb-current');
    if (breadcrumb) breadcrumb.textContent = TAB_LABELS[tabId] || 'Dashboard';

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-violet-100', 'dark:bg-violet-500/10', 'text-violet-700', 'dark:text-violet-300');
        btn.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
    });

    const activeBtn = document.getElementById(`tab-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-violet-100', 'dark:bg-violet-500/10', 'text-violet-700', 'dark:text-violet-300');
        activeBtn.classList.remove('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
    }

    if (window.innerWidth < 768 && isSidebarOpen) closeSidebar();
}

// THEME
function toggleTheme() {
    const html = document.documentElement;
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
    }
    if (window.lucide) lucide.createIcons();
}

(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        iconSun?.classList.remove('hidden');
        iconMoon?.classList.add('hidden');
    } else {
        document.documentElement.classList.add('dark');
        iconSun?.classList.add('hidden');
        iconMoon?.classList.remove('hidden');
    }
})();

// HELPERS
function updateCounter(inputId, counterId) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (input && counter) {
        counter.textContent = input.value.length + ' karakter';
    }
}

function copyOutput(outputId, btn) {
    const output = document.getElementById(outputId);
    if (!output || !output.value) return;
    
    navigator.clipboard.writeText(output.value).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> Copied!';
        btn.classList.add('text-emerald-600', 'dark:text-emerald-400');
        if (window.lucide) lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('text-emerald-600', 'dark:text-emerald-400');
            if (window.lucide) lucide.createIcons();
        }, 1500);
    });
}

// SPECIAL THANKS
function toggleSpecialThanks(btn) {
    const panel = document.getElementById('special-thanks');
    if (!panel) return;

    const isHidden = panel.classList.contains('hidden');

    if (isHidden) {
        panel.classList.remove('hidden');
        void panel.offsetWidth;
        panel.classList.add('animate-fade-in-up');
        btn.innerHTML = '<i data-lucide="chevron-up" class="w-4 h-4"></i><span>Sembunyikan Ucapan</span>';
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    } else {
        panel.classList.add('hidden');
        panel.classList.remove('animate-fade-in-up');
        btn.innerHTML = '<i data-lucide="chevron-down" class="w-4 h-4"></i><span>Tampilkan Ucapan Terima Kasih</span>';
    }
    if (window.lucide) lucide.createIcons();
}

// SHORTCUTS
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
});

// APPLY DEFAULT NAV STYLES
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-btn:not(.active)').forEach(btn => {
        btn.classList.add('text-slate-600', 'dark:text-slate-400', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
    });
    if (window.lucide) lucide.createIcons();
});