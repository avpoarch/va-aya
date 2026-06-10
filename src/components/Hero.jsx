import { motion } from "framer-motion";
import { FiBriefcase, FiMail, FiArrowDown } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  fadeIn,
} from "../utils/motionVariants";

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* Decorative background circles */}
      <div className="hero-bg-shape" aria-hidden="true" />
      <div className="hero-bg-shape-2" aria-hidden="true" />

      <div className="hero-container">
        {/* Left: Text Content */}
        <motion.div
          className="hero-content"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting tag */}
          <motion.span className="hero-greeting" variants={fadeIn}>
            👋 Welcome to my portfolio
          </motion.span>

          {/* Name */}
          <motion.h1 className="hero-name" variants={fadeInUp}>
            <span className="">Aya Vanessa</span>
            <br />
            <span className="">O. Roche</span>
          </motion.h1>

          {/* Title */}
          <motion.p className="hero-title" variants={fadeInUp}>
            {personalInfo.title}
          </motion.p>

          {/* Tagline */}
          <motion.p className="hero-tagline" variants={fadeInUp}>
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-actions" variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiMail />
              Get in Touch
            </motion.a>
            <motion.a
              href="#experience"
              className="btn-outline"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#experience");
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiBriefcase />
              View Experience
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          className="hero-image-wrapper"
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="hero-image-ring">
            {/*
              REPLACE PLACEHOLDER:
              Replace the div below with:
              <img src="/images/profile.jpg" alt="Aya Vanessa O. Roche" className="hero-img" />
              Then place the photo at: public/images/profile.jpg
            */}
            {/* <div
              className="hero-img-placeholder"
              role="img"
              aria-label="Profile photo placeholder"
            >
              <span className="initials">AVR</span>
              <span className="placeholder-label">Replace with photo</span>
            </div> */}

            <img
              src="/images/profile.png"
              alt="Aya Vanessa O. Roche"
              className="hero-img"
            />

            {/* Floating badge */}
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="hero-badge-icon">
                <FiBriefcase />
              </div>
              <div className="hero-badge-text">
                <strong>10+ Years</strong>
                <span>Academic Excellence</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="scroll-hint"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3rem",
          color: "var(--text-muted)",
          fontSize: "0.72rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
