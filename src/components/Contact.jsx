import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiMail, FiPhone, FiMapPin, FiSend, FiX } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  viewportOnce,
} from "../utils/motionVariants";

// ── Zod validation schema ───────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  website: z.string().max(0), // honeypot — must stay empty
});

// ── Spam: 5-minute rate limit via localStorage ──────────────
const RATE_LIMIT_KEY = "aya_contact_last";
const RATE_LIMIT_MS = 5 * 60 * 1000;
function isRateLimited() {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  return last && Date.now() - Number(last) < RATE_LIMIT_MS;
}

// ── Static contact items ────────────────────────────────────
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

// ── Animated SVG checkmark ──────────────────────────────────
function CheckmarkAnimation() {
  return (
    <motion.svg
      viewBox="0 0 52 52"
      className="checkmark-svg"
      aria-hidden="true"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      <motion.path
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 27 L22 35 L38 17"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// ── Success dialog ──────────────────────────────────────────
function SuccessDialog({ onClose }) {
  return (
    <motion.div
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <motion.div
        className="success-dialog"
        initial={{ scale: 0.82, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="success-close" onClick={onClose} aria-label="Close">
          <FiX size={18} />
        </button>
        <div className="success-icon-wrap">
          <CheckmarkAnimation />
        </div>
        <h3 id="success-title" className="success-title">
          Message Sent!
        </h3>
        <p className="success-body">
          Thank you for reaching out. You will get your response shortly.
        </p>
        <motion.button
          className="btn-primary"
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Got it
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data) => {
    // Honeypot: silently drop if bot filled the hidden field
    if (data.website) return;

    // Rate limit
    if (isRateLimited()) {
      setServerError(
        "Please wait a few minutes before sending another message.",
      );
      return;
    }

    setServerError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.message || "Submission failed.");

      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      reset();
      setShowSuccess(true);
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section
        className="section section-alt"
        id="contact"
        aria-label="Contact"
      >
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
            onSubmit={handleSubmit(onSubmit)}
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            aria-label="Contact form"
            noValidate
          >
            {/* Honeypot — invisible to real users, traps bots */}
            <input
              type="text"
              tabIndex={-1}
              aria-hidden="true"
              style={{ display: "none" }}
              {...register("website")}
            />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={errors.name ? "input-error" : ""}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="field-error" role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={errors.email ? "input-error" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="field-error" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What is this about?"
                aria-invalid={!!errors.subject}
                className={errors.subject ? "input-error" : ""}
                {...register("subject")}
              />
              {errors.subject && (
                <span className="field-error" role="alert">
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Write your message here..."
                aria-invalid={!!errors.message}
                className={errors.message ? "input-error" : ""}
                {...register("message")}
              />
              {errors.message && (
                <span className="field-error" role="alert">
                  {errors.message.message}
                </span>
              )}
            </div>

            {serverError && (
              <p className="server-error" role="alert">
                {serverError}
              </p>
            )}

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
              disabled={isSubmitting}
            >
              <FiSend />
              {isSubmitting ? "Sending…" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Success dialog */}
      <AnimatePresence>
        {showSuccess && <SuccessDialog onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </>
  );
}
