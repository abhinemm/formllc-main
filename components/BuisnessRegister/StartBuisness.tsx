"use client";

import React, { useState } from "react";
import styles from "./StartBusiness.module.scss";

const StartBusinessTabs: React.FC = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs = [
    {
      id: 1,
      title: "Company Type",
      description:
        "Choose your business entity. Unsure? We’ll help you choose.",
      content: (
        <p>
          Choose between <strong>LLC</strong> or <strong>C-corporation</strong>.
          LLC offers flexibility, while C-corp is ideal for external funding.
        </p>
      ),
    },
    {
      id: 2,
      title: "Registration State",
      description: "Select the state for your company registration.",
      content: (
        <p>
          Choose states like <strong>Wyoming</strong> for tax efficiency or{" "}
          <strong>Delaware</strong> for investor appeal.
        </p>
      ),
    },
    {
      id: 3,
      title: "Review and Pay",
      description: "Review your details and proceed with the payment.",
      content: (
        <p>
          Finalize the details and pay to get started with your business
          registration process.
        </p>
      ),
    },
  ];

  return (
    <div className="container">
      <div className={styles.container}>
        {/* Tabs Section */}
        <div className={styles.tabs}>
          <h2 className={styles.heading}>Start your US company in minutes.</h2>
          <ul className={styles.tabsList}>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div
                  className={
                    activeTab === tab.id
                      ? styles.stepNumberActive
                      : styles.stepNumber
                  }
                >
                  {tab.id}
                </div>
                <div>
                  <h3>{tab.title}</h3>
                  <p>{tab.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <h2 className={styles.contentHeading}>{tabs[activeTab - 1].title}</h2>
          <div className={styles.contentDescription}>
            {tabs[activeTab - 1].content}
          </div>
          <button className={styles.continueButton}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default StartBusinessTabs;
