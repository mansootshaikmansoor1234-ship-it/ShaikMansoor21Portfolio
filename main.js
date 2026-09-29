import './style.css'

/* ── Preloader ── */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader')
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('done')
      setTimeout(() => preloader.remove(), 700)
    }, 600)
  }
})

/* ── Custom cursor ── */
const cursor = document.querySelector('.cursor-dot')
const cursorRing = document.querySelector('.cursor-ring')
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0

if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  document.body.classList.add('has-cursor')
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  })
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`
    requestAnimationFrame(animateRing)
  }
  animateRing()

  document.querySelectorAll('a, button, .project-card, .magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'))
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'))
  })
}

/* ── Scroll progress bar ── */
const progressBar = document.querySelector('.scroll-progress')
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  if (progressBar) progressBar.style.transform = `scaleX(${Math.min(scrolled / 100, 1)})`
}, { passive: true })

/* ── Split headings into word spans for reveal ── */
document.querySelectorAll('[data-split]').forEach((heading) => {
  const text = heading.innerHTML
  // Split on <br> first, then words
  const lines = text.split(/<br\s*\/?>/i)
  heading.innerHTML = lines.map((line) =>
    `<span class="split-line">${line.trim().split(/\s+/).map((word) =>
      `<span class="split-word"><span class="split-word-inner">${word}</span></span>`
    ).join(' ')}</span>`
  ).join('<br>')
})

/* ── Projects data ── */
const projects = [
  {
    number: '01',
    title: 'Student Performance Tracker',
    type: 'Data utility / academic systems',
    description: 'A focused academic dashboard for adding students, recording attendance, entering marks, and calculating performance percentages.',
    stack: ['Python', 'Streamlit', 'SQLite'],
    accent: 'amber',
  },
  {
    number: '02',
    title: 'Smart Feedback System',
    type: 'Full-stack web application',
    description: 'A dynamic feedback experience with categorized questions, student-facing forms, secure submission flows, and an admin view for reviewing responses.',
    stack: ['MERN Stack', 'JavaScript', 'MongoDB'],
    accent: 'blue',
  },
]

const projectMarkup = projects.map((project) => `
  <article class="project-card reveal ${project.accent}" data-tilt>
    <div class="project-topline">
      <span class="project-number">${project.number}</span>
      <span class="project-type">${project.type}</span>
    </div>
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tag-list">${project.stack.map((item) => `<span>${item}</span>`).join('')}</div>
    </div>
    <div class="project-mark" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="card-shine" aria-hidden="true"></div>
  </article>
`).join('')

/* ── Stats ── */
const stats = [
  { value: 2, suffix: '+', label: 'Projects built' },
  { value: 2028, suffix: '', label: 'Graduation year', isYear: true },
  { value: 83, suffix: '%', label: 'Top score' },
]

const statsMarkup = stats.map((s) => `
  <div class="stat-item reveal">
    <span class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}" ${s.isYear ? 'data-year="true"' : ''}>0${s.suffix}</span>
    <span class="stat-label">${s.label}</span>
  </div>
