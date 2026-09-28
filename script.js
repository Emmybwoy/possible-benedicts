/* ============================================
   BENEDICT POSSIBLE — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  const revealElements = document.querySelectorAll('.section-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function(el) {
      el.classList.add('revealed');
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = btn.dataset.filter;

      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      portfolioCards.forEach(function(card) {
        if (filter === 'All' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function() {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = 'Please fill in all fields.';
          formStatus.classList.remove('success');
          formStatus.classList.add('error');
        }
        return;
      }

      const subject = encodeURIComponent('Portfolio enquiry from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

      if (formStatus) {
        formStatus.textContent = 'Your email app is opening so you can send your message directly.';
        formStatus.classList.remove('error');
        formStatus.classList.add('success');
      }

      window.location.href = 'mailto:possiblebenedict2004@gmail.com?subject=' + subject + '&body=' + body;
      contactForm.reset();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  document.querySelectorAll('.blog-card').forEach(function(card) {
    const readMore = card.querySelector('.read-more');
    const body = card.querySelector('.blog-body');

    if (readMore && body) {
      const tagColor = card.dataset.color || '#C9A227';
      readMore.style.color = tagColor;
      body.style.maxHeight = '0px';
      body.style.opacity = '0';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height 0.35s ease, opacity 0.35s ease';

      readMore.addEventListener('click', function() {
        const expanded = card.classList.toggle('expanded');
        readMore.setAttribute('aria-expanded', String(expanded));
        readMore.textContent = expanded ? 'Hide insight' : 'Read insight →';

        if (expanded) {
          body.style.maxHeight = body.scrollHeight + 'px';
          body.style.opacity = '1';
        } else {
          body.style.maxHeight = '0px';
          body.style.opacity = '0';
        }
      });
    }
  });

});