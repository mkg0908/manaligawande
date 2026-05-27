import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

type TimelineEntry = {
  title: string
  subtitle: string
  meta: string
  bullets?: string[]
  tags?: string[]
  logo?: string
  fallback?: string
}

type Project = {
  title: string
  eyebrow?: string
  description: string
  tags: string[]
  link?: string
}

type SkillCategory = {
  title: string
  skills: string[]
}

const experience: TimelineEntry[] = [
  {
    title: 'FinancialEdU Inc.',
    subtitle: 'Software Developer Intern',
    meta: 'Mar 2026 - Present | Remote, USA',
    logo: '/logos/financialedu.png',
    fallback: 'FE',
    bullets: [
      'Built 7+ full-stack features for an AWS-hosted financial literacy platform.',
      'Developed quiz workflows, learning modules, backend APIs and chatbot orchestration flows.',
      'Reduced development time by 40% using GitHub Copilot, Claude Code and Cursor.',
    ],
    tags: ['React', 'Java', 'Spring Boot', 'FastAPI', 'Python', 'MySQL', 'AWS', 'LangChain'],
  },
  {
    title: 'Bajaj Finance Ltd.',
    subtitle: 'Software Engineer',
    meta: 'Jul 2021 - Oct 2023 | Pune, India',
    logo: '/logos/bajaj-finance.png',
    fallback: 'BFL',
    bullets: [
      'Delivered 20+ React and Flask-based workflow enhancements for 60K+ internal users.',
      'Automated settlement and loan closure workflows, reducing processing time from 2 days to near real-time.',
      'Improved release quality through API testing, regression automation, SQL validation, Jenkins, Azure DevOps and monitoring dashboards.',
    ],
    tags: ['Python', 'React', 'Flask', 'REST APIs', 'SQL', 'PyTest', 'Selenium', 'Postman', 'Jenkins', 'Azure DevOps', 'AWS'],
  },
  {
    title: 'Academic Success Network, Arizona State University',
    subtitle: 'Engineering Tutor',
    meta: 'Jan 2025 - Aug 2025 | Tempe, AZ',
    logo: '/logos/asu.png',
    fallback: 'ASU',
    bullets: [
      'Mentored 470+ students in Python, SQL, data structures, algorithms and debugging.',
      'Supported students across engineering coursework and technical problem solving.',
    ],
    tags: ['Python', 'SQL', 'Data Structures', 'Algorithms', 'Debugging', 'Mentorship'],
  },
  {
    title: 'VI Solutions',
    subtitle: 'Software Engineer Intern',
    meta: 'Jun 2020 - Jul 2020 | Remote, India',
    logo: '/logos/vi-solutions.png',
    fallback: 'VI',
    bullets: [
      'Built Java and Spring Boot REST APIs to support data acquisition, validation and process automation for industrial IoT systems.','Developed React dashboards for real-time monitoring and configuration of automated sensor data pipelines.',
      'Reduced manual QA effort by 30% by building a Python-based anomaly detection and data validation pipeline for IoT sensor workflows.'],
    tags: ['Python', 'IoT', 'Machine Learning', 'Sensors', 'Data Validation'],
  },
]

const education: TimelineEntry[] = [
  {
    title: 'Arizona State University',
    subtitle: 'Master of Science in Computer Engineering',
    meta: 'Jan 2024 - Dec 2025 | Tempe, AZ',
    bullets: ['GPA: 3.9/4.0'],
    logo: '/logos/asu.png',
    fallback: 'ASU',
  },
  {
    title: 'COEP Technological University',
    subtitle: 'Bachelor of Technology in Electrical Engineering; Minor in Mathematics',
    meta: 'Aug 2017 - May 2021 | Pune, India',
    logo: '/logos/coep.png',
    fallback: 'COEP',
  },
]

