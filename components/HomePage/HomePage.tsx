"use client";
import React from "react";
import styles from "./HomePage.module.scss";
import { motion } from "framer-motion";
import FAQSection from "./FAQSection/FAQSection";

const HomePage = () => {
  const steps = [
    {
      icon: "/images/icon-company-type.png",
      title: "Choose a Company Type",
      description: "LLC or C-Corp? Align your choice with your goals.",
      step: "Step 1",
    },
    {
      icon: "/images/icon-state.png",
      title: "Select your company state",
      description: "Delaware or Wyoming? Find your company's best fit.",
      step: "Step 2",
    },
    {
      icon: "/images/icon-form.png",
      title: "Easy Form, Easier Process",
      description: "Just provide the details; Clemta manages the rest.",
      step: "Step 3",
    },
    {
      icon: "/images/icon-documents.png",
      title: "Documents Delivered Fast",
      description: "Claim your formation docs; the journey begins.",
      step: "Step 4",
    },
  ];

  const features = [
    "Fast, easy, and online LLC & C-Corp formation",
    "US Bank account with a physical debit card",
    "Registered Agent",
    "Formation and EIN",
    "US phone number",
    "Company's initial legal documentation",
    "US business address with mail forwarding",
  ];

  const structures = [
    {
      type: "LLC",
      icon: "/images/icon-llc.png",
      title: "Limited Liability Company",
      description: [
        "Flexible management and taxation",
        "Straightforward with less bureaucracy",
        "Great for small businesses, e-com sellers and freelancers",
      ],
    },
    {
      type: "C-CORP",
      icon: "/images/icon-c-corp.png",
      title: "C Corporation",
      description: [
        "Ready to access to venture capitals",
        "Potential for initial public offering",
        "Great for fundraising startups and complex company structures",
      ],
    },
  ];

  const cards = [
    {
      title: "Wyoming",
      icon: "/images/icon-wyoming.png",
      points: [
        "Quick company setup",
        "Flexible Management with Fewer Formalities",
        "Low Maintenance Costs",
        "No Franchise Tax",
        "No Personal or Corporate Income Tax",
      ],
    },
    {
      title: "Delaware",
      icon: "/images/icon-delaware.png",
      points: [
        "Investor Confidence (startup hub all around the world)",
        "Flexible Corporate Structure",
        "Established, entrepreneur-friendly legal landscape",
        "Privacy Protection",
        "No sales tax",
      ],
    },
  ];

  const featuresSecSix = [
    "Fast, easy, and online LLC & C-Corp formation",
    "US Bank account application and a debit card",
    "EIN & ITIN application",
  ];
  return (
    <>
      <section className={styles.registrationSection}>
        <div className={styles.content}>
          <p className={styles.subheading}>Company Formation</p>
          <h1 className={styles.heading}>USA Company Registration</h1>
          <p className={styles.description}>
            From anywhere in the world, our complete platform simplifies the USA
            company registration, allowing you to establish your business as an
            LLC or C-Corp in globally recognized states like Delaware or
            Wyoming.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="#get-started"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Get Started →
            </a>
            <a
              href="#contact-us"
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              Contact us
            </a>
          </div>
          <p className={styles.rating}>
            <span>Excellent</span>
            <img src="/images/trustpilot-logo.png" alt="Trustpilot" />
          </p>
        </div>
        <div className={styles.mapSection}>
          <div className={styles.map}>
            <img
              src="/images/map-placeholder.png"
              alt="USA Map"
              className={styles.mapImage}
            />
            <div
              className={styles.location}
              style={{ top: "20%", left: "30%" }}
            >
              <img src="/images/flag-wyoming.png" alt="Wyoming Flag" />
              <span>138 N David St Casper, WY</span>
            </div>
            <div
              className={styles.location}
              style={{ top: "40%", left: "50%" }}
            >
              <img src="/images/flag-delaware.png" alt="Delaware Flag" />
              <span>49 Wilmington Ave, DE</span>
            </div>
            <div
              className={styles.location}
              style={{ top: "60%", left: "20%" }}
            >
              <img src="/images/flag-texas.png" alt="Texas Flag" />
              <span>Rough Rider Dr, TX</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Process Explained</h2>
          <p className={styles.subtitle}>
            With a team of committed experts, we ensure that your USA company
            registration will be a stress-free experience. We handle all the
            complicated paperwork, while you focus on your business.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.icon}>
                <img src={step.icon} alt={step.title} />
              </div>
              <p className={styles.stepNumber}>{step.step}</p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.registerSection}>
        <div className={styles.header}>
          <h2>Easily Register Your USA Company</h2>
          <p>
            Non-US resident? It doesn’t matter whether you are a resident in the
            US or not. Easily start your non-resident LLC or C-Corp today,
            Clemta is your gateway to the US market!
          </p>
        </div>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              • {feature}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.companyStructure}>
        <div className={styles.header}>
          <h2>Deciding on Company Structure</h2>
          <p>
            Choosing between an LLC and C-Corp affects your business’s future.
            Each has unique benefits; understanding them helps align your choice
            with your goals. Determine which’s right for your business.
          </p>
        </div>
        <div className={styles.structures}>
          {structures.map((structure, index) => (
            <div key={index} className={styles.structure}>
              <div className={styles.type}>
                <img src={structure.icon} alt={structure.type} />
                <span>{structure.type}</span>
              </div>
              <h3>{structure.title}</h3>
              <ul>
                {structure.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.contact}>
          Can’t decide? Let us help you! <a href="#contact">Contact us</a>
        </p>
      </section>

      <section className={styles.wyomingDelawareSection}>
        <div className={styles.header}>
          <h2>Wyoming vs. Delaware: Which to Choose?</h2>
          <p>
            State selection can shape your business. With Wyoming&apos;s
            cost-effectiveness and Delaware&apos;s investor appeal, choose
            wisely to set your business on its path. Assess each state&apos;s
            benefits to find where your company fits best.
          </p>
        </div>
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <div className={styles.icon}>
                <img src={card.icon} alt={card.title} />
                <span>{card.title}</span>
              </div>
              <ul>
                {card.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className={styles.contact}>
          Can&apos;t decide? Let us help you! <a href="#contact">Contact us</a>
        </p>
      </section>

      <section className={styles.manageBusinessSection}>
        <div className={styles.content}>
          {/* Text Section */}
          <div className={styles.text}>
            <h2>Easily Manage Your Business with Clemta</h2>
            <p>
              Start your company, register trademarks, navigate US taxes,
              streamline accounting, and access banking—all from one platform.
              Dive into a hassle-free US business experience online wherever you
              are in the world.
            </p>
            <a href="#get-started" className={styles.button}>
              Get Started →
            </a>
          </div>

          {/* Features Section */}
          <div className={styles.features}>
            {featuresSecSix.map((feature, index) => (
              <div
                key={index}
                className={`${styles.feature} ${
                  styles[`animationDelay${index}`]
                }`}
              >
                • {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default HomePage;
