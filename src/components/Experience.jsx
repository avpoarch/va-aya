import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import { experience } from "../data/portfolioData";
import {
  fadeInUp,
  staggerContainerSlow,
  viewportOnce,
} from "../utils/motionVariants";

export default function Experience() {
  return (
    <section className="section" id="experience" aria-label="Work Experience">
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Work History</span>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">
          A decade of growth in academic administration, from program support to
          leading institutional registrar operations.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="experience-container"
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="timeline">
          {experience.map((job) => (
            <motion.div
              key={job.id}
              className={`timeline-item${job.type === "current" ? " current" : ""}`}
              variants={fadeInUp}
            >
              {/* Dot */}
              <div className="timeline-dot-col">
                <div className="timeline-dot" aria-hidden="true">
                  <FiBriefcase />
                </div>
              </div>

              {/* Card */}
              <motion.div
                className="timeline-card"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header row */}
                <div className="timeline-header">
                  <h3 className="timeline-role">{job.role}</h3>
                  <span className={`timeline-badge ${job.type}`}>
                    {job.type === "current" ? "● Current" : "Past"}
                  </span>
                </div>

                {/* Meta row */}
                <div className="timeline-meta">
                  <span className="company">{job.company}</span>
                  <span className="divider" aria-hidden="true">
                    |
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <FiMapPin size={12} />
                    {job.location}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <FiCalendar size={12} />
                    {job.duration}
                  </span>
                </div>

                {/* Bullet points */}
                <ul className="timeline-list" role="list">
                  {job.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