const projects: Project[] = [
  {
    title: 'momAI - Culturally-Aware Nutrition Assistant',
    eyebrow: '2nd Place - Hacks for Humanity',
    description:
      'AI-powered nutrition assistant for recipe exploration, meal planning, nutrition tracking and culturally-aware recommendations.',
    tags: ['React', 'Python', 'Claude API', 'LangChain', 'LangGraph', 'AI'],
    link: 'https://mom-ai.vercel.app/',
  },
  {
    title: 'Real-Time Threat Detection',
    eyebrow: 'Jan 2025 - May 2025',
    description:
      'AI surveillance system combining weapon detection and pose estimation for real-time public safety threat assessment.',
    tags: ['Python', 'YOLOv8', 'MediaPipe', 'Computer Vision', 'Deep Learning'],
  },
  {
    title: 'Hybrid Fraud Detection in Online Transactions',
    eyebrow: 'Aug 2024 - Dec 2024',
    description:
      'Hybrid fraud detection model using anomaly detection and supervised learning on 590K+ online transaction records.',
    tags: ['Python', 'XGBoost', 'Random Forest', 'Autoencoders', 'SMOTE', 'PCA'],
  },
  {
    title: 'AWS Customer Feedback Analytics Platform',
    description:
      'Serverless analytics platform for scalable customer feedback ingestion, processing and API validation.',
    tags: ['AWS Lambda', 'S3', 'DynamoDB', 'API Gateway', 'Python'],
  },
  {
    title: 'Density Based Traffic Control System',
    eyebrow: 'Aug 2019 - Dec 2019',
    description:
      'Dynamic traffic signal system using IR sensors and Atmega 32 to adjust signal timing based on vehicle density.',
    tags: ['ATMega', 'Microcontroller', 'IR Sensors', 'Embedded Systems'],
  },
]

const skillCategories: SkillCategory[] = [
  { title: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { title: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Responsive UI'] },
  { title: 'Backend', skills: ['Spring Boot', 'FastAPI', 'Flask', 'REST APIs'] },
  { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Jenkins', 'Azure DevOps', 'GitHub Actions', 'Git'] },
  { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'DynamoDB', 'Oracle SQL'] },
  { title: 'Testing & Quality', skills: ['PyTest', 'Selenium', 'Postman', 'API Testing', 'Regression Testing'] },
  { title: 'AI / ML', skills: ['Machine Learning', 'Computer Vision', 'YOLOv8', 'MediaPipe', 'XGBoost', 'LangChain', 'LangGraph'] },
  { title: 'Tools / Delivery', skills: ['Jira', 'Confluence', 'Agile', 'SDLC', 'PMP'] },
]

const iconSlugs: Record<string, string> = {
  Python: 'python',
  Java: 'openjdk',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  SQL: 'sqlite',
  Bash: 'gnubash',
  React: 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Spring Boot': 'springboot',
  FastAPI: 'fastapi',
  Flask: 'flask',
  AWS: 'amazonwebservices',
  Docker: 'docker',
  Jenkins: 'jenkins',
  'Azure DevOps': 'azuredevops',
  'GitHub Actions': 'githubactions',
  Git: 'git',
  MySQL: 'mysql',
  PostgreSQL: 'postgresql',
  DynamoDB: 'amazondynamodb',
  'Oracle SQL': 'oracle',
  PyTest: 'pytest',
  Selenium: 'selenium',
  Postman: 'postman',
  XGBoost: 'xgboost',
  LangChain: 'langchain',
  LangGraph: 'langgraph',
  Jira: 'jira',
  Confluence: 'confluence',
}

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manalikgawande', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/mkg0908', icon: 'github' },
  { label: 'Email', href: 'mailto:manaligawande8799@gmail.com', icon: 'mail' },
]

const contactItems = [
  { label: 'Email', value: 'manaligawande8799@gmail.com', icon: 'mail' },
  { label: 'Phone', value: '623-628-0501', icon: 'phone' },
  { label: 'Location', value: 'San Francisco Bay Area, CA', icon: 'pin' },
]

const roleTitle = 'Software Development Engineer'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const roleLetter = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const revealIfInView = () => {
      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      if (rect.top <= viewportHeight * 0.92 && rect.bottom >= 0) {
        node.classList.add('is-visible')
        return true
      }

      return false
    }

    if (revealIfInView()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    window.requestAnimationFrame(revealIfInView)

    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="section">
      <Reveal>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}

function TagList({ tags = [] }: { tags?: string[] }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  )
}

