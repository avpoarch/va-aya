import { motion } from "framer-motion";
import { FiBriefcase, FiClipboard, FiUsers, FiEdit } from "react-icons/fi";
import { skills } from "../data/portfolioData";
import {
  fadeInUp,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

// Map icon string names to actual components
const iconMap = {
  FaBriefcase: FiBriefcase,
  FaClipboardCheck: FiClipboard,
  FaUsers: FiUsers,
  FaPen: FiEdit,
};

export default function Skills() {
  return (
    <section className="section section-alt" id="skills" aria-label="Skills">
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Core Competencies</span>
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          A versatile skill set spanning academic administration, regulatory
          compliance, leadership, and professional communication.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="skills-container container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {skills.map((group) => {
          const IconComponent = iconMap[group.icon] || FiBriefcase;
          return (
            <motion.div
              key={group.id}
              className="skill-group"
              variants={fadeInUp}
            >
              {/* Group Icon */}
              <div className="skill-group-icon" aria-hidden="true">
                <IconComponent size={22} />
              </div>

              {/* Group Title */}
              <h3 className="skill-group-title">{group.category}</h3>

              {/* Tags */}
              <div className="skill-tags">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.18 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
