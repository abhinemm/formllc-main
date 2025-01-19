"use client";
import React, { useState } from "react";
import styles from "./Faqsection.module.scss";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I form a company if I am not a US citizen or resident?",
      answer:
        "Yes, you can form and manage your US company from anywhere in the world. You do not need to be physically present in the US, even for the bank account application process.",
    },
    {
      question: "What information should I provide to start the process?",
      answer:
        "You'll need basic information such as your company name, type, and details about your business structure.",
    },
    {
      question: "How long does the company formation process take?",
      answer:
        "The company formation process typically takes 3-5 business days in Wyoming and 7-10 business days in Montana, depending on the filing method.",
    },
    {
      question: "Am I required to visit US for company formation?",
      answer:
        "No, you do not need to visit the US to form your company. The process can be completed entirely online.",
    },
    {
      question: "What is a registered agent, and why do I need one?",
      answer:
        "A registered agent is a person or business designated to receive official documents on behalf of your company. It is required for compliance in all states.",
    },
    {
      question: "Will I need an EIN to start my operations?",
      answer:
        "Yes, an Employer Identification Number (EIN) is required to open a US bank account, hire employees, and file taxes.",
    },
    {
      question: "What are the ongoing compliance requirements for my company?",
      answer:
        "You'll need to file annual reports, maintain good standing, and comply with state and federal regulations.",
    },
    {
      question:
        "Can Formllc help me with additional services after company formation?",
      answer:
        "Yes, Formllc offers various services such as bookkeeping, tax filing, and compliance management to support your business.",
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleFAQ = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.header}>
        <h2>Learn All the Essentials</h2>
        <p>
          We gathered all commonly asked questions regarding company formation
          process below:
        </p>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            // initial={{ opacity: 0, y: 50 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.5, delay: index * 0.3 }}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <div className={styles.question} onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className={styles.icon}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={styles.answer}
              style={{
                display: activeIndex === index ? "block" : "none",
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
