import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { personalInfo, stats } from "../data/portfolioData";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

export default function About() {
  return (
    <section className="section section-alt" id="about" aria-label="About">
      <div className="about-grid container">
        {/* Left: Image */}
        <motion.div
          className="about-image-col"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="about-img-frame">
            {/*
              REPLACE PLACEHOLDER:
              Replace the div below with:
              <img src="/images/about.jpg" alt="Aya Vanessa O. Roche" className="about-img" />
              Then place the photo at: public/images/about.jpg
            */}
            <div
              className="about-img-placeholder"
              role="img"
              aria-label="About photo placeholder"
            >
              <div className="icon-wrap">
                <FiUser size={32} />
              </div>
              <p>Replace with photo</p>
            </div>
          </div>
          {/* Decorative border accent */}
          <div className="about-img-accent" aria-hidden="true" />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="about-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Section tag */}
          <motion.div variants={fadeInUp}>
            <span className="section-tag">About Me</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="section-title"
            style={{ textAlign: "left", marginBottom: 0 }}
            variants={fadeInUp}
          >
            Dedicated to Academic{" "}
            <span style={{ color: "var(--primary)" }}>Excellence</span>
          </motion.h2>

          {/* Lead paragraph */}
          <motion.p className="about-lead" variants={fadeInUp}>
            A passionate administrator committed to{" "}
            <em>student success, accuracy, and compliance</em> — empowering
            institutions through reliable records management.
          </motion.p>

          {/* Body paragraph */}
          <motion.p className="about-body" variants={fadeInUp}>
            {personalInfo.summary}
          </motion.p>

          {/* Stats grid */}
          <motion.div className="about-stats" variants={staggerContainer}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="about-stat-card"
                variants={fadeInUp}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