`).join('')

document.querySelector('#app').innerHTML = `
  <div class="preloader"><div class="preloader-inner"><span>S</span><span>M</span></div></div>
  <div class="cursor-dot" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true"></div>
  <div class="scroll-progress" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand magnetic" href="#top" aria-label="Shaik Mansoor home"><span>SM</span><strong>Shaik Mansoor</strong></a>
    <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="active" href="#top">Home</a>
      <a href="#about">About</a>
      <a href="#work">Work</a>
      <a href="#contact">Contact</a>
    </nav>
    <a class="header-link magnetic" href="mailto:mansootshaikmansoor1234@gmail.com">Let's talk <span>↗</span></a>
  </header>

  <main id="top">
    <section class="hero section-shell">
      <div class="hero-copy">
        <p class="eyebrow reveal"><span class="eyebrow-line"></span> Computer Science Student · India</p>
        <h1 data-split>Building useful<br><em>things</em> with code.</h1>
        <p class="hero-intro reveal">I'm Shaik Mansoor — a curious developer exploring the space where clean interfaces, data, and thoughtful problem solving meet.</p>
        <div class="hero-actions reveal">
          <a class="button button-dark magnetic" href="#work">Explore my work <span>↘</span></a>
          <a class="text-link" href="mailto:mansootshaikmansoor1234@gmail.com">Get in touch <span>↗</span></a>
        </div>
      </div>
      <div class="hero-visual" data-parallax>
        <div class="orb orb-large" data-depth="0.03"></div>
        <div class="orb orb-small" data-depth="0.06"></div>
        <div class="coordinate">17° 42' N<br>78° 20' E</div>
        <div class="hero-stamp" data-depth="0.04"><span>Available</span><strong>for<br>opportunities</strong><i>✳</i></div>
        <div class="vertical-label">PORTFOLIO / 2024—25</div>
      </div>
      <div class="scroll-note"><span class="scroll-line"></span> Scroll to explore</div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        ${Array(4).fill('<span>Java</span><span>•</span><span>Python</span><span>•</span><span>MERN</span><span>•</span><span>Data Analytics</span><span>•</span><span>Streamlit</span><span>•</span><span>SQL</span><span>•</span>').join('')}
      </div>
    </div>

    <section class="intro-strip" id="about">
      <div class="section-shell intro-grid">
        <p class="section-kicker reveal">01 / About</p>
        <div class="intro-text">
          <p class="large-copy" data-split>I like making complex ideas feel <em>simple.</em></p>
          <p class="reveal">Currently pursuing a B.Tech in Computer Science and Engineering at Annamacharya Institute of Technology &amp; Sciences, I'm building a foundation across full-stack development, data analytics, and software engineering.</p>
        </div>
      </div>
    </section>

    <section class="skills-section section-shell">
      <div class="skills-heading reveal"><p class="section-kicker">What I bring</p><h2 data-split>A practical<br><em>toolkit.</em></h2></div>
      <div class="skills-grid">
        <div class="skill-column reveal"><span class="skill-index">01</span><h3>Development</h3><ul><li>Java</li><li>Python</li><li>HTML / CSS / JavaScript</li><li>MERN Stack</li></ul></div>
        <div class="skill-column reveal"><span class="skill-index">02</span><h3>Data &amp; tools</h3><ul><li>Data Analytics</li><li>SQL &amp; SQLite</li><li>Streamlit</li><li>GitHub</li></ul></div>
        <div class="skill-column reveal"><span class="skill-index">03</span><h3>How I work</h3><ul><li>Problem solving</li><li>Presentation</li><li>Task management</li><li>Technology learning</li></ul></div>
      </div>
    </section>

    <section class="stats-bar">
      <div class="section-shell stats-grid">${statsMarkup}</div>
    </section>

    <section class="work-section" id="work">
      <div class="section-shell">
        <div class="work-heading reveal"><div><p class="section-kicker">02 / Selected work</p><h2 data-split>Small projects,<br><em>real purpose.</em></h2></div><p class="work-note">A selection of projects shaped by curiosity, coursework, and a desire to make everyday workflows better.</p></div>
        <div class="projects-grid">${projectMarkup}</div>
        <a class="github-banner reveal magnetic" href="https://github.com/mansootshaikmansoor1234-shit-p" target="_blank" rel="noreferrer"><span>See more on GitHub</span><strong>↗</strong></a>
      </div>
    </section>

    <section class="education-section section-shell">
      <div class="section-kicker reveal">03 / The journey</div>
      <div class="education-content reveal"><h2 data-split>Learning by<br><em>doing.</em></h2><div class="education-list"><div><span>2024—2028</span><strong>B.Tech — Computer Science &amp; Engineering</strong><p>Annamacharya Institute of Technology &amp; Sciences, Tirupati</p></div><div><span>2022—2024</span><strong>Intermediate</strong><p>Sri Chaitanya Junior College · 877 / 1000</p></div><div><span>2021—2022</span><strong>10th Class</strong><p>Pragathi EM High School · 503 / 600 · 83.83%</p></div></div></div>
    </section>

    <section class="contact-section" id="contact">
      <div class="section-shell contact-inner reveal"><p class="section-kicker">04 / Contact</p><h2 data-split>Have a good<br><em>idea?</em></h2><p class="contact-copy">I'm always open to learning, collaborating, and discussing opportunities where I can contribute and grow.</p><a class="contact-email magnetic" href="mailto:mansootshaikmansoor1234@gmail.com">mansootshaikmansoor1234@gmail.com <span>↗</span></a><div class="contact-meta"><a href="tel:+917993529810">+91 79935 29810 ↗</a><a href="https://www.linkedin.com/in/shaik-mansoor-53746936a" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/mansootshaikmansoor1234-shit-p" target="_blank" rel="noreferrer">GitHub ↗</a><span>Tirupati, India</span></div></div>
    </section>
  </main>

  <footer class="site-footer section-shell"><span>© <span id="year"></span> Shaik Mansoor</span><span>Designed &amp; built with intention.</span><a href="#top">Back to top ↑</a></footer>
