import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from "../utils/motionVariants";

const contactItems = [
  {
    icon: FiMail,
    label: "Email Address",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: FiPhone,
    label: "Phone Number",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: personalInfo.address,
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: Wire up to a backend or email service (e.g., EmailJS, Formspree) here.
    // For now, we show a success message as a UI demonstration.
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section section-alt" id="contact" aria-label="Contact">
      {/* Section Header */}
      <motion.div
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <span className="section-tag">Get in Touch</span>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">
          Have a question or opportunity to discuss? Feel free to reach out —
          I'd love to hear from you.
        </p>
      </motion.div>

      <div className="contact-wrapper container">
        {/* Left: Contact Info */}
        <motion.div
          className="contact-info"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="contact-intro">
            I'm open to professional inquiries, collaborations, and meaningful
            conversations about academic administration, TESDA compliance, or
            public service initiatives. Don't hesitate to reach out.
          </p>

          {contactItems.map(({ icon: Icon, label, value, href }) => (
            <motion.div
              key={label}
              className="contact-card"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="contact-card-icon" aria-hidden="true">
                <Icon size={18} />
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">{label}</span>
                {href ? (
                  <a
                    href={href}
                    className="contact-card-value"
                    style={{ color: "var(--primary)" }}
                  >
                    {value}
                  </a>
                ) : (
                  <span className="contact-card-value">{value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-label="Contact form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "0.85rem 1.2rem",
                background: "var(--primary-bg)",
                border: "1px solid var(--primary)",
                borderRadius: "var(--radius-sm)",
                color: "var(--primary)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              ✓ Message sent! I'll get back to you soon.
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiSend />
              Send Message
            </motion.button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
