import { motion } from "framer-motion";
import { FiStar, FiCalendar } from "react-icons/fi";
import { achievements } from "../data/portfolioData";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

export default function Achievements() {
  return (
    <section
      className="section"
      id="achievements"
      aria-label="Leadership and Achievements"
    >
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Leadership & Service</span>
        <h2 className="section-title">Achievements & Affiliations</h2>
        <p className="section-subtitle">
          Beyond the workplace — a track record of community leadership, youth
          advocacy, and meaningful public service.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="achievements-grid container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {achievements.map((item) => (
          <motion.div
            key={item.id}
            className="achievement-card"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {/* Icon */}
            <div className="achievement-icon" aria-hidden="true">
              <FiStar size={22} />
            </div>

            {/* Role */}
            <h3 className="achievement-role">{item.role}</h3>

            {/* Organization */}
            <p className="achievement-org">{item.organization}</p>

            {/* Duration */}
            <span className="achievement-duration">
              <FiCalendar size={12} />
              {item.duration}
            </span>

            {/* Description */}
            <p className="achievement-desc">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
