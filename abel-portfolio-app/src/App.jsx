import { useEffect, useRef, useState, useCallback } from "react";
import { Mail, Github, Linkedin, ExternalLink, Menu, X, Phone } from "lucide-react";

const NAV_ITEMS = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  { title: "Programming languages", tags: ["Java", "Python"] },
  { title: "Web technologies", tags: ["HTML", "CSS"] },
  { title: "Databases", tags: ["MySQL"] },
  { title: "Core CS", tags: ["Data Structures", "Algorithms"] },
  { title: "Tools & platforms", tags: ["Git", "GitHub", "VS Code"] },
  { title: "Domain knowledge", tags: ["Machine Learning", "Computer Vision", "Data Visualization", "Data Analytics"] },
];

const EXPERIENCE = [
  {
    date: "Jun 2025 — Jul 2026",
    role: "Deep Learning Intern",
    org: "Trios Technology",
    bullets: [
      "Worked on deep learning models for data-driven applications",
      "Assisted in training and evaluating models using real-world datasets",
      "Gained practical exposure to neural networks and model optimization techniques",
    ],
  },
  {
    date: "Dec 2025 — Jan 2026",
    role: "AI Intern",
    org: "F5 Coders",
    bullets: [
      "Learned and applied core AI concepts to real-world scenarios",
      "Contributed to basic model development and problem-solving tasks",
      "Strengthened skills in machine learning workflows and data handling",
    ],
  },
];

const PROJECTS = [
  {
    title: "Attendance Management System",
    sub: "Web application",
    bullets: [
      "Developed an automated system to track and manage student attendance digitally",
      "Reduced manual errors and improved efficiency through real-time data storage and reporting",
      "Implemented user authentication and secure record management",
    ],
  },
  {
    title: "Object Detection Using Machine Learning",
    sub: "Computer vision",
    bullets: [
      "Built a machine learning model to detect and classify objects in images and video streams",
      "Applied computer vision techniques to achieve accurate, real-time detection",
      "Improved model performance through data preprocessing, training, and evaluation",
    ],
  },
  {
    title: "LMS — Learning Management System",
    sub: "Academic project · MERN stack",
    bullets: [
      "Developed and designed a full-fledged LMS using the MERN stack",
      "Automated manual college workflows with a digital system",
    ],
  },
];

const EDUCATION = [
  { date: "2023 — 2027", role: "B.Tech, Artificial Intelligence and Data Science", org: "Nandha Engineering College · CGPA 7.5 (V Semester)" },
  { date: "2022 — 2023", role: "Higher Secondary Education (12th)", org: "Ideal Matric Higher Secondary School" },
  { date: "2020 — 2021", role: "Secondary Education (10th)", org: "Ideal Matric Higher Secondary School" },
];

const CERTIFICATIONS = [
  { name: "KRIYA 2026 Technical Workshop", issuer: "PSG College of Technology, Coimbatore" },
  { name: "Introduction to Data Analytics", issuer: "IBM · Coursera" },
  { name: "Artificial Intelligence on Microsoft Azure", issuer: "Coursera" },
];

const LINKS = {
  email: "abelshaji103@gmail.com",
  phone: "9345857873",
  linkedin: "https://www.linkedin.com/in/abel-shaji-392803294?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  leetcode: "https://leetcode.com/u/abel_shaji/",
  github: "https://github.com/abelshaji10",
};

const SKILL_LABELS = ["Machine Learning", "Computer Vision", "Data Analytics", "Python", "Java", "MySQL", "Git", "DSA"];

// ---------- Reveal-on-scroll wrapper ----------
function Reveal({ children, as: Tag = "div", className = "", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {children}
    </Tag>
  );
}

