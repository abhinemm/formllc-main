"use client";
import React from "react";
import styles from "./HomePage.module.scss";
import { motion } from "framer-motion";
import FAQSection from "./FAQSection/FAQSection";
import Image from "next/image";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps: any = [
    {
      icon: "/images/icon-company-type.png",
      title: "Choose a Company Type",
      description: "LLC or C-Corp? Align your choice with your goals.",
      step: "Step 1",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="30"
          viewBox="0 0 31 30"
          fill="none"
        >
          <path
            d="M19.25 25V20C19.25 18.6193 18.1307 17.5 16.75 17.5H14.25C12.8693 17.5 11.75 18.6193 11.75 20V25M10.5 5V8.75M10.5 8.75C10.5 10.1307 9.38071 11.25 8 11.25C6.61929 11.25 5.5 10.1307 5.5 8.75M10.5 8.75C10.5 10.1307 11.6193 11.25 13 11.25C14.3807 11.25 15.5 10.1307 15.5 8.75M15.5 5V8.75M15.5 8.75C15.5 10.1307 16.6193 11.25 18 11.25C19.3807 11.25 20.5 10.1307 20.5 8.75M20.5 5V8.75M20.5 8.75C20.5 10.1307 21.6193 11.25 23 11.25C24.3807 11.25 25.5 10.1307 25.5 8.75M5.5 7.5V22.5C5.5 23.8807 6.61929 25 8 25H23C24.3807 25 25.5 23.8807 25.5 22.5V7.5C25.5 6.11929 24.3807 5 23 5H8C6.61929 5 5.5 6.11929 5.5 7.5Z"
            stroke="#622774"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      icon: "/images/icon-state.png",
      title: "Select your company state",
      description: "Delaware or Wyoming? Find your company's best fit.",
      step: "Step 2",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="32"
          viewBox="0 0 31 32"
          fill="none"
        >
          <path
            d="M5.40636 24.8324H18.0241M5.40636 24.8324V8.42931C5.40636 7.03559 6.5362 5.90576 7.92992 5.90576H15.5006C16.8943 5.90576 18.0241 7.03559 18.0241 8.42931V10.9529M5.40636 24.8324H2.88281M18.0241 24.8324V10.9529M18.0241 24.8324H25.5948M18.0241 10.9529H23.0712C24.4649 10.9529 25.5948 12.0827 25.5948 13.4764V24.8324M25.5948 24.8324H28.1183M12.977 12.2146H10.4535M10.4535 17.2617H12.977"
            stroke="#622774"
            strokeWidth="2.52355"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      icon: "/images/icon-form.png",
      title: "Easy Form, Easier Process",
      description: "Just provide the details; Clemta manages the rest.",
      step: "Step 3",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="32"
          viewBox="0 0 31 32"
          fill="none"
        >
          <path
            d="M16.7622 21.0471H25.5947M16.7622 10.9529H25.5947M5.40625 12.2146L7.29891 13.4764L11.0842 8.42932M5.40625 22.3089L7.29891 23.5706L11.0842 18.5235"
            stroke="#622774"
            strokeWidth="2.52355"
            strokeLinecap="square"
          ></path>
        </svg>
      ),
    },
    {
      icon: "/images/icon-documents.png",
      title: "Documents Delivered Fast",
      description: "Claim your formation docs; the journey begins.",
      step: "Step 4",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="32"
          viewBox="0 0 31 32"
          fill="none"
        >
          <path
            d="M5.40636 24.8324H18.0241M5.40636 24.8324V8.42931C5.40636 7.03559 6.5362 5.90576 7.92992 5.90576H15.5006C16.8943 5.90576 18.0241 7.03559 18.0241 8.42931V10.9529M5.40636 24.8324H2.88281M18.0241 24.8324V10.9529M18.0241 24.8324H25.5948M18.0241 10.9529H23.0712C24.4649 10.9529 25.5948 12.0827 25.5948 13.4764V24.8324M25.5948 24.8324H28.1183M12.977 12.2146H10.4535M10.4535 17.2617H12.977"
            stroke="#622774"
            strokeWidth="2.52355"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
    },
  ];

  const features = [
    "Fast, easy, and online",
    "US Bank account with a physical debit card",
    "Registered Agent",
    "Formation and EIN",
    
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
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="30"
          viewBox="0 0 31 30"
          fill="none"
        >
          <path
            d="M19.25 25V20C19.25 18.6193 18.1307 17.5 16.75 17.5H14.25C12.8693 17.5 11.75 18.6193 11.75 20V25M10.5 5V8.75M10.5 8.75C10.5 10.1307 9.38071 11.25 8 11.25C6.61929 11.25 5.5 10.1307 5.5 8.75M10.5 8.75C10.5 10.1307 11.6193 11.25 13 11.25C14.3807 11.25 15.5 10.1307 15.5 8.75M15.5 5V8.75M15.5 8.75C15.5 10.1307 16.6193 11.25 18 11.25C19.3807 11.25 20.5 10.1307 20.5 8.75M20.5 5V8.75M20.5 8.75C20.5 10.1307 21.6193 11.25 23 11.25C24.3807 11.25 25.5 10.1307 25.5 8.75M5.5 7.5V22.5C5.5 23.8807 6.61929 25 8 25H23C24.3807 25 25.5 23.8807 25.5 22.5V7.5C25.5 6.11929 24.3807 5 23 5H8C6.61929 5 5.5 6.11929 5.5 7.5Z"
            stroke="#622774"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
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
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="30"
          viewBox="0 0 31 30"
          fill="none"
        >
          <path
            d="M19.25 25V20C19.25 18.6193 18.1307 17.5 16.75 17.5H14.25C12.8693 17.5 11.75 18.6193 11.75 20V25M10.5 5V8.75M10.5 8.75C10.5 10.1307 9.38071 11.25 8 11.25C6.61929 11.25 5.5 10.1307 5.5 8.75M10.5 8.75C10.5 10.1307 11.6193 11.25 13 11.25C14.3807 11.25 15.5 10.1307 15.5 8.75M15.5 5V8.75M15.5 8.75C15.5 10.1307 16.6193 11.25 18 11.25C19.3807 11.25 20.5 10.1307 20.5 8.75M20.5 5V8.75M20.5 8.75C20.5 10.1307 21.6193 11.25 23 11.25C24.3807 11.25 25.5 10.1307 25.5 8.75M5.5 7.5V22.5C5.5 23.8807 6.61929 25 8 25H23C24.3807 25 25.5 23.8807 25.5 22.5V7.5C25.5 6.11929 24.3807 5 23 5H8C6.61929 5 5.5 6.11929 5.5 7.5Z"
            stroke="#622774"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
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
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M12.2148 17.4001V10.4001M12.2148 10.4001L18.2148 6.90015L12.2148 3.40015V10.4001ZM9.21484 14.5993C5.71927 15.0798 3.21484 16.3762 3.21484 17.9001C3.21484 19.8331 7.24428 21.4001 12.2148 21.4001C17.1854 21.4001 21.2148 19.8331 21.2148 17.9001C21.2148 16.3762 18.7104 15.0798 15.2148 14.5993"
            stroke="#622774"
            strokeWidth="2"
          ></path>
        </svg>
      ),
    },
      {
        title: "Montana",
        icon: "/images/icon-delaware.png",
        points: [
          "Strong asset protection laws",
          "No state sales tax",
          "Cost-effective registration process",
          "Privacy for business owners",
          "Flexible management options",
        ],
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M12.2148 17.4001V10.4001M12.2148 10.4001L18.2148 6.90015L12.2148 3.40015V10.4001ZM9.21484 14.5993C5.71927 15.0798 3.21484 16.3762 3.21484 17.9001C3.21484 19.8331 7.24428 21.4001 12.2148 21.4001C17.1854 21.4001 21.2148 19.8331 21.2148 17.9001C21.2148 16.3762 18.7104 15.0798 15.2148 14.5993"
              stroke="#622774"
              strokeWidth="2"
            ></path>
          </svg>
        ),
      },
  ];

  const featuresSecSix = [
    "Fast, easy, and online LLC & C-Corp formation",
    "US Bank account application and a debit card",
    "EIN application",
  ];
  return (
    <>
      <section className={styles.sectionOne}>
        <div className="container">
          <div className={styles.registrationSection}>
            <div className={styles.content}>
              <p className={styles.subheading}>Company Formation</p>
              <h1 className={styles.heading}>USA Company Registration</h1>
              <p className={styles.description}>
                From anywhere in the world, our complete platform simplifies the
                USA company registration, allowing you to establish your
                business as an LLC in globally recognized states like
                Montana or Wyoming.
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
              {/* <p className={styles.rating}>
            <span>Excellent</span>
            <img src="/images/trustpilot-logo.png" alt="Trustpilot" />
          </p> */}
            </div>
            <div className={styles.mapSection}>
              <div className={styles.map}>
                <Image
                  src="/images/main dash.jpg" // Replace with your image path
                  alt="Description of the image"
                  layout="responsive" // Responsive layout
                  width={16} // Proportional width
                  height={9} // Proportional height
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTwo}>
        <div className="container">
          <div className={styles.processSection}>
            <div className={styles.header}>
              <h2 className={styles.title}>The Process Explained</h2>
              <p className={styles.subtitle}>
                With a team of committed experts, we ensure that your USA
                company registration will be a stress-free experience. We handle
                all the complicated paperwork, while you focus on your business.
              </p>
            </div>
            <div className={styles.steps}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {steps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  className={styles.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <div className={styles.icon}>{step?.svgIcon}</div>
                  <p className={styles.stepNumber}>{step.step}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={styles.registerSection}>
            <div className={styles.header}>
              <h2>Easily Register Your USA Company</h2>
              <p>
                Non-US resident? It doesn’t matter whether you are a resident in
                the US or not. Easily start your non-resident LLC or C-Corp
                today, Clemta is your gateway to the US market!
              </p>
            </div>
            <div className={styles.features}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.feature}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  • {feature}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {/* <div className={styles?.companyStructure}>
            <div className={styles.header}>
              <h2>Deciding on Company Structure</h2>
              <p>
                Choosing between an LLC and C-Corp affects your business’s
                future. Each has unique benefits; understanding them helps align
                your choice with your goals. Determine which’s right for your
                business.
              </p>
            </div>
            <div className={styles.structures}>
              {structures.map((structure, index) => (
                <div key={index} className={styles.structure}>
                  <div className={styles.iconWrapper}>
                    <div className={styles.type}>
                      {structure?.svgIcon}

                      <span>{structure.type}</span>
                    </div>
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
          </div> */}
        </div>
      </section>

      <section>
        <div className="container">
          <div className={styles.wyomingDelawareSection}>
            <div className={styles.header}>
              <h2>Wyoming vs. Delaware: Which to Choose?</h2>
              <p>
                State selection can shape your business. With Wyoming&apos;s
                cost-effectiveness and Delaware&apos;s investor appeal, choose
                wisely to set your business on its path. Assess each
                state&apos;s benefits to find where your company fits best.
              </p>
            </div>
            <div className={styles.cards}>
              {cards.map((card, index) => (
                <div key={index} className={styles.structure}>
                  <div className={styles.iconWrapper}>
                    <div className={styles.type}>
                      {card?.svgIcon}

                      <span>{card.title}</span>
                    </div>
                  </div>
                  <ul>
                    {card.points.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                // <motion.div
                //   key={index}
                //   className={styles.card}
                //   initial={{ opacity: 0, y: 50 }}
                //   whileInView={{ opacity: 1, y: 0 }}
                //   viewport={{ once: true }}
                //   transition={{ duration: 0.5, delay: index * 0.3 }}
                // >
                //   <div className={styles.icon}>
                //     <img src={card.icon} alt={card.title} />
                //     <span>{card.title}</span>
                //   </div>
                //   <ul>
                //     {card.points.map((point, i) => (
                //       <li key={i}>{point}</li>
                //     ))}
                //   </ul>
                // </motion.div>
              ))}
            </div>
            <p className={styles.contact}>
              Can&apos;t decide? Let us help you!{" "}
              <a href="#contact">Contact us</a>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={styles.manageBusinessSection}>
            <div className={styles.content}>
              {/* Text Section */}
              <div className={styles.text}>
                <h2>Easily Manage Your Business with Clemta</h2>
                <p>
                  Start your company, register trademarks, navigate US taxes,
                  streamline accounting, and access banking—all from one
                  platform. Dive into a hassle-free US business experience
                  online wherever you are in the world.
                </p>
                <a href="#get-started" className={styles.button}>
                  Get Started →
                </a>
              </div>

              {/* Features Section */}
              <div className={styles.features}>
                {featuresSecSix.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.feature} ${
                      styles[`animationDelay${index}`]
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                  >
                    • {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
};

export default HomePage;
