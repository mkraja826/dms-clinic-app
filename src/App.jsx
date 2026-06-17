import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import {
  clinic,
  equipmentHighlights,
  gallery,
  reviewThemes,
  services,
  testimonials,
} from "./data/clinic.js";
import { loginToDms, submitAppointment } from "./lib/dmsApi.js";

function Tooth({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7.4 3.2c1.25-.45 2.6.08 3.55.86.62.5 1.48.5 2.1 0 .95-.78 2.3-1.31 3.55-.86 2.15.78 3.14 3.36 2.35 6.12-.54 1.9-1.5 3.08-2.14 4.85-.52 1.42-.67 3.24-1.1 4.75-.32 1.12-.94 2.08-1.96 2.08-.92 0-1.28-.82-1.56-1.95-.26-1.05-.48-2.47-1.19-2.47s-.93 1.42-1.19 2.47C9.53 20.18 9.17 21 8.25 21c-1.02 0-1.64-.96-1.96-2.08-.43-1.51-.58-3.33-1.1-4.75-.64-1.77-1.6-2.95-2.14-4.85-.79-2.76.2-5.34 2.35-6.12Z" />
      <path d="M9.2 5.4c.8.65 1.75.95 2.8.95s2-.3 2.8-.95" />
    </svg>
  );
}

function LogoMark({ className = "logo-mark", showText = true }) {
  return (
    <span className={className}>
      <img className="background-color=red" src="/bg-reddy-icon.png" alt="BG Reddy Dental Clinic logo" />
      {showText && (
        <span className="logo-copy">
          <strong>Sri B.G Reddy</strong>
          <small>Dental Clinic</small>
        </span>
      )}
    </span>
  );
}

const navItems = [
  ["About", "about"],
  ["Services", "services"],
  ["Equipment", "equipment"],
  ["Gallery", "gallery"],
  ["Reviews", "reviews"],
  ["Book", "appointment"],
];

const quickStats = [
  { value: clinic.rating, label: "Google Rating" },
  { value: clinic.reviewsCount, label: "Google Reviews" },
  { value: "RCT", label: "Trusted Treatment" },
  { value: "Quality", label: "No Compromise" },
];

