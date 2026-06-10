import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Scroll-to-top button */}
      <motion.button
        className="scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <FiArrowUp size={18} />
      </motion.button>

      {/* Footer */}
      <footer className="footer" aria-label="Site footer">
        <div className="footer-container">
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                Aya <span className="accent">Vanessa</span> O. Roche
              </div>
              <p>
                Institute Registrar & TESDA Coordinator with over a decade of
                dedication to academic excellence and student success in Lanao
                del Norte.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <p className="footer-col-title">Navigation</p>
              <ul className="footer-links" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <span
                      className="footer-link"
                      role="button"
                      tabIndex={0}
                      onClick={() => scrollToSection(link.href)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && scrollToSection(link.href)
                      }
                    >
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <p className="footer-col-title">Contact</p>
              <ul className="footer-contact-list" role="list">
                <li>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="footer-contact-item"
                    style={{ textDecoration: "none" }}
                  >
                    <FiMail size={14} />
                    {personalInfo.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="footer-contact-item"
                    style={{ textDecoration: "none" }}
                  >
                    <FiPhone size={14} />
                    {personalInfo.phone}
                  </a>
                </li>
                <li className="footer-contact-item">
                  <FiMapPin size={14} />
                  <span>{personalInfo.address}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {year} Aya Vanessa O. Roche. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <span
                role="button"
                tabIndex={0}
                onClick={scrollToTop}
                onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
                style={{
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  color: "rgba(232,228,220,0.4)",
                }}
              >
                Back to top ↑
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