`

/* ── Re-split headings after render ── */
document.querySelectorAll('[data-split]').forEach((heading) => {
  const text = heading.innerHTML
  const lines = text.split(/<br\s*\/?>/i)
  heading.innerHTML = lines.map((line) =>
    `<span class="split-line">${line.trim().split(/\s+/).map((word) =>
      `<span class="split-word"><span class="split-word-inner">${word}</span></span>`
    ).join(' ')}</span>`
  ).join('<br>')
})

/* ── Mobile menu ── */
const menuToggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-nav')
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  menuToggle.classList.toggle('open', !isOpen)
  nav.classList.toggle('open', !isOpen)
})

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.classList.remove('open')
    nav.classList.remove('open')
  })
})

document.querySelector('#year').textContent = new Date().getFullYear()

/* ── IntersectionObserver for reveals ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

/* ── Stagger skill list items ── */
document.querySelectorAll('.skill-column').forEach((col) => {
  col.querySelectorAll('li').forEach((li, i) => {
    li.style.transitionDelay = `${i * 0.06 + 0.15}s`
  })
})

/* ── Stagger education items ── */
document.querySelectorAll('.education-list > div').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`
})

/* ── Animate split words on scroll ── */
const splitObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.split-word-inner').forEach((word, i) => {
        word.style.transitionDelay = `${i * 0.04}s`
        word.style.transform = 'translateY(0)'
        word.style.opacity = '1'
      })
      splitObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.2 })

document.querySelectorAll('[data-split]').forEach((heading) => splitObserver.observe(heading))

/* ── Parallax orbs ── */
const parallaxContainer = document.querySelector('[data-parallax]')
if (parallaxContainer && window.matchMedia('(pointer: fine)').matches) {
  const parallaxItems = parallaxContainer.querySelectorAll('[data-depth]')
  parallaxContainer.addEventListener('mousemove', (e) => {
    const rect = parallaxContainer.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    parallaxItems.forEach((item) => {
      const depth = parseFloat(item.dataset.depth)
      item.style.transform = `translate(${x * depth * 200}px, ${y * depth * 200}px)`
    })
  })
  parallaxContainer.addEventListener('mouseleave', () => {
    parallaxItems.forEach((item) => { item.style.transform = '' })
  })
}

/* ── Magnetic buttons ── */
document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  })
  el.addEventListener('mouseleave', () => { el.style.transform = '' })
})

/* ── 3D tilt on project cards ── */
document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-7px)`
    const shine = card.querySelector('.card-shine')
    if (shine) shine.style.opacity = `${0.15 + Math.abs(x) * 0.25}`
    if (shine) shine.style.transform = `translateX(${x * 100}%)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
    const shine = card.querySelector('.card-shine')
    if (shine) { shine.style.opacity = '0'; shine.style.transform = '' }
  })
})

/* ── Animated stat counters ── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-value').forEach((stat) => {
        const target = parseInt(stat.dataset.target)
        const suffix = stat.dataset.suffix || ''
        const isYear = stat.dataset.year === 'true'
        let current = 0
        const duration = 1600
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          current = Math.round(target * eased)
          stat.textContent = (isYear && progress < 1 ? current : current) + suffix
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
      statObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.4 })

document.querySelectorAll('.stats-bar').forEach((bar) => statObserver.observe(bar))

/* ── Nav active state on scroll ── */
const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('.site-nav a')
window.addEventListener('scroll', () => {
  let current = 'top'
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id
  })
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`))
}, { passive: true })