function LogoBadge({ src, fallback }: { src?: string; fallback: string }) {
  const [loaded, setLoaded] = useState(Boolean(src))

  return (
    <div className="logo-badge" aria-label={fallback}>
      {src && loaded ? (
        <img src={src} alt={`${fallback} logo`} onError={() => setLoaded(false)} />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  )
}

function SkillIcon({ name }: { name: string }) {
  const [loaded, setLoaded] = useState(Boolean(iconSlugs[name]))
  const slug = iconSlugs[name]

  if (!slug || !loaded) {
    return <span className="skill-fallback" aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt=""
      aria-hidden="true"
      onError={() => setLoaded(false)}
    />
  )
}

function RotatingRole() {
  return (
    <motion.p
      className="rotating-role"
      aria-label={roleTitle}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: 0.14 } } }}
    >
      {roleTitle.split('').map((letter, index) => (
        <motion.span className="role-letter" variants={roleLetter} aria-hidden="true" key={`${letter}-${index}`}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

function Icon({ name }: { name: string }) {
  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.14 2.14 0 0 1 .63-1.34c-2.22-.25-4.56-1.11-4.56-4.95a3.88 3.88 0 0 1 1.03-2.69 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.03a9.47 9.47 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.37.84.41 1.8.1 2.65a3.86 3.86 0 0 1 1.03 2.69c0 3.85-2.34 4.69-4.57 4.94a2.4 2.4 0 0 1 .68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.9H3.75v10.35h3.19V8.9ZM5.35 4a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7Zm5.25 4.9H7.55v10.35h3.18v-5.12c0-1.35.25-2.66 1.93-2.66 1.65 0 1.67 1.55 1.67 2.75v5.03h3.18v-5.68c0-2.79-.6-4.94-3.86-4.94a3.38 3.38 0 0 0-3.05 1.68V8.9Z" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v2.45a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.6 2 2 0 0 1 4.11 1.4h2.45a2 2 0 0 1 2 1.72c.13.98.35 1.95.66 2.88a2 2 0 0 1-.45 2.11L7.73 9.15a16 16 0 0 0 6.12 6.12l1.04-1.04a2 2 0 0 1 2.11-.45c.93.31 1.9.53 2.88.66A2 2 0 0 1 22 16.92Z" />
      </svg>
    )
  }

  if (name === 'pin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function TimelineCard({ item, index }: { item: TimelineEntry; index: number }) {
  return (
    <Reveal className="timeline-card" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
      <div className="timeline-dot" aria-hidden="true" />
      <div className="card-topline">
        <div className="card-identity">
          {item.fallback && <LogoBadge src={item.logo} fallback={item.fallback} />}
          <div>
            <h3>{item.title}</h3>
            <p className="role">{item.subtitle}</p>
          </div>
        </div>
        <p className="meta">{item.meta}</p>
      </div>
      {item.bullets && (
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {item.tags && <TagList tags={item.tags} />}
    </Reveal>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="link-icon">
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </svg>
  )
}

function App() {
  const [profileLoaded, setProfileLoaded] = useState(true)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    if (!isResumeOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isResumeOpen])

  return (
    <main>
      <nav className="topbar nav-only" aria-label="Primary navigation">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h1 variants={fadeUp} transition={{ duration: 0.55 }}>
            <span>Hey there, I&apos;m</span>
            <strong>Manali Gawande</strong>
          </motion.h1>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <RotatingRole />
          </motion.div>
          <motion.p className="hero-text" variants={fadeUp} transition={{ duration: 0.5 }}>
            I&apos;m a Software Engineer with 3 years of experience building software for real workflows - from fintech
            systems and backend APIs to automation, cloud applications and AI tools.
            <br />
            <br />
            I&apos;m looking for Software Developer or Forward Deployed Engineer roles where I can work closely with users,
            understand problems deeply and ship practical software.
          </motion.p>
          <motion.div className="location-badge" variants={fadeUp} transition={{ duration: 0.5 }}>
            <span>Located in San Francisco Bay Area, CA</span>
            <small>Open to relocation across the U.S.</small>
          </motion.div>
          <motion.div className="hero-actions" variants={fadeUp} transition={{ duration: 0.5 }}>
            <button className="button ghost" type="button" onClick={() => setIsResumeOpen(true)}>
              Resume
            </button>
            <a className="button primary" href="#contact">Contact</a>
          </motion.div>
          <motion.div className="social-links" variants={fadeUp} transition={{ duration: 0.5 }}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={link.label}>
                <Icon name={link.icon} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-panel"
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, ease: 'easeOut', delay: 0.16 }}
        >
          <div className="portrait-frame">
            {profileLoaded ? (
              <img
                src="/profile.jpg"
                alt="Manali Gawande profile photo"
                onError={() => setProfileLoaded(false)}
              />
            ) : (
              <div className="portrait-fallback" role="img" aria-label="Manali Gawande profile photo">
                MG
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <Section id="about" title="About Me">
        <div className="about-layout">
          <Reveal className="about-card journey-card">
            <div className="journey-list">
              <p>
                My technical journey began with two years of Computer Science in high school, during which I laid a
                foundation in programming and problem-solving. I then pursued Electrical Engineering at COEP
                Technological University with a Minor in Mathematics (Financial Engineering).
              </p>
              <p>
                My interest in finance and technology led me to Bajaj Finance, one of India&apos;s largest non-banking
                financial companies serving 101.82M+ customers, where I worked as a Software Engineer on fintech
                platforms, backend workflows, API testing, automation, production support and cross-functional delivery.
              </p>
              <p>
                I later moved to the U.S. to pursue my M.S. in Computer Engineering at Arizona State University and
                mentored 470+ students through ASU&apos;s Academic Success Network. That combination of engineering,
                debugging, communication and user-facing problem solving shaped my interest in Software Engineering and
                Forward Deployed Engineering roles.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="experience" title="Work Experience">
        <div className="timeline">
          {experience.map((item, index) => (
            <TimelineCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <div className="timeline education-list">
          {education.map((item, index) => (
            <TimelineCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Section>

      <Section id="certifications" title="Certifications">
        <Reveal className="cert-card">
          <div>
            <h3>Project Management Professional (PMP)</h3>
            <p className="meta">Project Management Institute</p>
          </div>
          <p>Supports ownership, execution and cross-functional delivery in engineering environments.</p>
        </Reveal>
      </Section>

      <Section id="skills" title="Skills">
        <div className="skills-catalog">
          {skillCategories.map((category, categoryIndex) => (
            <Reveal
              className="skill-category"
              key={category.title}
              style={{ '--delay': `${categoryIndex * 60}ms` } as React.CSSProperties}
            >
              <h3>{category.title}</h3>
              <div className="skill-chip-grid">
                {category.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    <SkillIcon name={skill} />
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal
              className="project-card"
              key={project.title}
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
            >
              <div className="project-heading">
                <div>
                  {project.eyebrow && <p className="project-eyebrow">{project.eyebrow}</p>}
                  <h3>{project.title}</h3>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.title} live link`}>
                    <ExternalIcon />
                  </a>
                )}
              </div>
              <p>{project.description}</p>
              <TagList tags={project.tags} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="publication" title="Publication">
        <Reveal className="publication-card">
          <div>
            <h3>Modern approach for hybridization of PSO-INC MPPT methods for efficient solar power tracking</h3>
            <p className="meta">IEEE | Oct 3, 2021</p>
            <p>
              Hybrid MPPT algorithm for improving solar energy extraction with high accuracy and rapid convergence.
            </p>
          </div>
          <a
            className="button ghost"
            href="https://ieeexplore.ieee.org/document/9587833"
            target="_blank"
            rel="noreferrer"
          >
            Read Paper
          </a>
        </Reveal>
      </Section>

      <section id="contact" className="section contact-section">
        <Reveal>
          <p className="section-eyebrow">Contact</p>
          <h2>Get In Touch</h2>
          <p className="contact-subtitle">
            I&apos;m always open to discussing new opportunities, interesting projects and software engineering roles.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info-card">
            <h3>Let&apos;s Connect</h3>
            <p>
              Whether you want to discuss a role, collaboration, project or opportunity, feel free to reach out.
            </p>
            <div className="contact-items">
              {contactItems.map((item) => (
                <div className="contact-item" key={item.label}>
                  <span className="contact-icon">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-location">
              <span>Open to relocation across the U.S.</span>
            </div>
            <div className="social-links contact-socials">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={link.label}>
                  <Icon name={link.icon} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="contact-form-card">
            <form onSubmit={(event) => event.preventDefault()}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your Name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="your.email@example.com" required />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell me about your opportunity..." rows={5} required />
              </label>
              {/* TODO: Integrate Formspree, Resend, EmailJS or an API route for form submission. */}
              <button className="button primary send-button" type="submit">
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {isResumeOpen && (
        <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Resume viewer">
          <div className="resume-modal-backdrop" onClick={() => setIsResumeOpen(false)} />
          <div className="resume-modal-panel">
            <div className="resume-modal-header">
              <h2>Resume</h2>
              <div className="resume-modal-actions">
                <a className="button ghost" href="/Manali_Gawande_Resume.pdf" target="_blank" rel="noreferrer">
                  Open PDF
                </a>
                <button className="button ghost" type="button" onClick={() => setIsResumeOpen(false)}>
                  Close
                </button>
              </div>
            </div>
            <iframe
              className="resume-frame"
              src="/Manali_Gawande_Resume.pdf#toolbar=1&navpanes=0"
              title="Manali Gawande Resume"
            />
          </div>
        </div>
      )}
      <Analytics />
    </main>
  )
}

export default App
