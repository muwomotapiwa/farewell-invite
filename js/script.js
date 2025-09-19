const INVITE = {
    date: '2025-10-25',
    time: '18:00',
    endTime: '21:00',
    gallery: [
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/lou/kg3/pvc/fullbody2.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/by1/q64/40m/fullbody3.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/xly/yy1/3o7/fullbody1.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/24b/24f/o9l/faceshot3.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/7wa/hiu/y3k/faceshot4.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/739/atw/740/faceshot2.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/5js/999/f1s/faceshot1.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/p94/k13/f1n/fullbody4.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/dqu/esk/ut2/halfbody2.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/h3s/cki/vo6/halfbody1.jpg",
        "https://af6815798a.imgdist.com/pub/bfra/knkjywkm/fzq/zib/ol0/halfbody3.jpg"
    ],
    venue: "43 Lily Ave, Berea, Johannesburg, 2198",
    name: "Elder M Sibanda"
};

// --- Countdown Logic ---
function initCountdown() {
    const eventDate = new Date(`${INVITE.date}T${INVITE.time}:00+02:00`);
    const endDate = new Date(`${INVITE.date}T${INVITE.endTime}:00+02:00`);
    const dateHumanEl = document.getElementById('dateHuman');
    
    if (dateHumanEl) {
        dateHumanEl.textContent = eventDate.toDateString() + " • 6:00 PM – 9:00 PM";
    }

    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');

    function tick() {
        const now = new Date();
        const diff = Math.max(0, eventDate - now);
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        
        if (dEl) dEl.textContent = d;
        if (hEl) hEl.textContent = h;
        if (mEl) mEl.textContent = m;
        if (sEl) sEl.textContent = s;
    }

    tick();
    setInterval(tick, 1000);
}

// --- Gallery Logic ---
function initGallery() {
    const slidesContainer = document.getElementById('slides');
    const dotsContainer = document.getElementById('dots');
    
    if (!slidesContainer || !dotsContainer) return;

    let currentSlide = 0;
    const slides = [];
    const dots = [];

    INVITE.gallery.forEach((src, i) => {
        // Create slide
        const s = document.createElement('div');
        s.className = `slide ${i === 0 ? 'active' : ''}`;
        s.setAttribute('role', 'group');
        s.setAttribute('aria-label', `Slide ${i + 1} of ${INVITE.gallery.length}`);
        
        const bg = document.createElement('div');
        bg.className = 'bg';
        bg.style.backgroundImage = `url('${src}')`;
        s.appendChild(bg);
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo of ${INVITE.name} from the Berea Mega Church`;
        img.loading = 'lazy'; // Defer loading of non-active images
        s.appendChild(img);
        
        slidesContainer.appendChild(s);
        slides.push(s);

        // Create dot
        const d = document.createElement('div');
        d.className = `dot ${i === 0 ? 'active' : ''}`;
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-controls', `slide-${i}`);
        d.setAttribute('aria-label', `Go to slide ${i + 1}`);
        d.addEventListener('click', () => show(i));
        
        dotsContainer.appendChild(d);
        dots.push(d);
    });

    function show(n) {
        currentSlide = (n + slides.length) % slides.length;
        slides.forEach((el, i) => el.classList.toggle('active', i === currentSlide));
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    function next() {
        show(currentSlide + 1);
    }
    
    setInterval(next, 5000);
}

// --- Event Handlers ---
function setupEventHandlers() {
    // RSVP Button
    const rsvpBtn = document.getElementById('btnRsvp');
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', () => {
            const msg = encodeURIComponent(`Hello, I would like to RSVP for the Elder's Farewell Service at Berea Mega Church on ${INVITE.date}, ${INVITE.time}.`);
            window.open(`https://wa.me/27605023284?text=${msg}`, '_blank');
        });
    }

    // Add to Calendar Button
    const addCalBtn = document.getElementById('btnAddCal');
    if (addCalBtn) {
        addCalBtn.addEventListener('click', () => {
            const start = new Date(`${INVITE.date}T${INVITE.time}:00+02:00`);
            const end = new Date(`${INVITE.date}T${INVITE.endTime}:00+02:00`);
            const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nDTEND:${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nSUMMARY:Elder Farewell Service\nLOCATION:${INVITE.venue}\nDESCRIPTION:Farewell Service Program\nEND:VEVENT\nEND:VCALENDAR`;
            const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'farewell-invite.ics';
            a.click();
        });
    }
}

// Initialize all components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initGallery();
    setupEventHandlers();
});