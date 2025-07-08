import React from "react";
import styles from "./about.module.scss";

export const metadata = {
  title: "About Us | FormLLC.io",
  description:
    "Learn about FormLLC.io, our mission to simplify U.S. business formation for global entrepreneurs, and why over 10,000 founders trust our services.",
  robots: "index, follow",
  openGraph: {
    title: "About Us | FormLLC.io",
    description:
      "Discover how FormLLC.io helps global entrepreneurs form U.S. LLCs with ease. Trusted by 10,000+ businesses worldwide.",
    url: "https://formllc.io/about-us",
    siteName: "FormLLC.io",
  },
};

const page = () => {
  return (
    <section className="container">
      <div className={styles.aboutUs}>
        <h2 className={styles.title}>About Us</h2>
        <p className={styles.description}>
          FormLLC.io is a hassle-free online platform dedicated to simplifying
          the process of starting a business in the United States. We help
          entrepreneurs worldwide form LLCs and corporations in the USA quickly
          and easily, with expert guidance at every step. Our streamlined
          approach makes company formation reliable, fast, and truly hassle-free
          – a process trusted by thousands of entrepreneurs. As a result, we’ve
          helped launch over 10,000 businesses and counting, earning the trust
          of a growing global community of founders.
        </p>

        <h3 className={styles.subtitle}>Our Mission</h3>
        <p className={styles.description}>
          At FormLLC.io, our mission is to empower entrepreneurs by removing the
          barriers and confusion in business formation. From anywhere in the
          world, our complete platform simplifies U.S. company registration,
          allowing you to establish your business as an LLC in business-friendly
          states like Wyoming or New Mexico with ease. We believe forming a
          company should be an exciting milestone – not a stressful ordeal. Our
          team of experienced professionals handles all the complex paperwork on
          your behalf, ensuring a truly stress-free experience. You can focus on
          growing your business and what you do best, while we take care of the
          legal filings and formalities.
        </p>

        <h3 className={styles.subtitle}>Our Services</h3>
        <ul className={styles.services}>
          <li>LLC & Corporation Formation</li>
          <li>EIN (Tax ID) Acquisition</li>
          <li>Registered Agent Service</li>
          <li>Banking & Address Solutions</li>
          <li>Essential Documentation</li>
          <li>Ongoing Support & Additional Services</li>
        </ul>

        <h3 className={styles.subtitle}>Why Choose FormLLC.io?</h3>
        <ul className={styles.benefits}>
          <li>Expert Guidance</li>
          <li>Fast & Hassle-Free Process</li>
          <li>All-in-One Convenience</li>
          <li>Trusted by Thousands</li>
          <li>Ongoing Support & Growth</li>
        </ul>

        <div className={styles.contact}>
          <h3 className={styles.subtitle}>Get in Touch</h3>
          <p>
            Have questions or need assistance? We’re here to help and would love
            to hear from you.
          </p>
          <p>Address: 30 N GOULD ST STE R, SHERIDAN, WY 82801</p>
          <p>Email: support@formllc.io</p>
          <p>Phone (WhatsApp): +44 7909729519</p>
        </div>
      </div>
    </section>
  );
};

export default page;
