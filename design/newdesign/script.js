// ===== MOBILE MENU =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => { mobileMenuToggle.classList.toggle('active'); navLinks.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { mobileMenuToggle.classList.remove('active'); navLinks.classList.remove('active'); }); });
    document.addEventListener('click', (e) => { if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) { mobileMenuToggle.classList.remove('active'); navLinks.classList.remove('active'); } });
}

// ===== CANVAS NODE GRAPH =====
const canvas = document.getElementById('nodeCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
const nodes = [];
class Node {
    constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.vx = (Math.random()-0.5)*0.8; this.vy = (Math.random()-0.5)*0.8; this.radius = Math.random()*3+1; this.color = ['#0066FF','#8B5CF6','#00D9FF','#10B981'][Math.floor(Math.random()*4)]; }
    update() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width) this.vx*=-1; if(this.y<0||this.y>canvas.height) this.vy*=-1; }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.fillStyle=this.color; ctx.globalAlpha=0.6; ctx.fill(); ctx.globalAlpha=1; }
}
for(let i=0;i<80;i++) nodes.push(new Node());
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) { const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy); if(d<200){ ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); const g=ctx.createLinearGradient(nodes[i].x,nodes[i].y,nodes[j].x,nodes[j].y); g.addColorStop(0,nodes[i].color); g.addColorStop(1,nodes[j].color); ctx.strokeStyle=g; ctx.globalAlpha=(1-d/200)*0.3; ctx.lineWidth=1.5; ctx.stroke(); ctx.globalAlpha=1; } }
    nodes.forEach(n=>{n.update();n.draw();}); requestAnimationFrame(animate);
}
animate();

// ===== SCROLL REVEAL =====
function revealOnScroll() {
    const wh = window.innerHeight;
    document.querySelectorAll('.reveal').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('active'); });
    document.querySelectorAll('.capability-card').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.clc-item').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.process-step').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.stat-item').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.tech-viz-card').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.case-study-card').forEach(el => { if(el.getBoundingClientRect().top < wh-100) el.classList.add('animate-in'); });
    document.querySelectorAll('.timeline-item').forEach((el,i) => { if(el.getBoundingClientRect().top < wh-100) setTimeout(()=>el.classList.add('animate-in'),i*200); });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => { const sp=document.querySelector('.scroll-progress'); const st=window.pageYOffset; const dh=document.documentElement.scrollHeight-document.documentElement.clientHeight; sp.style.width=(st/dh)*100+'%'; });

// ===== ANIMATED COUNTERS =====
let hasAnimated = false;
function animateCounters() {
    if(hasAnimated) return;
    const ss = document.querySelector('.stats-section');
    if(ss.getBoundingClientRect().top < window.innerHeight-100) {
        hasAnimated=true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target=parseFloat(counter.getAttribute('data-target')); const duration=2000; const step=target/(duration/16); let current=0;
            const update=()=>{ current+=step; if(current<target){counter.textContent=Math.floor(current);requestAnimationFrame(update);}else{counter.textContent=target%1===0?target:target.toFixed(1);} };
            update();
        });
    }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

// ===== PARALLAX =====
window.addEventListener('scroll', () => { const s=window.pageYOffset; const hb=document.querySelector('.hero-background'); if(hb) hb.style.transform=`translateY(${s*0.5}px)`; });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', function(e){ e.preventDefault(); const t=document.querySelector(this.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'}); }); });

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if(cursorGlow && window.innerWidth>=768) { document.addEventListener('mousemove', e=>{ cursorGlow.style.left=e.clientX+'px'; cursorGlow.style.top=e.clientY+'px'; }); } else if(cursorGlow) cursorGlow.style.display='none';

