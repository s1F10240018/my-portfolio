let isKeyboardMode = true; // ← 十字キー優先

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.game-container');
    const items = document.querySelectorAll('.menu-item');
    const backBtn = document.getElementById('fixed-back-btn');
    let activeIdx = 0;

    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (target) {
            container.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    function updateMenu(newIdx) {
        items[activeIdx].classList.remove('active');
        items[activeIdx].querySelector('.cursor').innerText = '';
        activeIdx = newIdx;
        items[activeIdx].classList.add('active');
        items[activeIdx].querySelector('.cursor').innerText = '▶';
    }

    window.addEventListener('keydown', (e) => {
        isKeyboardMode = true; 
        const isAtTitle = container.scrollTop < window.innerHeight / 2;

        if (isAtTitle) {
            // --- タイトル画面での操作 ---
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updateMenu((activeIdx + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                updateMenu((activeIdx - 1 + items.length) % items.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                scrollToSection(items[activeIdx].getAttribute('data-target'));
            }
        } else {
            // --- 詳細画面での十字キースクロール補助 ---
            // ブラウザの標準スクロールが効かない場合のために、jsで動かします
            if (e.key === 'ArrowDown') {
                container.scrollBy({ top: 50, behavior: 'auto' });
            } else if (e.key === 'ArrowUp') {
                container.scrollBy({ top: -50, behavior: 'auto' });
            }
        }

        // BキーまたはBackspaceでトップに戻る
        if (e.key === 'b' || e.key === 'B' || e.key === 'Backspace') {
            scrollToSection('title');
        }
    });

    items.forEach((item, index) => {

    // マウスホバー（キーボード操作中は無視）
    item.addEventListener('mouseenter', () => {
        if (!isKeyboardMode) {
            updateMenu(index);
        }
    });

    // マウスを動かしたらマウスモードに切り替え
    item.addEventListener('mousemove', () => {
        isKeyboardMode = false;
    });

    // クリックで決定
    item.addEventListener('click', () => {
        updateMenu(index);
        scrollToSection(item.getAttribute('data-target'));
    });

});


    if (backBtn) {
        backBtn.addEventListener('click', () => {
            scrollToSection('title');
        });
    }

    container.addEventListener('scroll', () => {
        // スクロールスナップの動的制御
        // タイトルにいる時だけピタッと止まるようにし、それ以外は自由に動かせるようにします
        if (container.scrollTop > window.innerHeight / 2) {
            container.style.scrollSnapType = "none";
            backBtn.style.display = 'block';
        } else {
            container.style.scrollSnapType = "y mandatory";
            backBtn.style.display = 'none';
        }
    });
});

document.querySelectorAll('.ripple-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.addEventListener('animationend', () => ripple.remove());

        const form = this.closest('form');
        if (form) form.reset();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.game-container');
    const items = document.querySelectorAll('.menu-item');
    const backBtn = document.getElementById('fixed-back-btn');
    
    // ラストページ用の要素を取得
    const lastPage = document.querySelector('.last-screen');
    const lastContent = document.querySelector('.last-page-content');
    const dividers = document.querySelectorAll('.last-page-divider');
    
    let activeIdx = 0;

    // --- セクション移動関数 ---
    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (target) {
            container.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // --- メニュー更新関数 ---
    function updateMenu(newIdx) {
        items[activeIdx].classList.remove('active');
        items[activeIdx].querySelector('.cursor').innerText = '';
        activeIdx = newIdx;
        items[activeIdx].classList.add('active');
        items[activeIdx].querySelector('.cursor').innerText = '▶';
    }

    // --- キーボード操作 ---
    window.addEventListener('keydown', (e) => {
        const isAtTitle = container.scrollTop < window.innerHeight / 2;

        if (isAtTitle) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updateMenu((activeIdx + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                updateMenu((activeIdx - 1 + items.length) % items.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                scrollToSection(items[activeIdx].getAttribute('data-target'));
            }
        } else {
            if (e.key === 'ArrowDown') {
                container.scrollBy({ top: 50, behavior: 'auto' });
            } else if (e.key === 'ArrowUp') {
                container.scrollBy({ top: -50, behavior: 'auto' });
            }
        }

        if (e.key === 'b' || e.key === 'B' || e.key === 'Backspace') {
            scrollToSection('title');
        }
    });

    // --- クリック・スクロールイベントの統合 ---
items.forEach((item, index) => {

    // マウスホバー（キーボード操作中は無視）
    item.addEventListener('mouseenter', () => {
        if (!isKeyboardMode) {
            updateMenu(index);
        }
    });

    // マウスを実際に動かした時だけマウス優先にする
    item.addEventListener('mousemove', () => {
        isKeyboardMode = false;
    });

    // クリックで決定（ここは常に有効）
    item.addEventListener('click', () => {
        updateMenu(index);
        scrollToSection(item.getAttribute('data-target'));
    });

});



    if (backBtn) {
        backBtn.addEventListener('click', () => {
            scrollToSection('title');
        });
    }

    // ★ 全てのスクロール連動処理をここにまとめる ★
    container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const scrollBottom = scrollHeight - clientHeight;
        const remaining = scrollBottom - scrollTop;

        // 1. スクロールスナップと「戻るボタン」の制御
        if (scrollTop > window.innerHeight / 2) {
            container.style.scrollSnapType = "none";
            backBtn.style.display = 'block';
        } else {
            container.style.scrollSnapType = "y mandatory";
            backBtn.style.display = 'none';
        }

        // 2. ラストページの連動アニメーション
        const threshold = 800; 
        if (lastPage && lastContent) {
            if (remaining < threshold) {
                const progress = 1 - (remaining / threshold);
                
                // 透明度
                lastPage.style.opacity = progress;
                // 位置の浮き上がり
                const ty = 50 * (1 - progress);
                lastContent.style.transform = `translateY(${ty}px)`;
                // 線の伸び
                const lineProgress = Math.min(progress * 1.5, 1); 
                dividers.forEach(line => {
                    line.style.transform = `scaleX(${lineProgress})`;
                });
            } else {
                lastPage.style.opacity = 0;
                dividers.forEach(line => line.style.transform = `scaleX(0)`);
            }
        }
    });
});

