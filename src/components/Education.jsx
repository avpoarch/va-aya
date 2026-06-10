import { motion } from "framer-motion";
import { FiBook, FiMapPin, FiCalendar, FiAward } from "react-icons/fi";
import { education } from "../data/portfolioData";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

export default function Education() {
  return (
    <section
      className="section section-alt"
      id="education"
      aria-label="Education"
    >
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Academic Background</span>
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">
          A solid foundation in information technology and education, built with
          dedication and recognized academic achievement.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="education-grid container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            className="education-card"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {/* Icon */}
            <div className="edu-icon-wrap" aria-hidden="true">
              <FiBook size={22} />
            </div>

            {/* Degree */}
            <h3 className="edu-degree">{edu.degree}</h3>

            {/* Institution */}
            <p className="edu-institution">{edu.institution}</p>

            {/* Meta */}
            <div className="edu-meta">
              <span className="edu-location">
                <FiMapPin size={12} />
                {edu.location}
              </span>
              <span className="edu-duration">
                <FiCalendar size={12} />
                {edu.duration}
              </span>
            </div>

            {/* Honor badge */}
            {edu.honor && (
              <span className="edu-honor">
                <FiAward size={12} />
                {edu.honor}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
