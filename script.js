/* ============================================
   ARJUN KUMAR PORTFOLIO — script.js
   ============================================ */

/* ============================================================
   1. TYPEWRITER EFFECT
   ============================================================ */
const typedRole = document.getElementById('typed-role');
const roles = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React.js Developer',
  'Node.js Developer',
  'Problem Solver',
];
let rIdx = 0, cIdx = 0, deleting = false;

function typeRole() {
  const current = roles[rIdx];
  if (!deleting) {
    typedRole.textContent = current.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
    setTimeout(typeRole, 65);
  } else {
    typedRole.textContent = current.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      setTimeout(typeRole, 300);
      return;
    }
    setTimeout(typeRole, 38);
  }
}
setTimeout(typeRole, 600);

/* ============================================================
   2. BOTTOM NAVBAR — Active State on Scroll
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const bnItems    = document.querySelectorAll('.bn-item');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  bnItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.target === current) item.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

/* ============================================================
   3. SMOOTH SCROLL for all nav links
   ============================================================ */
function smoothScrollTo(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const top = el.offsetTop - 20;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Bottom nav
bnItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(item.dataset.target);
  });
});

// Any link with nav-trigger class
document.querySelectorAll('.nav-trigger').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(link.dataset.target);
  });
});

// Footer nav
document.querySelectorAll('.footer-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href.replace('#', ''));
    }
  });
});

// All anchor tags
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      smoothScrollTo(targetId);
    }
  });
});

/* ============================================================
   4. SCROLL REVEAL ANIMATION
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add reveal class to key elements
const revealTargets = [
  '.hero-left', '.hero-right',
  '.about-grid',
  '.skills-box',
  '.port-card',
  '.exp-item',
  '.cert-card',
  '.contact-info-card',
  '.contact-form',
  '.about-card',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.08) + 's';
    revealObserver.observe(el);
  });
});

/* ============================================================
   5. PROJECT FILTER
   ============================================================ */
const pfBtns  = document.querySelectorAll('.pf-btn');
const portCards = document.querySelectorAll('.port-card');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    portCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.cat === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   6. CONTACT FORM
   ============================================================ */
function submitForm(e) {
  e.preventDefault();
  const name  = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg   = document.getElementById('cMsg').value.trim();
  const btn   = document.querySelector('.c-submit');
  const success = document.getElementById('cSuccess');

  if (!name || !email || !msg) {
    btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
    btn.textContent = '⚠ Please fill all required fields';
    setTimeout(() => {
      btn.style.background = '';
      btn.textContent = 'Send Message';
    }, 2500);
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending...';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message';
    success.classList.add('show');
    document.getElementById('cName').value    = '';
    document.getElementById('cEmail').value   = '';
    document.getElementById('cSubject').value = '';
    document.getElementById('cMsg').value     = '';
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1800);
}

/* ============================================================
   7. SCROLL PROGRESS BAR
   ============================================================ */
const bar = document.createElement('div');
bar.style.cssText = `
  position:fixed; top:0; left:0; height:3px; z-index:9999;
  background:linear-gradient(90deg,#4f8ef7,#a855f7);
  width:0%; transition:width 0.2s;
  box-shadow:0 0 8px rgba(79,142,247,0.6);
`;
document.body.appendChild(bar);
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
});

/* ============================================================
   8. BACK TO TOP BUTTON
   ============================================================ */
const backBtn = document.createElement('button');
backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backBtn.style.cssText = `
  position:fixed; bottom:5.5rem; right:1.5rem;
  width:42px; height:42px;
  border-radius:50%;
  background:linear-gradient(135deg,#4f8ef7,#a855f7);
  color:#fff; border:none; cursor:pointer; z-index:150;
  font-size:0.9rem;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transform:translateY(10px);
  transition:opacity 0.3s, transform 0.3s, box-shadow 0.2s;
  box-shadow:0 4px 18px rgba(79,142,247,0.35);
`;
document.body.appendChild(backBtn);
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backBtn.addEventListener('mouseenter', () => { backBtn.style.boxShadow = '0 6px 24px rgba(79,142,247,0.55)'; });
backBtn.addEventListener('mouseleave', () => { backBtn.style.boxShadow = '0 4px 18px rgba(79,142,247,0.35)'; });

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backBtn.style.opacity = '1';
    backBtn.style.transform = 'translateY(0)';
  } else {
    backBtn.style.opacity = '0';
    backBtn.style.transform = 'translateY(10px)';
  }
});

/* ============================================================
   9. HERO CODE - Staggered section intro
   ============================================================ */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-left > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120);
  });
});

/* ============================================================
   10. CONSOLE SIGNATURE
   ============================================================ */
console.log('%c Arjun Kumar | Full Stack Developer ', 'background:linear-gradient(135deg,#4f8ef7,#a855f7);color:#fff;padding:8px 16px;border-radius:8px;font-weight:bold;font-size:14px;');
console.log('%c arjunk4575@gmail.com | +91-7320023817 ', 'color:#818cf8;font-size:12px;');
