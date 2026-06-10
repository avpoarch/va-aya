import { motion } from "framer-motion";
import { FiAward, FiCalendar } from "react-icons/fi";
import { certifications } from "../data/portfolioData";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

export default function Certifications() {
  return (
    <section
      className="section"
      id="certifications"
      aria-label="Certifications and Trainings"
    >
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Professional Development</span>
        <h2 className="section-title">Certifications & Trainings</h2>
        <p className="section-subtitle">
          Ongoing commitment to professional growth through TESDA-accredited
          programs, technical workshops, and industry assemblies.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="cert-grid container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            className="cert-card"
            variants={fadeInUp}
            whileHover={{ y: -4, boxShadow: "var(--shadow-hover)" }}
            transition={{ duration: 0.25 }}
          >
            {/* Icon */}
            <div className="cert-icon" aria-hidden="true">
              <FiAward size={20} />
            </div>

            {/* Info */}
            <div className="cert-info">
              <p className="cert-name">{cert.name}</p>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">
                <FiCalendar size={11} />
                {cert.date}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