// ---------- Hero neural graph canvas ----------
function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, dpr;
    let nodes = [];
    let core = { x: 0, y: 0 };
    let mouse = { x: -9999, y: -9999 };
    let raf;

    function layout() {
      const isMobile = W < 720;
      core.x = isMobile ? W * 0.5 : W * 0.72;
      core.y = isMobile ? H * 0.28 : H * 0.5;
      const radius = Math.min(W, H) * 0.34;
      nodes = SKILL_LABELS.map((label, i) => {
        const angle = (i / SKILL_LABELS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          label,
          baseX: core.x + Math.cos(angle) * radius,
          baseY: core.y + Math.sin(angle) * radius,
          x: core.x + Math.cos(angle) * radius,
          y: core.y + Math.sin(angle) * radius,
          phase: Math.random() * Math.PI * 2,
          r: 3.4,
        };
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.parentElement.offsetWidth;
      H = canvas.parentElement.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach((n) => {
        const pulse = 0.14 + 0.1 * Math.sin(t / 900 + n.phase);
        const grad = ctx.createLinearGradient(core.x, core.y, n.x, n.y);
        grad.addColorStop(0, "rgba(22,19,10,0.55)");
        grad.addColorStop(1, "rgba(22,19,10,0)");
        ctx.strokeStyle = grad;
        ctx.globalAlpha = pulse + 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      });

      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "rgba(22,19,10,0.5)";
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i], b = nodes[(i + 1) % nodes.length];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const coreGlow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 26);
      coreGlow.addColorStop(0, "rgba(22,19,10,0.28)");
      coreGlow.addColorStop(1, "rgba(22,19,10,0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FDFBCF";
      ctx.beginPath();
      ctx.arc(core.x, core.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#16130A";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.font = '11px "IBM Plex Mono", monospace';
      nodes.forEach((n) => {
        const distm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const hovered = distm < 46;

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, hovered ? 15 : 9);
        glow.addColorStop(0, hovered ? "rgba(184,134,11,0.55)" : "rgba(22,19,10,0.22)");
        glow.addColorStop(1, "rgba(22,19,10,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, hovered ? 15 : 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = hovered ? "#B8860B" : "#16130A";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = hovered ? "#16130A" : "rgba(22,19,10,0.6)";
        const dir = n.x < core.x ? -1 : 1;
        ctx.textAlign = dir === 1 ? "left" : "right";
        ctx.fillText(n.label, n.x + dir * 14, n.y + 4);
      });
    }

    function animate(t) {
      nodes.forEach((n) => {
        if (!prefersReduced) {
          n.x = n.baseX + Math.sin(t / 2200 + n.phase) * 6;
          n.y = n.baseY + Math.cos(t / 2600 + n.phase) * 6;
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = ((140 - dist) / 140) * 8;
            n.x += (dx / dist) * force * 0.06;
            n.y += (dy / dist) * force * 0.06;
          }
        }
      });
      draw(t);
      if (!prefersReduced) raf = requestAnimationFrame(animate);
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);

    if (prefersReduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

export default function AbelShajiPortfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [openProjects, setOpenProjects] = useState({});
  const sectionRefs = useRef({});

  // Load fonts once
  useEffect(() => {
    if (document.getElementById("asj-fonts")) return;
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    const fontLink = document.createElement("link");
    fontLink.id = "asj-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.append(preconnect1, preconnect2, fontLink);
  }, []);

  // Scroll shadow on nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking
  useEffect(() => {
    const targets = Object.values(sectionRefs.current).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const registerSection = useCallback((id) => (el) => {
    sectionRefs.current[id] = el;
  }, []);

  const toggleProject = (i) => setOpenProjects((p) => ({ ...p, [i]: !p[i] }));

  const goTo = (id) => (e) => {
    e.preventDefault();
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ---- token palette (kept as JS constants so every color below traces back here) ----
  const c = {
    pageA: "#FDFBCF", // cream
    pageB: "#FDEB9E", // vanilla
    ink: "#16130A",
    inkMuted: "#5B4B1E",
    surface: "rgba(22,19,10,0.055)",
    border: "rgba(22,19,10,0.18)",
    accent2: "#B8860B",
  };
  const fontDisplay = "'Space Grotesk', sans-serif";
  const fontBody = "'IBM Plex Sans', sans-serif";
  const fontMono = "'IBM Plex Mono', monospace";

  const btnBase = {
    fontFamily: fontMono,
    fontSize: "0.82rem",
    letterSpacing: "0.04em",
    padding: "13px 22px",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    border: `1px solid ${c.border}`,
    transition: "transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease",
  };
  const btnPrimary = { ...btnBase, background: c.ink, color: c.pageA, borderColor: c.ink, fontWeight: 600 };
  const btnGhost = { ...btnBase, background: "transparent", color: c.ink };

  return (
    <div style={{ fontFamily: fontBody, color: c.ink, background: c.pageA, lineHeight: 1.6, overflowX: "hidden" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
        .asj-nav-link:hover, .asj-nav-link:focus-visible { color: ${c.ink} !important; background: ${c.surface}; }
        .asj-nav-link.active { color: ${c.ink} !important; font-weight: 600; text-decoration: underline; text-decoration-color: ${c.accent2}; text-underline-offset: 4px; }
        .asj-skill-card:hover { border-color: ${c.ink} !important; transform: translateY(-3px); }
        .asj-project-card:hover { border-color: ${c.ink} !important; transform: translateY(-4px); }
        .asj-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(22,19,10,0.28); }
        .asj-btn-ghost:hover { border-color: ${c.ink} !important; color: ${c.ink} !important; transform: translateY(-2px); }
        .asj-contact-link:hover { color: ${c.ink} !important; border-bottom-color: ${c.ink} !important; }
        a:focus-visible, button:focus-visible, .asj-project-card:focus-visible { outline: 2px solid ${c.ink}; outline-offset: 3px; }
        ::selection { background: ${c.ink}; color: ${c.pageA}; }
        @keyframes asj-pulse-line { 0%, 100% { opacity: .25; } 50% { opacity: .85; } }
        @media (max-width: 840px) {
          .asj-desktop-links { display: none !important; }
          .asj-nav-toggle { display: flex !important; }
        }
        @media (min-width: 841px) {
          .asj-mobile-links { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 32px",
          background: scrolled ? "rgba(253,251,207,0.94)" : "rgba(253,251,207,0.55)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled ? `1px solid ${c.border}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.ink }} />
          Abel Shaji
        </div>

        <nav className="asj-desktop-links" style={{ display: "flex", gap: 2 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={goTo(item.id)}
              className={`asj-nav-link${active === item.id ? " active" : ""}`}
              style={{
                fontFamily: fontMono, fontSize: "0.78rem", textTransform: "uppercase",
                letterSpacing: "0.08em", color: c.inkMuted, padding: "10px 14px", borderRadius: 6,
                transition: "color .2s ease, background .2s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="asj-nav-toggle"
          onClick={() => setNavOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          style={{
            display: "none", background: "none", border: `1px solid ${c.border}`, color: c.ink,
            width: 40, height: 40, borderRadius: 8, cursor: "pointer", alignItems: "center", justifyContent: "center",
          }}
        >
          {navOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {navOpen && (
        <nav
          className="asj-mobile-links"
          style={{
            position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
            display: "flex", flexDirection: "column",
            background: "rgba(253,251,207,0.98)", borderBottom: `1px solid ${c.border}`,
            padding: "8px 16px 20px",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={goTo(item.id)}
              style={{
                fontFamily: fontMono, fontSize: "0.78rem", textTransform: "uppercase",
                letterSpacing: "0.08em", color: c.inkMuted, padding: "14px 8px",
                borderBottom: `1px solid ${c.border}`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      {/* HERO */}
      <section
        id="hero"
        ref={registerSection("hero")}
        style={{
          position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
          paddingTop: 80, overflow: "hidden", background: c.pageA,
        }}
      >
        <NeuralCanvas />
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <span style={{
            fontFamily: fontMono, color: c.inkMuted, fontSize: "0.82rem", letterSpacing: "0.14em",
            textTransform: "uppercase", marginBottom: 18, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 26, height: 1, background: c.ink, display: "inline-block" }} />
            Machine Learning Engineer, in progress
          </span>
          <h1 style={{
            fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
            lineHeight: 1.02, letterSpacing: "-0.01em", maxWidth: "14ch", color: c.ink, margin: 0,
          }}>
            Abel Shaji
          </h1>
          <p style={{ fontFamily: fontDisplay, fontSize: "clamp(1.1rem,2.4vw,1.5rem)", color: c.inkMuted, marginTop: 14, fontWeight: 500 }}>
            B.Tech, Artificial Intelligence &amp; Data Science
          </p>
          <p style={{ maxWidth: 560, color: c.inkMuted, marginTop: 22, fontSize: "1rem" }}>
            Building expertise in deep learning and applied AI through hands-on internships. Comfortable across the ML
            pipeline — from data preprocessing and model training to evaluation — with additional grounding in web
            technologies and database management.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <a href="#projects" onClick={goTo("projects")} className="asj-btn-primary" style={btnPrimary}>View projects</a>
            <a href="#contact" onClick={goTo("contact")} className="asj-btn-ghost" style={btnGhost}>Get in touch</a>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 44, flexWrap: "wrap", fontFamily: fontMono, fontSize: "0.78rem", color: c.inkMuted }}>
            <a href={`tel:${LINKS.phone}`} className="asj-contact-link" style={{ borderBottom: "1px solid transparent", transition: "border-color .2s, color .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Phone size={13} /> {LINKS.phone}
            </a>
            <a href={`mailto:${LINKS.email}`} className="asj-contact-link" style={{ borderBottom: "1px solid transparent", transition: "border-color .2s, color .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Mail size={13} /> {LINKS.email}
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="asj-contact-link" style={{ borderBottom: "1px solid transparent", transition: "border-color .2s, color .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Linkedin size={13} /> LinkedIn
            </a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="asj-contact-link" style={{ borderBottom: "1px solid transparent", transition: "border-color .2s, color .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ExternalLink size={13} /> LeetCode
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="asj-contact-link" style={{ borderBottom: "1px solid transparent", transition: "border-color .2s, color .2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Github size={13} /> GitHub
            </a>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 34, left: 32, zIndex: 2,
          fontFamily: fontMono, fontSize: "0.72rem", color: c.inkMuted,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 1, height: 34, background: `linear-gradient(${c.ink}, transparent)`, animation: "asj-pulse-line 2s ease-in-out infinite" }} />
          Scroll
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={registerSection("skills")} style={{ padding: "120px 0", background: c.pageB }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: fontMono, color: c.inkMuted, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              Stack
            </span>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, maxWidth: "16ch", color: c.ink, margin: 0 }}>
              What I build with
            </h2>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="asj-skill-card" style={{
                background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
                padding: "22px 22px 20px", transition: "border-color .2s ease, transform .2s ease",
              }}>
                <h3 style={{ fontFamily: fontMono, fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: c.inkMuted, marginBottom: 14 }}>
                  {g.title}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: fontMono, fontSize: "0.78rem", padding: "6px 12px", borderRadius: 20,
                      background: "rgba(22,19,10,0.08)", color: c.ink, border: "1px solid rgba(22,19,10,0.22)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" ref={registerSection("experience")} style={{ padding: "120px 0", background: c.pageA }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: fontMono, color: c.inkMuted, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              Track record
            </span>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, maxWidth: "16ch", color: c.ink, margin: 0 }}>
              Internship experience
            </h2>
          </Reveal>
          <Reveal style={{ position: "relative", paddingLeft: 28 }}>
            <span style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: `linear-gradient(${c.ink}, transparent 90%)` }} />
            {EXPERIENCE.map((item, i) => (
              <div key={item.role} style={{ position: "relative", paddingBottom: i === EXPERIENCE.length - 1 ? 0 : 44 }}>
                <span style={{ position: "absolute", left: -28, top: 5, width: 11, height: 11, borderRadius: "50%", background: c.pageA, border: `2px solid ${c.ink}` }} />
                <span style={{ fontFamily: fontMono, fontSize: "0.76rem", color: c.accent2, letterSpacing: "0.04em", marginBottom: 6, display: "block", fontWeight: 600 }}>
                  {item.date}
                </span>
                <h3 style={{ fontFamily: fontDisplay, fontSize: "1.2rem", fontWeight: 600, color: c.ink, marginBottom: 4 }}>{item.role}</h3>
                <p style={{ color: c.inkMuted, fontSize: "0.92rem", marginBottom: 12 }}>{item.org}</p>
                <ul style={{ paddingLeft: 18, color: c.inkMuted, fontSize: "0.94rem" }}>
                  {item.bullets.map((b) => <li key={b} style={{ marginBottom: 6 }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={registerSection("projects")} style={{ padding: "120px 0", background: c.pageB }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: fontMono, color: c.inkMuted, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              Selected work
            </span>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, maxWidth: "16ch", color: c.ink, margin: 0 }}>
              Projects
            </h2>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => {
              const open = !!openProjects[i];
              return (
                <div
                  key={p.title}
                  tabIndex={0}
                  role="button"
                  aria-expanded={open}
                  onClick={() => toggleProject(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleProject(i); } }}
                  className="asj-project-card"
                  style={{
                    background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
                    padding: 26, cursor: "pointer", transition: "border-color .2s ease, transform .2s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <div>
                      <div style={{ fontFamily: fontDisplay, fontSize: "1.15rem", fontWeight: 600, color: c.ink }}>{p.title}</div>
                      <div style={{ fontFamily: fontMono, fontSize: "0.74rem", color: c.inkMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 6 }}>{p.sub}</div>
                    </div>
                    <span style={{
                      fontFamily: fontMono, fontSize: "1.1rem", color: c.accent2, flexShrink: 0,
                      transition: "transform .25s ease", transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    }}>
                      +
                    </span>
                  </div>
                  <div style={{ maxHeight: open ? 280 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <ul style={{ padding: "18px 0 0 18px", color: c.inkMuted, fontSize: "0.92rem" }}>
                      {p.bullets.map((b) => <li key={b} style={{ marginBottom: 8 }}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" ref={registerSection("education")} style={{ padding: "120px 0", background: c.pageA }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: fontMono, color: c.inkMuted, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              Foundation
            </span>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, maxWidth: "16ch", color: c.ink, margin: 0 }}>
              Education
            </h2>
          </Reveal>
          <Reveal style={{ position: "relative", paddingLeft: 28 }}>
            <span style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: `linear-gradient(${c.ink}, transparent 90%)` }} />
            {EDUCATION.map((item, i) => (
              <div key={item.role} style={{ position: "relative", paddingBottom: i === EDUCATION.length - 1 ? 0 : 44 }}>
                <span style={{ position: "absolute", left: -28, top: 5, width: 11, height: 11, borderRadius: "50%", background: c.pageA, border: `2px solid ${c.ink}` }} />
                <span style={{ fontFamily: fontMono, fontSize: "0.76rem", color: c.accent2, letterSpacing: "0.04em", marginBottom: 6, display: "block", fontWeight: 600 }}>
                  {item.date}
                </span>
                <h3 style={{ fontFamily: fontDisplay, fontSize: "1.2rem", fontWeight: 600, color: c.ink, marginBottom: 4 }}>{item.role}</h3>
                <p style={{ color: c.inkMuted, fontSize: "0.92rem" }}>{item.org}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" ref={registerSection("certifications")} style={{ padding: "120px 0", background: c.pageB }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <span style={{ fontFamily: fontMono, color: c.inkMuted, fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              Ongoing learning
            </span>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 600, maxWidth: "16ch", color: c.ink, margin: 0 }}>
              Certifications &amp; achievements
            </h2>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} style={{
                background: c.surface, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.accent2}`,
                borderRadius: 10, padding: "18px 20px",
              }}>
                <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: "0.98rem", marginBottom: 4, color: c.ink }}>{cert.name}</div>
                <div style={{ fontFamily: fontMono, fontSize: "0.78rem", color: c.inkMuted }}>{cert.issuer}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" ref={registerSection("contact")} style={{
        padding: "100px 0 50px", borderTop: `1px solid ${c.border}`, textAlign: "center",
        background: c.ink, color: c.pageA,
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <Reveal as="h2" style={{ fontFamily: fontDisplay, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, marginBottom: 18, color: c.pageA }}>
            Let&apos;s talk
          </Reveal>
          <Reveal as="p" style={{ color: "rgba(253,251,207,0.72)", maxWidth: 460, margin: "0 auto 32px" }}>
            Open to machine learning engineering roles and internships. Reach out directly — I reply fastest by email.
          </Reveal>
          <Reveal style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap", marginBottom: 60 }}>
            <a href={`mailto:${LINKS.email}`} className="asj-btn-primary" style={{ ...btnBase, background: c.pageB, color: c.ink, borderColor: c.pageB, fontWeight: 600 }}>
              <Mail size={15} /> Email me
            </a>
            <a href={`tel:${LINKS.phone}`} className="asj-btn-ghost" style={{ ...btnBase, background: "transparent", color: c.pageA, borderColor: "rgba(253,251,207,0.35)" }}>
              <Phone size={15} /> {LINKS.phone}
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="asj-btn-ghost" style={{ ...btnBase, background: "transparent", color: c.pageA, borderColor: "rgba(253,251,207,0.35)" }}>
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="asj-btn-ghost" style={{ ...btnBase, background: "transparent", color: c.pageA, borderColor: "rgba(253,251,207,0.35)" }}>
              <ExternalLink size={15} /> LeetCode
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="asj-btn-ghost" style={{ ...btnBase, background: "transparent", color: c.pageA, borderColor: "rgba(253,251,207,0.35)" }}>
              <Github size={15} /> GitHub
            </a>
          </Reveal>
          <div style={{
            fontFamily: fontMono, fontSize: "0.74rem", color: "rgba(253,251,207,0.55)",
            display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          }}>
            <span>© 2026 Abel Shaji</span>
            <span>Built to move fast, read clean, and load light.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
