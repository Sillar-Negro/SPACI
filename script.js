/* ============================================
   APECI S.A. — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- TAB NAVIGATION ---- */
  const allTabs = document.querySelectorAll('.nav-tab[data-section]');
  const allPages = document.querySelectorAll('.page');

  function showSection(id) {
    allPages.forEach(p => p.classList.remove('active'));
    allTabs.forEach(t => t.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Mark all matching nav tabs
    document.querySelectorAll(`.nav-tab[data-section="${id}"]`)
      .forEach(t => t.classList.add('active'));

    // Close mobile menu
    document.getElementById('mobileMenu').classList.remove('open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Build chart only when producto section is shown
    if (id === 'producto' && !window._chartBuilt) buildChart();
  }

  allTabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      showSection(this.dataset.section);
    });
  });

  // Default: show inicio
  showSection('inicio');

  /* ---- HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });

  /* ---- STICKY NAV SHADOW ---- */
  window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,.35)'
      : 'none';
  });

  /* ---- CHART.JS ---- */
  function buildChart() {
    window._chartBuilt = true;
    const ctx = document.getElementById('productionChart').getContext('2d');

    // Realistic monthly distribution (125 TM total per month, slight variation)
    const data = {
      labels: ['Dic 2023', 'Ene 2024', 'Feb 2024', 'Mar 2024', 'Abr 2024'],
      datasets: [
        {
          label: 'Producción (TM)',
          data: [110, 130, 135, 128, 122],
          backgroundColor: [
            'rgba(45,90,39,0.75)',
            'rgba(45,90,39,0.85)',
            'rgba(45,90,39,0.95)',
            'rgba(45,90,39,0.85)',
            'rgba(45,90,39,0.70)',
          ],
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Proyección +8%',
          data: [119, 140, 146, 138, 132],
          backgroundColor: 'rgba(133,169,71,0.18)',
          borderColor: 'rgba(133,169,71,0.6)',
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
          borderDash: [4, 4],
        }
      ]
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { family: 'DM Sans', size: 11 },
              color: '#5a6857',
              boxWidth: 12,
              boxHeight: 12,
              usePointStyle: true,
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} TM`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'DM Sans', size: 11 }, color: '#5a6857' }
          },
          y: {
            beginAtZero: true,
            max: 160,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { font: { family: 'DM Sans', size: 11 }, color: '#5a6857' },
            title: { display: true, text: 'Toneladas Métricas (TM)', font: { size: 11 }, color: '#5a6857' }
          }
        }
      }
    });
  }

  /* ---- FORM SUBMIT ---- */
  window.submitForm = function () {
    const inputs = document.querySelectorAll('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form select');
    let valid = true;

    inputs.forEach(input => {
      if (input.required !== false && !input.value.trim()) {
        input.style.borderColor = '#e24b4a';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (!valid) return;

    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);

    // Clear form
    document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(el => {
      if (el.type !== 'radio') el.value = '';
    });
  };

  /* ---- KEYBOARD NAV ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      mobileMenu.classList.remove('open');
    }
  });

});