// --- 波紋演出 (ボタンクリック) ---
document.querySelectorAll('.ripple-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.addEventListener('animationend', () => ripple.remove());

        const form = this.closest('form');
        if (form) form.reset();
    });
});

document.querySelectorAll('.work-toggle').forEach(toggle => {

    toggle.addEventListener('click', () => {

        const item = toggle.closest('.work-item');

        item.classList.toggle('active');

        if(item.classList.contains('active')){
            toggle.textContent = '閉じる ▲';
        }else{
            toggle.textContent = '詳細を見る ▼';
        }

    });

});

const mailArea = document.querySelector('.copy-mail');

if(mailArea){

    mailArea.addEventListener('click', () => {

        const mail = mailArea.dataset.mail;

        navigator.clipboard.writeText(mail);

        const value =
            mailArea.querySelector('.save-value');

        value.textContent = 'Copied!';

        setTimeout(() => {
            value.textContent = mail;
        }, 1500);

    });

}

const slides = [
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド1.JPG',
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド2.JPG',
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド3.JPG',
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド4.JPG',
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド5.JPG',
    'img/1F10240018_RisaEnomoto_UX2_cookie/スライド6.JPG',
];

let currentSlide = 0;

const img = document.getElementById('work03-slide');

img.src = slides[currentSlide];

document.querySelector('.next').addEventListener('click', () => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    img.src = slides[currentSlide];
});

document.querySelector('.prev').addEventListener('click', () => {

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    img.src = slides[currentSlide];
});

const slides4 = [
    'img/work4/スライド1.png',
    'img/work4/スライド2.png',
    'img/work4/スライド3.png',
    'img/work4/スライド4.png',
    'img/work4/スライド5.png',
    'img/work4/スライド6.png',
    'img/work4/スライド7.png',
];

let currentSlide4 = 0;

const img4 = document.getElementById('work04-slide');

if (img4) {

    img4.src = slides4[currentSlide4];

    document.querySelector('.next4').addEventListener('click', () => {

        currentSlide4++;

        if (currentSlide4 >= slides4.length) {
            currentSlide4 = 0;
        }

        img4.src = slides4[currentSlide4];

    });

    document.querySelector('.prev4').addEventListener('click', () => {

        currentSlide4--;

        if (currentSlide4 < 0) {
            currentSlide4 = slides4.length - 1;
        }

        img4.src = slides4[currentSlide4];

    });

}

const slides5 = [
    'img/work5/スライド1.png',
    'img/work5/スライド2.png',
    'img/work5/スライド3.png',
    'img/work5/スライド4.png',
    'img/work5/スライド5.png',
    'img/work5/スライド6.png',
    'img/work5/スライド7.png',
    'img/work5/スライド8.png',
];

let currentSlide5 = 0;

const img5 = document.getElementById('work05-slide');

if (img5) {

    img5.src = slides5[currentSlide5];

    document.querySelector('.next5').addEventListener('click', () => {

        currentSlide5++;

        if (currentSlide5 >= slides5.length) {
            currentSlide5 = 0;
        }

        img5.src = slides5[currentSlide5];

    });

    document.querySelector('.prev5').addEventListener('click', () => {

        currentSlide5--;

        if (currentSlide5 < 0) {
            currentSlide5 = slides5.length - 1;
        }

        img5.src = slides5[currentSlide5];

    });

}