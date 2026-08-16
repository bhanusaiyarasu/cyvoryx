import { useState, useEffect } from 'react';
import { 
  Code, 
  Boxes, 
  Cpu, 
  PenTool, 
  TrendingUp, 
  ArrowUpRight, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  CheckSquare, 
  Users, 
  Award, 
  Calendar,
  Send,
  CheckCircle2,
  Rocket,
  Star
} from 'lucide-react';
import './App.css';

// Custom inline SVG icons for brands (since modern Lucide v0.400+ does not bundle brand icons)
const Linkedin = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Instagram = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Github = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [valuesProgress, setValuesProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };
  
  // Form State
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'services', 'work', 'process', 'blog', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveTab(sectionId);
            break;
          }
        }
      }

      // Calculate timeline scroll progress based on the process steps container itself
      const container = document.querySelector('.process-steps-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Starts growing when the timeline top reaches 70% of screen height
        // Finishes growing when the timeline top reaches 30% of screen height
        const start = windowHeight * 0.70;
        const end = windowHeight * 0.30;
        
        if (rect.top > start) {
          setTimelineProgress(0);
        } else if (rect.top < end) {
          setTimelineProgress(100);
        } else {
          const pct = ((start - rect.top) / (start - end)) * 100;
          setTimelineProgress(Math.min(100, Math.max(0, Math.round(pct))));
        }
      }

      // Calculate values timeline scroll progress based on the values list itself
      const valuesList = document.querySelector('.values-list');
      if (valuesList) {
        const rect = valuesList.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Starts growing when the values top reaches 70% of screen height
        // Finishes growing when the values top reaches 30% of screen height
        const start = windowHeight * 0.70;
        const end = windowHeight * 0.30;
        
        if (rect.top > start) {
          setValuesProgress(0);
        } else if (rect.top < end) {
          setValuesProgress(100);
        } else {
          const pct = ((start - rect.top) / (start - end)) * 100;
          setValuesProgress(Math.min(100, Math.max(0, Math.round(pct))));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  // Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/cyvoryx@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formFields.name,
          Email: formFields.email,
          'Project Type': formFields.projectType || 'General Inquiry',
          Message: formFields.message,
          _subject: `New Portfolio Message from ${formFields.name}`
        })
      });

      const data = await response.json();

      if (data.success === 'true' || response.ok) {
        setSubmitStatus('success');
        setFormFields({
          name: '',
          email: '',
          projectType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="app-container">
      {/* Background Glowing Orbs */}
      <div className="bg-glow-top"></div>
      <div className="bg-glow-middle"></div>
      <div className="bg-glow-bottom"></div>

      {/* Navigation Header */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="logo-container" onClick={(e) => handleScrollTo(e, 'home')}>
          <img src="/brand icon.png" className="logo-img" alt="Cyvoryx Logo" />
          <span className="logo-text">CYVORYX</span>
        </div>

        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#home" className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'home')}>Home</a></li>
            <li><a href="#about" className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'about')}>About</a></li>
            <li><a href="#services" className={`nav-link ${activeTab === 'services' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'services')}>Services</a></li>
            <li><a href="#work" className={`nav-link ${activeTab === 'work' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'work')}>Work</a></li>
            <li><a href="#process" className={`nav-link ${activeTab === 'process' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'process')}>Process</a></li>
            <li><a href="#blog" className={`nav-link ${activeTab === 'blog' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'blog')}>Blog</a></li>
            <li><a href="#contact" className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a></li>
            {mobileMenuOpen && (
              <li>
                <button className="btn-talk" onClick={(e) => handleScrollTo(e, 'contact')}>
                  Let's Talk <ArrowUpRight size={16} />
                </button>
              </li>
            )}
          </ul>
        </nav>

        <button className="btn-talk btn-header-talk" onClick={(e) => handleScrollTo(e, 'contact')}>
          Let's Talk <ArrowUpRight size={16} />
        </button>

        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Desktop Sidebar Socials */}
      <div className="sidebar-social">
        <span className="sidebar-text">CODE. CREATE. ELEVATE.</span>
        <ul className="social-links">
          <li><a href="https://www.linkedin.com/in/bhanusaiyarasu/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn"><Linkedin size={18} /></a></li>
          <li><a href="https://www.instagram.com/cyvoryx" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram"><Instagram size={18} /></a></li>
          <li><a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub"><Github size={18} /></a></li>
          <li><a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="social-icon-link" aria-label="Mail"><Mail size={18} /></a></li>
        </ul>
      </div>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="badge-gradient hero-badge">
              ✦ We Build Digital Experiences
            </div>
            <h1 className="hero-title text-gradient-silver">
              We turn ideas into powerful <span className="text-gradient">digital experiences.</span>
            </h1>
            <p className="hero-desc">
              CYVORYX is a digital studio creating high-performance websites, immersive 3D experiences and intelligent solutions that help businesses stand out and grow.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={(e) => handleScrollTo(e, 'work')}>
                View Our Work <ArrowUpRight size={18} />
              </button>
              <button className="btn-secondary" onClick={(e) => handleScrollTo(e, 'contact')}>
                Let's Work Together <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="hero-visual">
            {/* Custom background graphic is loaded directly via the CSS hero-section background-image */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-grid">
            {/* Left Column */}
            <div className="about-left">
              <div className="about-tag">
                <span className="tag-line-icon">/</span> ABOUT CYVORYX
              </div>
              <h2 className="about-title text-gradient-silver">
                We bridge aesthetics <br />and <span className="text-gradient">technology.</span>
              </h2>
              <div className="about-divider"></div>
              <p className="about-para-highlight">
                We are a futuristic digital studio specializing in premium portfolio designs, interactive immersive products, and data-driven intelligence systems.
              </p>
              <p className="about-para">
                Built on the core ideals of performance, aesthetics, and user conversion, Cyvoryx helps businesses stand out in the crowded web space.
              </p>
              <p className="about-para">
                Every pixel we lay, every micro-interaction we create, and every code snippet we write is meticulously crafted to leave a stunning first impression on your clients and visitors.
              </p>
              
              {/* Stats Grid */}
              <div className="about-stats-grid">
                <div className="about-stat-card">
                  <div className="about-stat-icon"><Boxes size={20} /></div>
                  <span className="about-stat-num">8+</span>
                  <span className="about-stat-label">Projects Completed</span>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-icon"><Users size={20} /></div>
                  <span className="about-stat-num">1+</span>
                  <span className="about-stat-label">Years of Experience</span>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-icon"><Rocket size={20} /></div>
                  <span className="about-stat-num">1</span>
                  <span className="about-stat-label">Client Project Delivered</span>
                </div>
                <div className="about-stat-card">
                  <div className="about-stat-icon"><Star size={20} /></div>
                  <span className="about-stat-num">100%</span>
                  <span className="about-stat-label">Commitment to Quality</span>
                </div>
              </div>

              <button className="about-cta" onClick={(e) => handleScrollTo(e, 'contact')}>
                Let's Build Something Exceptional <ArrowUpRight size={18} />
              </button>
            </div>

            {/* Right Column */}
            <div className="about-right">
              {/* Core Visual with Floating Parallax Logo */}
              <div className="about-image-container">
                <img src="/about_logo_bg.png" className="about-logo-bg" alt="About Logo BG" />
                <div className="about-logo-glow"></div>
                <img 
                  src="/about_logo.png" 
                  className="about-logo-fg" 
                  alt="About Logo FG" 
                />
              </div>

              {/* Our Values */}
              <div className="values-card glass-panel">
                <div className="values-divider-line"></div>
                <h3 className="values-title">Our Values</h3>
                
                <div className="values-list">
                  {/* Vertical Progress Line Track */}
                  <div className="values-track-wrapper">
                    <div 
                      className="values-timeline-progress"
                      style={{ height: `${valuesProgress}%` }}
                    ></div>
                  </div>

                  {/* Value Item 1 */}
                  <div className={`value-item ${valuesProgress >= 0 ? 'active' : ''}`}>
                    <div className="value-icon-wrapper">
                      <div className="value-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                      </div>
                    </div>
                    <div className="value-content">
                      <h4>Pixel-Perfect Aesthetics</h4>
                      <p>Designs that are visually stunning and meticulously crafted.</p>
                    </div>
                  </div>

                  {/* Value Item 2 */}
                  <div className={`value-item ${valuesProgress >= 33 ? 'active' : ''}`}>
                    <div className="value-icon-wrapper">
                      <div className="value-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      </div>
                    </div>
                    <div className="value-content">
                      <h4>Cutting-edge Performance</h4>
                      <p>Fast, optimized, and built for the best user experience.</p>
                    </div>
                  </div>

                  {/* Value Item 3 */}
                  <div className={`value-item ${valuesProgress >= 66 ? 'active' : ''}`}>
                    <div className="value-icon-wrapper">
                      <div className="value-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>
                      </div>
                    </div>
                    <div className="value-content">
                      <h4>AI & Interactive Integration</h4>
                      <p>Smart solutions that blend AI with immersive user interactions.</p>
                    </div>
                  </div>

                  {/* Value Item 4 */}
                  <div className={`value-item ${valuesProgress >= 95 ? 'active' : ''}`}>
                    <div className="value-icon-wrapper">
                      <div className="value-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                      </div>
                    </div>
                    <div className="value-content">
                      <h4>Client Conversion & Satisfaction</h4>
                      <p>Focused on results that drive engagement and business growth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section ("WHAT WE DO") */}
        <section id="services">
          <span className="badge-gradient section-tag">What We Do</span>
          <h2 className="section-title text-gradient-silver">
            Solutions that drive <span className="text-gradient">impact.</span>
          </h2>
          <div className="services-grid">
            {/* Card 1 */}
            <div className="service-card glass-panel">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <Code size={22} />
                </div>
                <h3>Web Development</h3>
                <p>High-performance websites built with modern technologies and clean code.</p>
              </div>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="service-link">
                Learn More <ArrowUpRight size={14} />
              </a>
            </div>
            {/* Card 2 */}
            <div className="service-card glass-panel">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <Boxes size={22} />
                </div>
                <h3>3D & Interactive</h3>
                <p>Immersive 3D and interactive experiences that engage and leave a lasting impact.</p>
              </div>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="service-link">
                Learn More <ArrowUpRight size={14} />
              </a>
            </div>
            {/* Card 3 */}
            <div className="service-card glass-panel">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <Cpu size={22} />
                </div>
                <h3>AI-Powered Solutions</h3>
                <p>Intelligent automation and AI integrations to optimize processes and drive growth.</p>
              </div>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="service-link">
                Learn More <ArrowUpRight size={14} />
              </a>
            </div>
            {/* Card 4 */}
            <div className="service-card glass-panel">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <PenTool size={22} />
                </div>
                <h3>UI/UX Design</h3>
                <p>User-centered designs that are intuitive, beautiful and built for conversions.</p>
              </div>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="service-link">
                Learn More <ArrowUpRight size={14} />
              </a>
            </div>
            {/* Card 5 */}
            <div className="service-card glass-panel">
              <div className="service-card-top">
                <div className="service-icon-box">
                  <TrendingUp size={22} />
                </div>
                <h3>Digital Strategy</h3>
                <p>Digital strategies and solutions that help brands grow and achieve their goals.</p>
              </div>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="service-link">
                Learn More <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section id="work">
          <div className="work-header">
            <div>
              <span className="badge-gradient section-tag">Selected Work</span>
              <h2 className="section-title text-gradient-silver">Crafted with purpose.</h2>
            </div>
            <a href="#work" onClick={(e) => handleScrollTo(e, 'work')} className="work-link-all">
              View All Projects <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card glass-panel" onClick={(e) => handleScrollTo(e, 'contact')}>
              <div className="project-img-container">
                <img src="/nexora_mockup.png" className="project-img" alt="3D Website Mockup" />
                <div className="project-overlay">
                  <h3 className="project-title text-gradient-silver">3D DESIGN WEBSITE</h3>
                  <div className="project-meta">
                    <span className="project-category">3D Interactive • Web Development</span>
                    <div className="project-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Project 2 */}
            <div className="project-card glass-panel" onClick={(e) => handleScrollTo(e, 'contact')}>
              <div className="project-img-container">
                <img src="/lumina_mockup.png" className="project-img" alt="Lumina Studio Mockup" />
                <div className="project-overlay">
                  <h3 className="project-title text-gradient-silver">LUMINA STUDIO</h3>
                  <div className="project-meta">
                    <span className="project-category">Creative Agency • Web Dev • UI/UX</span>
                    <div className="project-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Project 3 */}
            <div className="project-card glass-panel" onClick={(e) => handleScrollTo(e, 'contact')}>
              <div className="project-img-container">
                <img src="/aurora_mockup.png" className="project-img" alt="Aurora Living Mockup" />
                <div className="project-overlay">
                  <h3 className="project-title text-gradient-silver">AURORA LIVING</h3>
                  <div className="project-meta">
                    <span className="project-category">Architecture • Web Development</span>
                    <div className="project-arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Process Section */}
        <section id="process">
          <span className="badge-gradient section-tag">Our Process</span>
          <h2 className="section-title text-gradient-silver">A clear process. Exceptional results.</h2>
          
          <div className="process-steps-container">
            {/* Foreground Scroll-Animated Glowing Line */}
            <div 
              className="process-timeline-progress" 
              style={{ width: `${timelineProgress * 0.8}%` }}
            ></div>

            {/* Step 1 */}
            <div className={`process-step ${timelineProgress >= 0 ? 'active' : ''}`}>
              <div className="process-step-num-box">
                <span className="process-step-num">01</span>
                <div className="process-step-icon"><Users size={28} /></div>
              </div>
              <h3>Discover</h3>
              <p>We understand your goals, audience and requirements.</p>
            </div>
            {/* Step 2 */}
            <div className={`process-step ${timelineProgress >= 25 ? 'active' : ''}`}>
              <div className="process-step-num-box">
                <span className="process-step-num">02</span>
                <div className="process-step-icon"><Calendar size={28} /></div>
              </div>
              <h3>Plan</h3>
              <p>We strategize and plan the best approach for success.</p>
            </div>
            {/* Step 3 */}
            <div className={`process-step ${timelineProgress >= 50 ? 'active' : ''}`}>
              <div className="process-step-num-box">
                <span className="process-step-num">03</span>
                <div className="process-step-icon"><PenTool size={28} /></div>
              </div>
              <h3>Design</h3>
              <p>We create intuitive, modern and engaging designs.</p>
            </div>
            {/* Step 4 */}
            <div className={`process-step ${timelineProgress >= 75 ? 'active' : ''}`}>
              <div className="process-step-num-box">
                <span className="process-step-num">04</span>
                <div className="process-step-icon"><Code size={28} /></div>
              </div>
              <h3>Develop</h3>
              <p>We build fast, scalable and high-performance solutions.</p>
            </div>
            {/* Step 5 */}
            <div className={`process-step ${timelineProgress >= 95 ? 'active' : ''}`}>
              <div className="process-step-num-box">
                <span className="process-step-num">05</span>
                <div className="process-step-icon"><TrendingUp size={28} /></div>
              </div>
              <h3>Deliver</h3>
              <p>We test, optimize and deliver solutions that drive impact.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <div className="stat-icon-wrapper">
                <CheckSquare size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">8+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-icon-wrapper">
                <Clock size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">1+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-icon-wrapper">
                <Code size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em', marginTop: '4px' }}>React • GSAP</span>
                <span className="stat-label">Core Technologies</span>
              </div>
            </div>
            <div className="stat-card glass-panel">
              <div className="stat-icon-wrapper" style={{ color: '#00f2fe', background: 'rgba(0, 242, 254, 0.12)', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
                <CheckCircle2 size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number" style={{ color: '#00f2fe' }}>Available</span>
                <span className="stat-label">Open for Projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog">
          <span className="badge-gradient section-tag">Our Blog</span>
          <h2 className="section-title text-gradient-silver">
            Insights on design & <span className="text-gradient">development.</span>
          </h2>
          <div className="projects-grid">
            {/* Post 1 */}
            <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }} onClick={(e) => handleScrollTo(e, 'contact')}>
              <div style={{ height: '220px', background: 'linear-gradient(135deg, #100f2e 0%, #030208 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-glass)' }}>
                <Code size={48} color="#00f2fe" style={{ opacity: 0.7 }} />
              </div>
              <div style={{ padding: '30px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c084fc', fontWeight: '600' }}>Web Development</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '10px', marginBottom: '15px', lineHeight: '1.3' }}>How we build animations that load under 100ms</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Explore the optimizations and tools we use to maintain pixel-perfect 60fps animations...</p>
              </div>
            </div>
            {/* Post 2 */}
            <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }} onClick={(e) => handleScrollTo(e, 'contact')}>
              <div style={{ height: '220px', background: 'linear-gradient(135deg, #1f0f2e 0%, #030208 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-glass)' }}>
                <PenTool size={48} color="#7c3aed" style={{ opacity: 0.7 }} />
              </div>
              <div style={{ padding: '30px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c084fc', fontWeight: '600' }}>UI/UX Design</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '10px', marginBottom: '15px', lineHeight: '1.3' }}>The evolution of dark mode and micro-interactions</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>An analysis of design trends leading premium SaaS and portfolio websites towards interactive glow...</p>
              </div>
            </div>
            {/* Post 3 */}
            <div className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }} onClick={(e) => handleScrollTo(e, 'contact')}>
              <div style={{ height: '220px', background: 'linear-gradient(135deg, #2e0f20 0%, #030208 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-glass)' }}>
                <Cpu size={48} color="#d946ef" style={{ opacity: 0.7 }} />
              </div>
              <div style={{ padding: '30px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c084fc', fontWeight: '600' }}>Artificial Intelligence</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '10px', marginBottom: '15px', lineHeight: '1.3' }}>AI integrations that actually convert website visitors</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Why simple chat widgets fail and how custom AI automated flows boost brand metrics...</p>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="contact-info">
            <span className="badge-gradient section-tag">Get in Touch</span>
            <h2 className="section-title text-gradient-silver">
              Let's build something <span className="text-gradient">amazing</span> together.
            </h2>
            <p className="contact-desc">
              Have a project in mind or just want to say hello? We'd love to hear from you. Drop us a line and let's craft an unmatched digital presence.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><Mail size={18} /></div>
                <div className="contact-detail-text">
                  <a href="mailto:cyvoryx@gmail.com">cyvoryx@gmail.com</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon"><Clock size={18} /></div>
                <div className="contact-detail-text">
                  Mon - Sat: 10AM - 7PM IST
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form-card glass-panel" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Your Name" 
                    required 
                    value={formFields.name}
                    onChange={(e) => setFormFields({...formFields, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Email Address" 
                    required 
                    value={formFields.email}
                    onChange={(e) => setFormFields({...formFields, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <select 
                  className="form-select" 
                  value={formFields.projectType}
                  onChange={(e) => setFormFields({...formFields, projectType: e.target.value})}
                >
                  <option value="" disabled>Select a Project</option>
                  <option value="Portfolio Website">Portfolio Website</option>
                  <option value="Business Website">Business Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Static Website">Static Website</option>
                  <option value="Dynamic Frontend Website">Dynamic Frontend Website</option>
                  <option value="3D Interactive Website">3D Interactive Website</option>
                  <option value="Personal Brand Website">Personal Brand Website</option>
                  <option value="Startup Website">Startup Website</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Custom Frontend UI">Custom Frontend UI</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  className="form-textarea" 
                  placeholder="Your Message" 
                  required
                  value={formFields.message}
                  onChange={(e) => setFormFields({...formFields, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-submit" 
                disabled={submitStatus === 'submitting'}
              >
                {submitStatus === 'submitting' ? 'Sending Message...' : 'Send Message'} <Send size={16} />
              </button>

              {submitStatus === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '15px', textAlign: 'center' }}>
                  There was an error sending your message. Please try again.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-title">
              <img src="/brand icon.png" className="footer-logo" alt="Cyvoryx Logo" />
              <span className="logo-text">CYVORYX</span>
            </div>
            <span className="footer-tagline">CODE. CREATE. ELEVATE.</span>
            <p className="footer-desc">
              Creating industry-leading digital assets, beautiful UI/UX, and immersive products that convert.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>Services</a></li>
              <li><a href="#work" onClick={(e) => handleScrollTo(e, 'work')}>Work</a></li>
              <li><a href="#process" onClick={(e) => handleScrollTo(e, 'process')}>Process</a></li>
              <li><a href="#blog" onClick={(e) => handleScrollTo(e, 'blog')}>Blog</a></li>
              <li><a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>Web Development</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>3D & Interactive</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>AI-Powered Solutions</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>UI/UX Design</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')}>Digital Strategy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Let's Connect</h4>
            <div className="footer-social-row" style={{ marginBottom: '20px' }}>
              <a href="https://www.linkedin.com/in/bhanusaiyarasu/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="https://www.instagram.com/cyvoryx" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub"><Github size={16} /></a>
              <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="footer-social-btn" aria-label="Mail"><Mail size={16} /></a>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Work Hours:<br />Mon - Sat: 10AM - 7PM IST
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">© 2026 CYVORYX. All rights reserved.</span>
          <span className="copyright" style={{ fontSize: '0.85rem' }}>
            Founder & Developer: <a href="https://bhanusai3dportfolio.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue)', fontWeight: '600', letterSpacing: '0.05em', textDecoration: 'none' }}>Bhanu Sai Yarasu</a>
          </span>
          <span className="copyright" style={{ fontSize: '0.8rem', opacity: '0.5' }}>Designed & Engineered with Pride.</span>
        </div>
      </footer>

      {/* Success Modal */}
      {submitStatus === 'success' && (
        <div className="modal-overlay">
          <div className="modal-card glass-panel">
            <div className="modal-icon-wrapper">
              <CheckCircle2 size={36} />
            </div>
            <h3>Message Sent!</h3>
            <p>
              Your inquiry has been successfully sent to <strong>cyvoryx@gmail.com</strong>. We will get back to you shortly.
            </p>
            <button className="btn-modal-close" onClick={() => setSubmitStatus('idle')}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
