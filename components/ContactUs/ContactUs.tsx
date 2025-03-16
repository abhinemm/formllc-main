"use client";
import React from "react";
import styles from "./ContactUs.module.scss";
import ContactForm from "./Form/ContactForm";
import { useRouter } from "next/navigation";

const ContactUsComponent: React.FC = () => {
  const router = useRouter();

  const onRedirect = (url) => {
    router.push(url);
  };
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          Start Your Business <span>in the USA</span> Today
        </h1>
        <p className={styles.heroSubtext}>
          Join thousands of entrepreneurs who trust us to establish their
          businesses in the USA. Reliable, fast, and hassle-free registration
          process.
        </p>
        <button
          type="button"
          onClick={() => onRedirect("/start-buisness")}
          className={styles.ctaButton}
        >
          Get Started
        </button>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <h2 className={styles.sectionHeading}>Contact Us</h2>
        <p className={styles.sectionSubtext}>
          Have any questions? Fill out the form below, and our team will get
          back to you shortly.
        </p>
        <div className={styles.formCard}>
          <ContactForm />
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className={styles.trustSection}>
        <h2 className={styles.sectionHeading}>Why Trust Us?</h2>
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <span>🌟</span>
            <h3>Expert Support</h3>
            <p>
              Our professionals guide you through every step of business
              registration.
            </p>
          </div>
          <div className={styles.trustCard}>
            <span>🚀</span>
            <h3>Fast Process</h3>
            <p>Streamlined steps to get your company registered in no time.</p>
          </div>
          <div className={styles.trustCard}>
            <span>✅</span>
            <h3>Trusted by Thousands</h3>
            <p>Over 10,000 businesses registered with us successfully.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsComponent;
