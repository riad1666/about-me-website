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
            detailedBio: "Detailed Bio",
            studentIdLabel: "ID: #202617310",
            aboutMe: "ABOUT ME",
            aboutText: "Hello! I am Mollik Md Riad, an engineering student studying in South Korea. I am passionate about technology and software development. Feel free to reach out to me via my contact links.",
            skills: "SKILLS",
            engineering: "Engineering",
            coding: "Coding",
            communication: "Communication",
            hobbies: "HOBBIES",
            photography: "Photography",
            travel: "Travel",
            reading: "Reading",
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
            detailedBio: "상세 이력",
            studentIdLabel: "학번: #202617310",
            aboutMe: "내 소개",
            aboutText: "안녕하세요! 저는 한국에서 공부하고 있는 공학도 몰릭 엠디 리아드입니다. 기술과 소프트웨어 개발에 열정을 가지고 있습니다. 제 연락처 링크를 통해 편하게 연락주세요.",
            skills: "기술",
            engineering: "엔지니어링",
            coding: "코딩",
            communication: "소통",
            hobbies: "취미",
            photography: "사진",
            travel: "여행",
            reading: "독서",
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

    // --- Share Link Button ---
    const shareLinkBtn = document.getElementById('shareLinkBtn');
    shareLinkBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'MOLLIK MD RIAD - Digital ID',
                url: baseUrl
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(baseUrl).then(() => {
                alert(currentLang === 'en' ? 'Link copied to clipboard!' : '링크가 클립보드에 복사되었습니다!');
            });
        }
    });

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