// ===== CAPABILITY MODAL DATA =====
const capData = [
    {
        bar: 'blue', number: '01', title: 'Fairness Automation',
        desc: 'Our Fairness Automation engine is the ethical backbone of every Cerelytic deployment. It operates as a continuous, real-time auditor layer that sits between raw data and final output — scanning, evaluating, and correcting bias before it ever reaches a decision point.',
        features: [
            { icon: 'blue', symbol: '⟳', title: 'Real-Time Bias Detection', text: 'Continuous scanning of incoming data streams to flag statistical anomalies and demographic disparities before they propagate through the system.' },
            { icon: 'cyan', symbol: '✓', title: 'Mathematical Equity Scoring', text: 'Every dataset receives an equity score based on multi-dimensional fairness metrics including equal opportunity, demographic parity, and calibration.' },
            { icon: 'purple', symbol: '⚡', title: 'Automated Correction Loops', text: 'When bias is detected, the system automatically applies calibrated corrections without human intervention, maintaining throughput and integrity.' },
            { icon: 'green', symbol: '📋', title: 'Compliance Audit Trail', text: 'Full transparency logging of every fairness check, correction applied, and decision rationale — ready for regulatory review at any time.' }
        ],
        stats: [{ val: '99.7%', label: 'Detection Accuracy' }, { val: '<2ms', label: 'Latency' }, { val: '24/7', label: 'Monitoring' }]
    },
    {
        bar: 'purple', number: '02', title: 'AI Automation',
        desc: 'Cerelytic\'s AI Automation platform replaces traditional workflow orchestration with fully autonomous agent networks. These aren\'t chatbots or rule-based scripts — they are intelligent agents that understand context, adapt to exceptions, and execute complex multi-step enterprise tasks end-to-end.',
        features: [
            { icon: 'purple', symbol: '🤖', title: 'Autonomous Agent Orchestration', text: 'Deploy networks of AI agents that collaborate, delegate sub-tasks, and self-correct — handling enterprise workflows with zero human intervention.' },
            { icon: 'blue', symbol: '🔄', title: 'Adaptive Workflow Execution', text: 'Agents learn from past executions and dynamically adjust their approach when encountering novel situations or edge cases in live operations.' },
            { icon: 'green', symbol: '📊', title: 'End-to-End Process Intelligence', text: 'Full visibility into every agent action, decision point, and outcome — giving enterprises complete operational transparency.' },
            { icon: 'orange', symbol: '🛡️', title: 'Guardrailed Autonomy', text: 'Every autonomous action is bounded by configurable safety rails ensuring agents operate within defined parameters and escalate when appropriate.' }
        ],
        stats: [{ val: '10M+', label: 'Records/Month' }, { val: '47%', label: 'Faster Processing' }, { val: '∞', label: 'Scalability' }]
    },
    {
        bar: 'orange', number: '03', title: 'Game Development',
        desc: 'Cerelytic\'s Game Development vertical harnesses the raw power of Unreal Engine and Unity to build high-fidelity simulation environments. These aren\'t games for entertainment — they are precision stress-testing arenas that push enterprise systems to their absolute limits under simulated real-world chaos.',
        features: [
            { icon: 'orange', symbol: '🎮', title: 'Massive-Scale Simulation', text: 'Build immersive simulation environments capable of modeling millions of interacting variables — replicating real-world complexity at unprecedented fidelity.' },
            { icon: 'purple', symbol: '💥', title: 'Extreme Condition Testing', text: 'Subject systems to catastrophic scenarios — network failures, data corruption, adversarial attacks — all within a controlled simulation framework.' },
            { icon: 'blue', symbol: '📈', title: 'Edge Case Discovery', text: 'AI-driven scenario generation automatically identifies and tests the most obscure edge cases that manual testing would never uncover.' },
            { icon: 'green', symbol: '✅', title: 'Production Readiness Certification', text: 'Systems pass through rigorous simulation gauntlets before deployment, ensuring they can handle any real-world condition with confidence.' }
        ],
        stats: [{ val: '10K+', label: 'Scenarios Tested' }, { val: '94%', label: 'Edge Case Coverage' }, { val: '24hr', label: 'Sim-to-Deploy' }]
    }
];

