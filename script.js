/* ==========================================================================
   بنك الأفكار التعليمي - منطق التفاعل وتوليد الشهادات وحاسبة الأرباح
   Bank Al-Afkar Platform - Streamlined Interactive Core
   ========================================================================== */

// التهيئة عند تحميل المستند
document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  initAmbientMotionCanvas();
  initParallaxExperience();
  initCounterAnimation();
  initSpotlightCards();
  initCertificateHoloEffect();
  calculateRoyalties();
  setupSmoothScrolling();
  setupKeyboardShortcuts();
});

/* ==========================================================================
   المحرك الحركي السينمائي (Cinematic Canvas & Parallax Motion Engine)
   خلفية فيديو تفاعلية حية تدمج الطفل والمفكر وشبكة النجوم والجسيمات الذهبية
   ========================================================================== */
function initAmbientMotionCanvas() {
  const canvas = document.getElementById("ambientMotionCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 45;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || 650;
  }

  window.addEventListener("resize", resize);
  resize();

  class StardustParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(Math.random() * 0.35 + 0.15);
      this.radius = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.isGolden = Math.random() > 0.35;
    }

    update(time) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y < -10) this.reset(false);
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;

      this.currentAlpha = this.baseAlpha + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2;
      if (this.currentAlpha < 0.1) this.currentAlpha = 0.1;
      if (this.currentAlpha > 0.85) this.currentAlpha = 0.85;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (this.isGolden) {
        ctx.fillStyle = `rgba(245, 208, 90, ${this.currentAlpha})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.7)";
        ctx.shadowBlur = this.radius * 3;
      } else {
        ctx.fillStyle = `rgba(180, 240, 220, ${this.currentAlpha * 0.8})`;
        ctx.shadowColor = "rgba(16, 185, 129, 0.5)";
        ctx.shadowBlur = this.radius * 2;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new StardustParticle());
  }

  let startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const time = (Date.now() - startTime) * 0.001;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update(time);
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

function initParallaxExperience() {
  const hero = document.getElementById("hero");
  const backdrop = document.getElementById("cinematicBackdropImg");
  const card = document.getElementById("heroInteractiveCard");
  if (!hero || !backdrop) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX = x;
    mouseY = y;
  });

  hero.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  function renderParallax() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    backdrop.style.transform = `scale(1.04) translate(${currentX * -24}px, ${currentY * -16}px)`;

    if (card) {
      const tiltX = currentY * -8;
      const tiltY = currentX * 12;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    }

    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
}

// ساعة التوقيت المباشرة لتوقيت القاهرة
function initLiveClock() {
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const clockEl = document.getElementById("cairoLiveClock");
    if (clockEl) clockEl.textContent = timeStr;

    const heroCardTime = document.getElementById("heroCardTime");
    if (heroCardTime) {
      const dateStr = now.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
      heroCardTime.textContent = `${dateStr} - ${timeStr}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// حاسبة عوائد الملكية الفكرية ونسب الأرباح (12% - 20%)
function calculateRoyalties() {
  const fundingSlider = document.getElementById("fundingSlider");
  const rateSlider = document.getElementById("rateSlider");

  if (!fundingSlider || !rateSlider) return;

  const funding = parseFloat(fundingSlider.value);
  const rate = parseFloat(rateSlider.value);

  // تحديث نصوص العرض
  document.getElementById("valFundingDisplay").textContent = funding.toLocaleString('en-US') + " ج.م";
  document.getElementById("valRateDisplay").textContent = rate + "%";

  // حساب العائد المباشر لصاحب الفكرة
  const inventorShare = funding * (rate / 100);
  document.getElementById("inventorShareDisplay").textContent = Math.round(inventorShare).toLocaleString('en-US') + " ج.م";
}

// فتح شهادة الفكرة النموذجية من الهيرو
function openSampleCertificate() {
  document.getElementById("certReferenceCode").textContent = "EGY-IDEA-2026-94810";
  document.getElementById("certOwnerName").textContent = "م. أحمد محمود إبراهيم";
  document.getElementById("certOwnerLocation").textContent = "الغربية (المحلة الكبرى) • 16 سنة";
  document.getElementById("certIdeaTitle").textContent = "تطبيق تفاعلي لتحويل المناهج الدراسية إلى ألعاب ذكية";
  document.getElementById("certTimestamp").textContent = "14 أكتوبر 2026 - 11:20 م (توقيت القاهرة)";

  const trackBadge = document.getElementById("certTrackBadge");
  if (trackBadge) {
    trackBadge.textContent = "🏛️ بنك الأفكار";
    trackBadge.style.backgroundColor = "#ecfdf5";
    trackBadge.style.color = "#047857";
  }

  const royaltyEl = document.getElementById("certRoyaltyRate");
  if (royaltyEl) royaltyEl.textContent = "محفوظة تعاقدياً بنسبة (18.5%) عند التنفيذ";

  generateSvgQrCode("EGY-IDEA-2026-94810");
  openCertificateModal();
}

// تحديد المسار والتمرير التلقائي للاستمارة
function selectTrackAndScroll(trackType) {
  const youthRadio = document.querySelector('input[name="ideaTrack"][value="youth"]');
  const adultRadio = document.querySelector('input[name="ideaTrack"][value="adult"]');
  
  if (trackType === 'youth' && youthRadio) {
    youthRadio.checked = true;
  } else if (trackType === 'adult' && adultRadio) {
    adultRadio.checked = true;
  }
  
  updateTrackSelection();

  const target = document.getElementById("depositFormSection");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// تحديث المظهر المرئي لاختيار المسار
function updateTrackSelection() {
  const youthRadio = document.querySelector('input[name="ideaTrack"][value="youth"]');
  const labelYouth = document.getElementById("labelYouthTrack");
  const labelAdult = document.getElementById("labelAdultTrack");
  
  if (youthRadio && youthRadio.checked) {
    labelYouth.classList.add("active");
    labelAdult.classList.remove("active");
  } else {
    labelYouth.classList.remove("active");
    labelAdult.classList.add("active");
  }
}

// التعامل مع رفع الملفات
function handleFileSelected(input) {
  const dropText = document.getElementById("dropText");
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    dropText.innerHTML = `✅ تم إرفاق: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
    dropText.style.color = "#047857";
  }
}

// معالجة إرسال استمارة الإيداع وتوليد الوثيقة الرسمية
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("ideaSubmissionForm");
  const fullName = document.getElementById("fullName").value.trim();
  const userAge = document.getElementById("userAge").value.trim();
  const governorate = document.getElementById("governorate").value;
  const ideaTitle = document.getElementById("ideaTitle").value.trim();
  
  const selectedTrackRadio = document.querySelector('input[name="ideaTrack"]:checked');
  const track = selectedTrackRadio ? selectedTrackRadio.value : 'youth';
  const isYouth = (track === 'youth');

  // توليد رقم إيداع رسمي فريد
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const refCode = `EGY-IDEA-2026-${randomSuffix}`;

  // حساب الختم الزمني بتوقيت مصر
  const now = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedTime = now.toLocaleDateString('ar-EG', options) + " (توقيت القاهرة)";

  // ملء بيانات الشهادة الرسمية
  document.getElementById("certReferenceCode").textContent = refCode;
  document.getElementById("certOwnerName").textContent = fullName;
  document.getElementById("certOwnerLocation").textContent = `${governorate} • ${userAge} سنة`;
  document.getElementById("certIdeaTitle").textContent = ideaTitle;
  document.getElementById("certTimestamp").textContent = formattedTime;

  const trackBadge = document.getElementById("certTrackBadge");
  if (isYouth) {
    trackBadge.textContent = "📩 بوسطة الأفكار (تحت 18 سنة)";
    trackBadge.style.backgroundColor = "#e0f2fe";
    trackBadge.style.color = "#0369a1";
  } else {
    trackBadge.textContent = "🏛️ بنك الأفكار (فوق 18 سنة)";
    trackBadge.style.backgroundColor = "#ecfdf5";
    trackBadge.style.color = "#047857";
  }

  // توليد باركود QR تفاعلي مدمج
  generateSvgQrCode(refCode);

  // تحديث عداد الأفكار
  const countEl = document.getElementById("metricIdeasCount");
  if (countEl) {
    let current = parseInt(countEl.textContent.replace(/[^0-9]/g, '')) || 10480;
    countEl.textContent = (current + 1).toLocaleString('en-US') + "+";
  }

  // فتح نافذة الشهادة الفورية
  openCertificateModal();

  // تصفير الاستمارة
  form.reset();
  const dropText = document.getElementById("dropText");
  if (dropText) {
    dropText.innerHTML = "اضغط هنا لإرفاق ملف أو صورة";
    dropText.style.color = "";
  }
  updateTrackSelection();
}

// عرض وإخفاء نافذة الشهادة
function openCertificateModal() {
  const modal = document.getElementById("certificateModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCertificateModal() {
  const modal = document.getElementById("certificateModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function handleModalOverlayClick(event) {
  if (event.target.id === "certificateModal") {
    closeCertificateModal();
  }
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCertificateModal();
    }
  });
}

// توليد رمز QR Code هندسي دقيق بتنسيق SVG
function generateSvgQrCode(dataString) {
  const container = document.getElementById("certQrContainer");
  if (!container) return;

  const size = 68;
  const rects = [];
  
  rects.push('<rect x="2" y="2" width="20" height="20" rx="2" fill="#0f172a"/>');
  rects.push('<rect x="6" y="6" width="12" height="12" fill="#ffffff"/>');
  rects.push('<rect x="9" y="9" width="6" height="6" fill="#0f172a"/>');

  rects.push('<rect x="46" y="2" width="20" height="20" rx="2" fill="#0f172a"/>');
  rects.push('<rect x="50" y="6" width="12" height="12" fill="#ffffff"/>');
  rects.push('<rect x="53" y="9" width="6" height="6" fill="#0f172a"/>');

  rects.push('<rect x="2" y="46" width="20" height="20" rx="2" fill="#0f172a"/>');
  rects.push('<rect x="6" y="50" width="12" height="12" fill="#ffffff"/>');
  rects.push('<rect x="9" y="53" width="6" height="6" fill="#0f172a"/>');

  let seed = 0;
  for (let i = 0; i < dataString.length; i++) {
    seed += dataString.charCodeAt(i);
  }

  const step = 4;
  for (let y = 4; y < size - 4; y += step) {
    for (let x = 4; x < size - 4; x += step) {
      const inTopRight = (x <= 24 && y <= 24);
      const inTopLeft = (x >= 44 && y <= 24);
      const inBottomRight = (x <= 24 && y >= 44);
      
      if (!inTopRight && !inTopLeft && !inBottomRight) {
        const val = Math.sin(x * seed + y) * 10000;
        if ((val - Math.floor(val)) > 0.45) {
          rects.push(`<rect x="${x}" y="${y}" width="3.2" height="3.2" rx="0.5" fill="#0f172a"/>`);
        }
      }
    }
  }

  container.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>
      ${rects.join('')}
    </svg>
  `;
}

// تفعيل روابط التنقل السلس
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// عداد الأرقام التراكمي الانسيابي
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter-value");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target")) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        const formatComma = el.getAttribute("data-format") === "comma";

        let start = 0;
        const duration = 2200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * target);

          if (formatComma) {
            el.textContent = currentVal.toLocaleString('en-US') + suffix;
          } else {
            el.textContent = currentVal + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (formatComma) {
              el.textContent = target.toLocaleString('en-US') + suffix;
            } else {
              el.textContent = target + suffix;
            }
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

// تأثير الإضاءة والتفاعل المغناطيسي للكروت
function initSpotlightCards() {
  const cards = document.querySelectorAll(".track-card, .interactive-preview-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
    });
  });
}

// الختم الذهبي التفاعلي ثلاثي الأبعاد للشهادة
function initCertificateHoloEffect() {
  const certContainer = document.getElementById("printableCertificate");
  const seal = document.querySelector(".cert-gold-seal");
  if (!certContainer) return;

  certContainer.addEventListener("mousemove", (e) => {
    const rect = certContainer.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    certContainer.style.setProperty("--cert-mouse-x", `${xPct}%`);
    certContainer.style.setProperty("--cert-mouse-y", `${yPct}%`);

    if (seal) {
      const sealRect = seal.getBoundingClientRect();
      const sealCenterX = sealRect.left + sealRect.width / 2;
      const sealCenterY = sealRect.top + sealRect.height / 2;
      const deltaX = (e.clientX - sealCenterX) / 25;
      const deltaY = (e.clientY - sealCenterY) / 25;
      seal.style.transform = `perspective(400px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.04)`;
    }
  });

  certContainer.addEventListener("mouseleave", () => {
    if (seal) {
      seal.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  });
}
