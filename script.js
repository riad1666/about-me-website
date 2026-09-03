document.addEventListener('DOMContentLoaded', () => {
    // --- Translations Dictionary ---
    const translations = {
        en: {
            appTitle: "Digital ID Card",
            ifFound: "IF FOUND PLEASE CONTACT ME",
            name: "MOLLIK MD RIAD",
            student: "Student",
            call: "Call",
            whatsapp: "WhatsApp",
            kakaotalk: "KakaoTalk",
            universityInfo: "University Info",
            universityLabel: "University:",
            universityName: "Kangwon National University",
            deptLabel: "Dept:",
            deptName: "Global Convergence",
            majorLabel: "Major:",
            majorName: "General Engineering",
            idLabel: "ID:",
            homeAddress: "Home Address",
            addressText: "29 Chodangwon-gil,<br>Gangneung-si, Gangwon-do",
            myContacts: "My Contacts & Emergency",
            downloadVcard: "Download vCard (Save to Phone)",
            emergencyContacts: "EMERGENCY CONTACTS",
            roommate: "Room mate",
            shareMyId: "Share My ID",
            qrHint: "Scan this QR code to view this page on your device.",
            shareLink: "Share Link",
            shareAsLink: "Share as Link",
            shareAsQr: "Share as QR",
            qrOptionsTitle: "QR Code Options",
            downloadQrPng: "Download as PNG",
            downloadQrDesc: "Save high-res image",
            shareQr: "Share QR",
            shareQrDesc: "Share image directly",
            linkCopiedToast: "Link copied to clipboard!",
            qrDownloadedToast: "QR Code downloaded!",
            detailedBio: "Detailed Bio",
            studentIdLabel: "ID: #202617310",
            aboutMe: "ABOUT ME",
            aboutText: "Hello! I am Mollik Md Riad, an engineering student studying in South Korea. I am passionate about technology and software development. Feel free to reach out to me via my contact links.",
            skills: "SKILLS",
            engineering: "Engineering",
            coding: "Coding",
            digitalMarketing: "Digital Marketing",
            cyberSecurity: "Cyber Security",
            hobbies: "HOBBIES",
            photography: "Photography",
            travel: "Travel",
            gaming: "Gaming",
            navHome: "Home",
            navContacts: "Contacts",
            navScan: "Scan",
            navProfile: "Profile"
        },
        ko: {
            appTitle: "디지털 ID 카드",
            ifFound: "습득 시 아래로 연락주세요",
            name: "몰릭 엠디 리아드",
            student: "학생",
            call: "전화",
            whatsapp: "왓츠앱",
            kakaotalk: "카카오톡",
            universityInfo: "대학 정보",
            universityLabel: "대학교:",
            universityName: "강원대학교",
            deptLabel: "학부:",
            deptName: "글로벌융합학부",
            majorLabel: "전공:",
            majorName: "일반공학",
            idLabel: "학번:",
            homeAddress: "집 주소",
            addressText: "강원도 강릉시<br>초당원길 29",
            myContacts: "내 연락처 및 비상연락망",
            downloadVcard: "vCard 다운로드 (연락처 저장)",
            emergencyContacts: "비상 연락망",
            roommate: "룸메이트",
            shareMyId: "내 ID 공유하기",
            qrHint: "이 QR 코드를 스캔하여 기기에서 이 페이지를 확인하세요.",
            shareLink: "링크 공유",
            shareAsLink: "링크로 공유",
            shareAsQr: "QR 코드로 공유",
            qrOptionsTitle: "QR 코드 옵션",
            downloadQrPng: "PNG로 다운로드",
            downloadQrDesc: "고화질 이미지 저장",
            shareQr: "QR 공유하기",
            shareQrDesc: "QR 이미지 직접 공유",
            linkCopiedToast: "링크가 클립보드에 복사되었습니다!",
            qrDownloadedToast: "QR 코드가 다운로드되었습니다!",
            detailedBio: "상세 이력",
            studentIdLabel: "학번: #202617310",
            aboutMe: "내 소개",
            aboutText: "안녕하세요! 저는 한국에서 공부하고 있는 공학도 몰릭 엠디 리아드입니다. 기술과 소프트웨어 개발에 열정을 가지고 있습니다. 제 연락처 링크를 통해 편하게 연락주세요.",
            skills: "기술",
            engineering: "엔지니어링",
            coding: "코딩",
            digitalMarketing: "디지털 마케팅",
            cyberSecurity: "사이버 보안",
            hobbies: "취미",
            photography: "사진",
            travel: "여행",
            gaming: "게임",
            navHome: "홈",
            navContacts: "연락처",
            navScan: "스캔",
            navProfile: "프로필"
        }
    };

    // --- Tab Switching Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if(currentTheme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('langToggleBtn');
    let currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }

    // Apply language on load
    applyLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ko' : 'en';
        localStorage.setItem('lang', currentLang);
        applyLanguage(currentLang);
    });

    // --- Generate QR Code ---
    // The QR code will encode the current URL of the website dynamically.
    // So if deployed to vercel (e.g. app.vercel.app) it will use that link.
    // It strips out query parameters/hashes to keep the link clean if needed, 
    // but window.location.href naturally covers any current deployed address.
    const baseUrl = window.location.origin + window.location.pathname; 
    const qrcodeContainer = document.getElementById('qrcode');
    
    new QRCode(qrcodeContainer, {
        text: baseUrl,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    // --- Toast Notification Helper ---
    function showToast(message) {
        let toast = document.getElementById('appToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'appToast';
            toast.className = 'app-toast';
            const appContainer = document.querySelector('.app-container') || document.body;
            appContainer.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // --- Helper: Extract QR Image Data URL ---
    function getQrDataUrl() {
        const container = document.getElementById('qrcode');
        if (!container) return null;
        const canvas = container.querySelector('canvas');
        if (canvas) {
            try {
                return canvas.toDataURL('image/png');
            } catch (e) {
                console.error('Canvas export error:', e);
            }
        }
        const img = container.querySelector('img');
        if (img && img.src) {
            return img.src;
        }
        return null;
    }

    // --- Helper: Generate Crisp QR Image Blob with Margins ---
    function generateHighResQrBlob() {
        return new Promise((resolve) => {
            const dataUrl = getQrDataUrl();
            if (!dataUrl) {
                resolve(null);
                return;
            }
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const padding = 28;
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width || 200;
                canvas.height = img.naturalHeight || img.height || 200;
                
                // Outer canvas with margin for scan reliability
                const paddedCanvas = document.createElement('canvas');
                paddedCanvas.width = canvas.width + padding * 2;
                paddedCanvas.height = canvas.height + padding * 2;
                const ctx = paddedCanvas.getContext('2d');
                
                // Clean white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
                ctx.drawImage(img, padding, padding, canvas.width, canvas.height);
                
                paddedCanvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            };
            img.onerror = () => resolve(null);
            img.src = dataUrl;
        });
    }

    // --- Action: Download QR Code as PNG ---
    async function downloadQrAsPng() {
        const blob = await generateHighResQrBlob();
        const filename = 'Mollik_Md_Riad_QR.png';
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } else {
            const dataUrl = getQrDataUrl();
            if (!dataUrl) return;
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = dataUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        showToast(translations[currentLang].qrDownloadedToast || 'QR Code downloaded!');
    }

    // --- Action: Share QR Image Directly ---
    async function shareQrDirectly() {
        const blob = await generateHighResQrBlob();
        if (blob && navigator.canShare) {
            const file = new File([blob], 'Mollik_Md_Riad_QR.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'MOLLIK MD RIAD - QR Code',
                        text: 'Scan this QR code to view Mollik Md Riad\'s Digital ID Card',
                        files: [file]
                    });
                    return;
                } catch (err) {
                    if (err.name === 'AbortError') return;
                    console.warn('Native file share cancelled or failed, falling back:', err);
                }
            }
        }

        // If direct file sharing is unavailable on browser/device, try link sharing
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'MOLLIK MD RIAD - Digital ID',
                    text: 'Mollik Md Riad - Digital ID Card',
                    url: baseUrl
                });
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
            }
        }

        // Fallback: download the image and alert user
        await downloadQrAsPng();
    }

    // --- Scan Tab Event Listeners ---
    const shareLinkBtn = document.getElementById('shareLinkBtn');
    const shareQrToggleBtn = document.getElementById('shareQrToggleBtn');
    const qrOptionsPanel = document.getElementById('qrOptionsPanel');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    const shareQrDirectBtn = document.getElementById('shareQrDirectBtn');

    // 1. Share as Link
    if (shareLinkBtn) {
        shareLinkBtn.addEventListener('click', async () => {
            if (qrOptionsPanel) {
                qrOptionsPanel.classList.remove('show');
                shareQrToggleBtn?.classList.remove('active');
            }

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'MOLLIK MD RIAD - Digital ID',
                        url: baseUrl
                    });
                    return;
                } catch (err) {
                    if (err.name === 'AbortError') return;
                }
            }

            // Clipboard fallback
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(baseUrl).then(() => {
                    showToast(translations[currentLang].linkCopiedToast || 'Link copied to clipboard!');
                }).catch(() => {
                    prompt('Copy link:', baseUrl);
                });
            } else {
                prompt('Copy link:', baseUrl);
            }
        });
    }

    // 2. Share as QR (Toggles QR Options)
    if (shareQrToggleBtn && qrOptionsPanel) {
        shareQrToggleBtn.addEventListener('click', () => {
            const isShowing = qrOptionsPanel.classList.toggle('show');
            shareQrToggleBtn.classList.toggle('active', isShowing);
            if (isShowing) {
                qrOptionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // 3. Download QR Code PNG
    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', () => {
            downloadQrAsPng();
        });
    }

    // 4. Share QR Image
    if (shareQrDirectBtn) {
        shareQrDirectBtn.addEventListener('click', () => {
            shareQrDirectly();
        });
    }

    // --- Download vCard ---
    const downloadVCardBtn = document.getElementById('downloadVCard');
    downloadVCardBtn.addEventListener('click', () => {
        const vcardData = `BEGIN:VCARD
VERSION:3.0
N:RIAD;MOLLIK MD;;;
FN:MOLLIK MD RIAD
TITLE:Student
TEL;TYPE=CELL:+821044499221
TEL;TYPE=WORK;TYPE=VOICE:+821044499221
ADR;TYPE=HOME:;;29 Chodangwon-gil;Gangneung-si;Gangwon-do;;Korea
URL:${baseUrl}
END:VCARD`;

        const blob = new Blob([vcardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Mollik_Md_Riad_Contact.vcf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });

});