function Stars({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} star review`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} size={16} fill="currentColor" />
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [activeImage, setActiveImage] = useState(null);

  const scrollToSection = (id) => {
    setCurrentPage("home");
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="app-shell">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrollToSection={scrollToSection}
      />

      {currentPage === "login" ? (
        <LoginPage setCurrentPage={setCurrentPage} />
      ) : (
        <main>
          <Hero scrollToSection={scrollToSection} setCurrentPage={setCurrentPage} />
          <TrustBar />
          <About />
          <Services />
          <Equipment />
          <Gallery setActiveImage={setActiveImage} />
          <Reviews />
          <Appointment />
          <Contact />
        </main>
      )}

      <Footer scrollToSection={scrollToSection} setCurrentPage={setCurrentPage} />
      {activeImage && <GalleryModal item={activeImage} onClose={() => setActiveImage(null)} />}
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, currentPage, setCurrentPage, scrollToSection }) {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <button className="brand brand-with-real-logo" onClick={() => setCurrentPage("home")} aria-label="Go to home">
          <LogoMark />
        </button>

        <nav className={menuOpen ? "nav-menu open" : "nav-menu"}>
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="login-pill" onClick={() => setCurrentPage("login")}>
            <LockKeyhole size={16} />
            Clinic Login
          </button>
          <a className="call-pill" href={`tel:${clinic.phone}`}>
            <Phone size={16} />
            Call
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ scrollToSection, setCurrentPage }) {
  return (
    <section className="hero-section" id="home">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <BadgeCheck size={17} />
            {clinic.rating} Google Rating • {clinic.reviewsCount} Reviews
          </div>
          <h1>
            A premium dental clinic experience in <span>Gandimaisamma</span>.
          </h1>
          <p className="hero-subtitle">
            {clinic.name} is led by {clinic.doctor}, combining patient-friendly treatment with a visible quality-first clinic setup, modern equipment, clear explanations, and trusted RCT, capping and extraction care.
          </p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={() => scrollToSection("appointment")}>
              <CalendarCheck size={19} />
              Book Appointment
            </button>
            <button className="secondary-button" onClick={() => setCurrentPage("login")}>
              <LockKeyhole size={18} />
              Clinic Login
            </button>
          </div>

          <div className="hero-address-card">
            <MapPin size={22} />
            <div>
              <strong>{clinic.shortLocation}</strong>
              <span>{clinic.address}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual enterprise-visual">
          <div className="brand-showcase-card">
            <div className="showcase-topline">
              <span className="live-dot" />
              Premium Clinic Website
            </div>
            <div className="showcase-logo-stage">
              <img className="border-radius=30" src="/bg-reddy-icon.png" alt="BG Reddy Dental Clinic icon" />
            </div>
            <div className="showcase-title">
              <span>BG Reddy Dental Clinic</span>
              <strong>Quality-first dental care</strong>
            </div>
            <div className="hero-metric-grid enterprise-metrics">
              {quickStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="floating-card appointment-mini-card">
            <CalendarCheck size={24} />
            <div>
              <strong>Appointment ready</strong>
              <small>Website booking flow prepared for DMS connection.</small>
            </div>
          </div>

          <div className="floating-card quality-mini-card">
            <ShieldCheck size={28} />
            <div>
              <strong>Equipment showcase</strong>
              <small>Built to highlight advanced clinic investment.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trust-strip">
      <div className="container trust-grid">
        {reviewThemes.slice(0, 4).map((theme, index) => (
          <div key={theme} className="trust-item">
            {[Tooth, ShieldCheck, HeartPulse, Sparkles][index] &&
              React.createElement([Tooth, ShieldCheck, HeartPulse, Sparkles][index], { size: 22 })}
            <span>{theme}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-grid">
        <div>
          <p className="section-label">About the Clinic</p>
          <h2>A premium clinical brand built around trust, equipment and quality.</h2>
          <p className="section-text">
            {clinic.name} is positioned as a modern, patient-friendly dental clinic with strong local trust. The website highlights what matters most to patients: a doctor who explains clearly, treatment that feels comfortable, reasonable pricing, and visible clinic quality.
          </p>
          <p className="section-text">
            The website is designed to present the clinic like a premium healthcare brand: clean white-blue identity, strong equipment visibility, review-backed trust, and a smooth patient appointment journey.
          </p>
          <div className="about-actions">
            <a href={clinic.mapsUrl} target="_blank" rel="noreferrer" className="text-link">
              Open Google Maps <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="quality-card-stack">
          <div className="quality-card large">
            <Microscope size={34} />
            <strong>Modern treatment focus</strong>
            <p>Modern equipment, sterilization workflow, treatment rooms and premium clinical infrastructure support quality-focused care.</p>
          </div>
          <div className="quality-card split-card">
            <div>
              <Activity size={28} />
              <strong>Clinical care</strong>
            </div>
            <div>
              <UsersRound size={28} />
              <strong>Family trust</strong>
            </div>
          </div>
          <div className="quality-card large pale">
            <Syringe size={34} />
            <strong>Comfort-first care</strong>
            <p>Patients repeatedly mention patience, painless treatment and good explanation in reviews.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section service-section">
      <div className="container">
        <SectionHead
          label="Dental Services"
          title="Complete dental care with a premium clinic experience."
          text="Comprehensive dental services with special focus on RCT, capping, extraction, comfort, affordability and clear doctor guidance."
        />

        <div className="services-grid">
          {services.map((service, index) => {
            const icons = [Tooth, Sparkles, ShieldCheck, UserRound, HeartPulse, CheckCircle2];
            const Icon = icons[index] || Tooth;
            return (
              <article className="service-card" key={service.title}>
                <div className="service-top">
                  <span className="service-icon"><Icon size={26} /></span>
                  <span className="service-short">{service.short}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}>
                  Book for this <ChevronRight size={16} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Equipment() {
  return (
    <section id="equipment" className="section equipment-section">
      <div className="container equipment-grid">
        <div className="equipment-visual-card">
          <img src="/gallery/equipment.svg" alt="Dental equipment showcase" />
          <div className="equipment-badge">
            <ShieldCheck size={24} />
            <span>Quality-first clinic setup</span>
          </div>
        </div>

        <div>
          <p className="section-label">Equipment & Quality</p>
          <h2>Advanced clinic infrastructure patients can trust.</h2>
          <p className="section-text">
            The clinic has invested strongly in treatment equipment, sterilization standards, instruments, imaging support and comfortable operatory setup. Every part of the clinic is planned to support safe, precise and quality-focused dental care.
          </p>

          <div className="equipment-list">
            {equipmentHighlights.map((item) => (
              <div key={item.title}>
                <CheckCircle2 size={22} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ setActiveImage }) {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <SectionHead
          label="Clinic Gallery"
          title="Inside the clinic: clean, modern and quality-focused."
          text="Explore the clinic environment, reception, treatment area, equipment setup, sterilization workflow and smile-care experience."
        />

        <div className="gallery-grid">
          {gallery.map((item) => (
            <button className="gallery-card" key={item.title} onClick={() => setActiveImage(item)}>
              <img src={item.image} alt={item.title} />
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <div className="gallery-hover">
                <Camera size={24} />
                View
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <SectionHead
          label="Google Review Summary"
          title="Patients highlight patience, affordability and comfortable treatment."
          text="Patient feedback highlights trust, RCT, capping, painless extraction, good staff, neat clinic standards and reasonable pricing."
        />

        <div className="review-stats">
          <div>
            <strong>{clinic.rating}</strong>
            <span>Google Rating</span>
          </div>
          <div>
            <strong>{clinic.reviewsCount}</strong>
            <span>Google Reviews</span>
          </div>
          <div>
            <strong>5★</strong>
            <span>Many recent experiences</span>
          </div>
        </div>

        <div className="theme-cloud">
          {reviewThemes.map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </div>

        <div className="testimonials-grid">
          {testimonials.map((review) => (
            <article className="testimonial-card" key={review.name}>
              <Stars count={review.rating} />
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
              <span>Google Review</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Appointment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    treatment: "Root Canal Treatment",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setMessage("Please enter patient name and phone number.");
      return;
    }

    await submitAppointment(form);
    setMessage("Thank you. Your appointment request has been received. Our clinic team will contact you shortly to confirm the slot.");
    setForm({
      name: "",
      phone: "",
      treatment: "Root Canal Treatment",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
  };

  return (
    <section id="appointment" className="section appointment-section">
      <div className="container appointment-grid">
        <div>
          <p className="section-label light">Book Appointment</p>
          <h2>Book your dental appointment with ease.</h2>
          <p>
            Share your details and preferred time. The clinic team will review your request and contact you to confirm the appointment.
          </p>
          <div className="appointment-flow">
            <div><span>1</span> Patient submits request</div>
            <div><span>2</span> Reception confirms slot</div>
            <div><span>3</span> Doctor prepares treatment plan</div>
          </div>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-row two">
            <label>
              Patient Name
              <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Enter full name" />
            </label>
            <label>
              Phone Number
              <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Enter mobile number" />
            </label>
          </div>

          <label>
            Treatment Needed
            <select value={form.treatment} onChange={(e) => updateField("treatment", e.target.value)}>
              {services.map((service) => <option key={service.title}>{service.title}</option>)}
              <option>General Dental Checkup</option>
              <option>Emergency Dental Pain</option>
            </select>
          </label>

          <div className="form-row two">
            <label>
              Preferred Date
              <input type="date" value={form.preferredDate} onChange={(e) => updateField("preferredDate", e.target.value)} />
            </label>
            <label>
              Preferred Time
              <input type="time" value={form.preferredTime} onChange={(e) => updateField("preferredTime", e.target.value)} />
            </label>
          </div>

          <label>
            Notes
            <textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Tooth pain, RCT follow-up, cap issue, cleaning, etc." />
          </label>

          <button className="submit-button" type="submit">
            Submit Appointment Request <ArrowRight size={18} />
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-card">
        <div>
          <p className="section-label light">Visit the Clinic</p>
          <h2>Call before visiting to confirm availability.</h2>
          <p>{clinic.address}</p>
        </div>
        <div className="contact-actions">
          <a href={`tel:${clinic.phone}`} className="white-button"><Phone size={18} /> Call Clinic</a>
          <a href={clinic.mapsUrl} target="_blank" rel="noreferrer" className="outline-white-button"><MapPin size={18} /> Directions</a>
        </div>
      </div>
    </section>
  );
}

function LoginPage({ setCurrentPage }) {
  const [role, setRole] = useState("Doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const roleCards = useMemo(
    () => [
      { title: "Doctor", text: "View queue, patient notes, prescriptions and treatment plans." },
      { title: "Reception", text: "Register patients, collect OP fee, medication fee and manage appointments." },
      { title: "Head", text: "Track revenue, patients, visits, staff and clinic performance." },
    ],
    []
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await loginToDms({ ...form, role });
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="login-page">
      <div className="login-bg-orb one" />
      <div className="login-bg-orb two" />
      <div className="container login-grid">
        <section className="login-copy">
          <button className="back-button" onClick={() => setCurrentPage("home")}>
            ← Back to Website
          </button>
          <p className="section-label">Clinic Login</p>
          <h1>Secure clinic staff portal.</h1>
          <p>
            Authorized clinic staff can access role-based workflows for doctor, reception and head-office operations.
          </p>

          <div className="login-role-grid">
            {roleCards.map((card) => (
              <button
                key={card.title}
                className={role === card.title ? "role-card active" : "role-card"}
                onClick={() => setRole(card.title)}
                type="button"
              >
                <strong>{card.title}</strong>
                <span>{card.text}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="login-panel">
          <div className="login-panel-head">
            <LogoMark className="login-logo-mini" showText={false} />
            <div>
              <strong>{clinic.name}</strong>
              <span>{role} Login</span>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <label>
              Email / Mobile
              <input
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                placeholder="doctor@clinic.com"
              />
            </label>
            <label>
              Password
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            <button className="submit-button" type="submit">
              Continue to {role} Dashboard <ArrowRight size={18} />
            </button>
          </form>

          {message && <p className="form-message login-message">{message}</p>}

          <div className="dms-note">
            <LockKeyhole size={18} />
            <span>Secure access for authorized clinic staff only.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function GalleryModal({ item, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <button className="modal-close" onClick={onClose}><X /></button>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={item.title} />
        <div>
          <span>{item.category}</span>
          <h3>{item.title}</h3>
          <p>A closer look at the clinic’s quality-focused environment.</p>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ label, title, text }) {
  return (
    <div className="section-head">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Footer({ scrollToSection, setCurrentPage }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <LogoMark className="footer-logo" />
          <p>{clinic.tagline}</p>
        </div>
        <div>
          <span>Quick Links</span>
          <button onClick={() => scrollToSection("appointment")}>Book Appointment</button>
          <button onClick={() => setCurrentPage("login")}>Clinic Login</button>
          <button onClick={() => scrollToSection("gallery")}>Gallery</button>
        </div>
        <div>
          <span>Contact</span>
          <p>{clinic.phone}</p>
          <p>{clinic.shortLocation}</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