function openCapModal(idx) {
    const d = capData[idx];
    document.getElementById('capModalBar').className = 'modal-header-bar ' + d.bar;
    let html = `<div class="modal-number">${d.number}</div><div class="modal-title">${d.title}</div><div class="modal-desc">${d.desc}</div><ul class="modal-features">`;
    d.features.forEach(f => { html += `<li><div class="feat-icon ${f.icon}">${f.symbol}</div><div><strong style="color:#000;font-size:15px;">${f.title}</strong><br>${f.text}</div></li>`; });
    html += '</ul><div class="modal-stat-row">';
    d.stats.forEach(s => { html += `<div class="modal-stat"><div class="ms-val">${s.val}</div><div class="ms-label">${s.label}</div></div>`; });
    html += '</div>';
    document.getElementById('capModalBody').innerHTML = html;
    document.getElementById('capModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCapModal(e) { if(e.target===document.getElementById('capModal')){ closeCapModalBtn(); } }
function closeCapModalBtn() { document.getElementById('capModal').classList.remove('active'); document.body.style.overflow=''; }

// ===== CLC MODAL DATA =====
const clcData = [
    {
        bar: 'blue', label: 'CLC HEALTH', title: 'Bio-Data Billing',
        desc: 'The healthcare billing crisis costs the industry billions annually in errors, fraud, and administrative overhead. CLC Health is Cerelytic\'s specialized vertical that automates the entire medical coding and billing audit pipeline — from claim submission to payment reconciliation.',
        features: [
            { icon: 'green', symbol: '🏥', title: 'Automated Medical Coding Audit', text: 'AI agents cross-reference every medical code (ICD-10, CPT, HCPCS) against clinical documentation to flag incorrect, missing, or potentially fraudulent codes in real-time.' },
            { icon: 'blue', symbol: '💰', title: 'Patient Fairness Verification', text: 'Every bill is passed through the Fairness Engine to ensure patients are not overcharged or discriminated against based on demographic or socioeconomic factors.' },
            { icon: 'cyan', symbol: '⚡', title: 'Claim-to-Payment Optimization', text: 'Reduces claim denial rates by pre-screening submissions against payer requirements, dramatically accelerating the revenue cycle for healthcare providers.' },
            { icon: 'purple', symbol: '📊', title: 'Predictive Analytics Dashboard', text: 'Real-time dashboards surface billing trends, denial patterns, and revenue forecasting — giving administrators actionable intelligence at a glance.' }
        ],
        stats: [{ val: '73%', label: 'Error Reduction' }, { val: '2M+', label: 'Records/Month' }, { val: '$4.2M', label: 'Avg. Savings' }]
    },
    {
        bar: 'purple', label: 'CLC DEFENCE', title: 'Security Logistics',
        desc: 'Defense logistics is a battlefield of complexity — assets must be deployed with precision, supply chains must be unbroken, and decisions must be made faster than adversaries can react. CLC Defence applies Cerelytic\'s autonomous intelligence to transform resource allocation from guesswork into data-driven certainty.',
        features: [
            { icon: 'blue', symbol: '🎯', title: 'Predictive Resource Allocation', text: 'Machine learning models analyze historical patterns, real-time telemetry, and threat intelligence to predict optimal asset deployment before commanders make requests.' },
            { icon: 'purple', symbol: '🛡️', title: 'Supply Chain Resilience', text: 'Continuous monitoring of supply chain vulnerabilities with automated rerouting when disruptions are detected — ensuring zero critical supply failures.' },
            { icon: 'orange', symbol: '⚡', title: 'Real-Time Decision Support', text: 'Autonomous agents process incoming intelligence and present commanders with ranked action recommendations, each backed by confidence scores and risk analysis.' },
            { icon: 'green', symbol: '📍', title: 'Asset Tracking & Optimization', text: 'Full situational awareness of all deployed assets with AI-driven movement optimization that minimizes cost, maximizes coverage, and reduces exposure.' }
        ],
        stats: [{ val: '89%', label: 'Prediction Accuracy' }, { val: '500+', label: 'Assets Tracked' }, { val: '3x', label: 'Faster Decisions' }]
    }
];

function openClcModal(idx) {
    const d = clcData[idx];
    document.getElementById('clcModalBar').className = 'modal-header-bar ' + d.bar;
    let html = `<div class="modal-number" style="font-family:var(--font-mono);font-size:11px;color:var(--gray-light);letter-spacing:1px;margin-bottom:8px;"><span style="display:inline-block;padding:4px 12px;border-radius:3px;background:${d.bar==='blue'?'linear-gradient(135deg,var(--accent-blue),var(--accent-purple))':'linear-gradient(135deg,var(--accent-green),var(--accent-cyan))'};color:#fff;font-size:10px;letter-spacing:1.5px;">${d.label}</span></div><div class="modal-title">${d.title}</div><div class="modal-desc">${d.desc}</div><ul class="modal-features">`;
    d.features.forEach(f => { html += `<li><div class="feat-icon ${f.icon}">${f.symbol}</div><div><strong style="color:#000;font-size:15px;">${f.title}</strong><br>${f.text}</div></li>`; });
    html += '</ul><div class="modal-stat-row">';
    d.stats.forEach(s => { html += `<div class="modal-stat"><div class="ms-val">${s.val}</div><div class="ms-label">${s.label}</div></div>`; });
    html += '</div>';
    document.getElementById('clcModalBody').innerHTML = html;
    document.getElementById('clcModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeClcModal(e) { if(e.target===document.getElementById('clcModal')) closeClcModalBtn(); }
function closeClcModalBtn() { document.getElementById('clcModal').classList.remove('active'); document.body.style.overflow=''; }

// ===== MEETING CALENDAR =====
let currentMonth = 1; // Feb (0-indexed)
let currentYear = 2026;
let selectedDate = null;
let selectedTime = null;
let selectedDuration = '15 min';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Days that have available slots (simulate availability)
function hasAvailability(day, month, year) {
    // Weekdays only, and not past dates if current month
    const d = new Date(year, month, day);
    if(d.getDay()===0||d.getDay()===6) return false;
    if(month===1&&year===2026&&day<1) return false;
    return true;
}

function renderCalendar() {
    document.getElementById('calMonthYear').textContent = months[currentMonth]+' '+currentYear;
    const container = document.getElementById('calDays');
    container.innerHTML = '';
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
    // Blanks
    for(let i=0;i<firstDay;i++) { const b=document.createElement('div'); b.className='cal-day disabled'; container.appendChild(b); }
    for(let d=1;d<=daysInMonth;d++) {
        const div = document.createElement('div');
        let cls = 'cal-day';
        const isToday = (d===1 && currentMonth===1 && currentYear===2026);
        const isPast = (currentMonth===1 && currentYear===2026 && d<1);
        const avail = hasAvailability(d, currentMonth, currentYear);
        if(isPast) cls+=' disabled';
        else if(avail) cls+=' has-slot';
        if(isToday) cls+=' today';
        if(selectedDate && selectedDate.day===d && selectedDate.month===currentMonth && selectedDate.year===currentYear) cls+=' selected';
        div.className = cls;
        div.textContent = d;
        if(!isPast && avail) div.onclick = () => selectDate(d);
        container.appendChild(div);
    }
}

function selectDate(day) {
    selectedDate = { day, month: currentMonth, year: currentYear };
    renderCalendar();
    renderTimeSlots();
    updateSummary();
}

function renderTimeSlots() {
    const container = document.getElementById('timeSlots');
    container.innerHTML = '';
    const times = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'];
    times.forEach(t => {
        const btn = document.createElement('div');
        btn.className = 'time-slot' + (selectedTime===t?' selected':'');
        btn.textContent = t;
        btn.onclick = () => { selectedTime=t; renderTimeSlots(); updateSummary(); };
        container.appendChild(btn);
    });
}

function setDuration(btn, dur) {
    selectedDuration = dur;
    document.querySelectorAll('.duration-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById('sumDuration').textContent = dur;
}

function changeMonth(dir) {
    currentMonth += dir;
    if(currentMonth<0){ currentMonth=11; currentYear--; }
    if(currentMonth>11){ currentMonth=0; currentYear++; }
    renderCalendar();
}

function updateSummary() {
    if(selectedDate) document.getElementById('sumDate').textContent = months[selectedDate.month].substring(0,3)+' '+selectedDate.day+', '+selectedDate.year;
    else document.getElementById('sumDate').textContent = '—';
    document.getElementById('sumTime').textContent = selectedTime || '—';
    document.getElementById('sumDuration').textContent = selectedDuration;
}

function submitMeeting() {
    const name = document.getElementById('mfName').value.trim();
    const email = document.getElementById('mfEmail').value.trim();
    if(!name||!email) { alert('Please fill in your name and email.'); return; }
    if(!selectedDate||!selectedTime) { alert('Please select a date and time.'); return; }
    // Show success
    document.getElementById('formContent').style.display='none';
    document.getElementById('successMsg').style.display='block';
}

// Init
renderCalendar();
renderTimeSlots();