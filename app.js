// ====== CHANGE THIS to the day you first saw her (YYYY-MM-DDTHH:MM) ======
const START_DATE = new Date("2026-09-01T09:00:00");
// ==========================================================================

// Mobile menu
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open);
        navToggle.textContent = open ? "✕" : "☰";
    });
}

// Floating hearts
const heartsBox = document.getElementById("hearts");
const emojis = ["💖", "💕", "💗", "❤️", "💞"];
function spawnHeart() {
    if (!heartsBox) return;
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 14 + Math.random() * 22 + "px";
    h.style.animationDuration = 6 + Math.random() * 6 + "s";
    heartsBox.appendChild(h);
    setTimeout(() => h.remove(), 12000);
}
setInterval(spawnHeart, 700);

// Scroll reveal
const revealEls = document.querySelectorAll(".tile, .info, .stat, .tl-item, .card, .chip, .note-box, .letter");
if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => { el.classList.add("reveal"); io.observe(el); });
}

// Tap-to-flip cards (for phones)
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
});

// Random sweet note (home page)
const noteBtn = document.getElementById("note-btn");
if (noteBtn) {
    const notes = [
        "Bugun sizni ko'rsam, kunim yaxshi o'tadi.",
        "Tabassumingiz — mening eng sevimli manzaram.",
        "Siz haqingizda o'ylash menga quvonch beradi.",
        "Yaxshi kun tilayman, eng yoqimli inson!",
        "Siz bor ekansiz, maktab ham qiziqarli.",
        "Bugun ham sizni ko'rishni orzu qildim.",
        "Sizga omad va quvonch tilayman. 🌸",
        "Kulishni unutmang, siz kulganda juda chiroyli ko'rinasiz."
    ];
    const noteText = document.getElementById("note-text");
    let last = -1;
    noteBtn.addEventListener("click", () => {
        let i;
        do { i = Math.floor(Math.random() * notes.length); } while (i === last);
        last = i;
        noteText.textContent = notes[i];
        for (let k = 0; k < 8; k++) setTimeout(spawnHeart, k * 60);
    });
}

// Love counter (love-times page)
if (document.getElementById("counter")) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const update = () => {
        const secs = Math.floor(Math.max(0, Date.now() - START_DATE.getTime()) / 1000);
        const mins = Math.floor(secs / 60);
        const hours = Math.floor(secs / 3600);
        const days = Math.floor(secs / 86400);
        set("c-days", days);
        set("c-hours", hours % 24);
        set("c-mins", mins % 60);
        set("c-secs", secs % 60);
        set("s-weeks", Math.floor(days / 7));
        set("s-hours", hours.toLocaleString());
        set("s-beats", (mins * 72).toLocaleString());
        set("s-sun", days);
    };
    update();
    setInterval(update, 1000);
}

// The question (question page)
const yes = document.getElementById("yes");
const no = document.getElementById("no");
if (yes && no) {
    const ctaText = document.getElementById("cta-text");
    const ctaButtons = document.getElementById("cta-buttons");

    const dodge = () => {
        no.classList.add("dodge");
        const pad = 20;
        no.style.left = pad + Math.random() * (window.innerWidth - no.offsetWidth - pad * 2) + "px";
        no.style.top = pad + Math.random() * (window.innerHeight - no.offsetHeight - pad * 2) + "px";
    };
    no.addEventListener("mouseenter", dodge);
    no.addEventListener("touchstart", e => { e.preventDefault(); dodge(); });
    no.addEventListener("click", dodge);

    yes.addEventListener("click", () => {
        ctaText.textContent = "Rahmat! Siz meni dunyodagi eng baxtli odamga aylantirdingiz 💕";
        ctaButtons.style.display = "none";
        for (let i = 0; i < 60; i++) setTimeout(spawnHeart, i * 40);
    });
}