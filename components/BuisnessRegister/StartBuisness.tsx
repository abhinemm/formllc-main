"use client";

import React, { useState } from "react";
import styles from "./StartBusiness.module.scss";
import CompanyType from "./components/CompanyType";
import RegistrationState from "./components/RegistrationState";
import ReviewandPay from "./components/ReviewandPay";

const StartBusinessTabs: React.FC = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<number>(1);

  const [activeTabNumber, setActiveTabNumber] = useState<number>(1);

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
    // <div className="container">
    //   <div className={styles.container}>
    //     {/* Tabs Section */}
    //     <div className={styles.tabs}>
    //       <h2 className={styles.heading}>Start your US company in minutes.</h2>
    //       <ul className={styles.tabsList}>
    //         {tabs.map((tab) => (
    //           <li
    //             key={tab.id}
    //             className={`${styles.tab} ${
    //               activeTab === tab.id ? styles.active : ""
    //             }`}
    //             onClick={() => setActiveTab(tab.id)}
    //           >
    //             <div
    //               className={
    //                 activeTab === tab.id
    //                   ? styles.stepNumberActive
    //                   : styles.stepNumber
    //               }
    //             >
    //               {tab.id}
    //             </div>
    //             <div>
    //               <h3>{tab.title}</h3>
    //               <p>{tab.description}</p>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     {/* Content Section */}
    //     <div className={styles.content}>
    //       <h2 className={styles.contentHeading}>{tabs[activeTab - 1].title}</h2>
    //       <div className={styles.contentDescription}>
    //         {tabs[activeTab - 1].content}
    //       </div>
    //       <button className={styles.continueButton}>Continue</button>
    //     </div>
    //   </div>
    // </div>

    <div className={styles.startBusinessMainWrapper}>
      <div className={styles.contentWrapperMain}>
        <div className={styles.leftContetTabs}>
          <div className={styles.leftHeaderWrapper}>
            <h2> Start your US company in minutes. </h2>
            <p> Answer a few questions to help us form your new company. </p>
          </div>

          <div className={styles.tabListWrapper}>
            <div
              className={styles.tabListItem}
              onClick={() => setActiveTabNumber(1)}
            >
              <div
                className={`${styles.numberWrapper} ${
                  activeTabNumber > 0 ? styles.selectedTab : ""
                }`}
              >
                <div className={styles.Number}>
                  <span>1</span>
                </div>
              </div>
              <div className={styles.itemContentWrapper}>
                <h5>Company Type</h5>
                <p>
                  Choose your business entity. Unsure? We’ll help you choose.
                </p>
              </div>
            </div>
            <div
              className={styles.tabListItem}
              onClick={() => setActiveTabNumber(2)}
            >
              <div
                className={`${styles.numberWrapper} ${
                  activeTabNumber > 1 ? styles.selectedTab : ""
                }`}
              >
                <div className={styles.Number}>
                  <span>2</span>
                </div>
              </div>
              <div className={styles.itemContentWrapper}>
                <h5>Registration State</h5>
              </div>
            </div>
            <div
              className={styles.tabListItem}
              onClick={() => setActiveTabNumber(3)}
            >
              <div
                className={`${styles.numberWrapper} ${
                  activeTabNumber > 2 ? styles.selectedTab : ""
                }`}
              >
                <div className={styles.Number}>
                  <span>3</span>
                </div>
              </div>
              <div className={styles.itemContentWrapper}>
                <h5>Review and pay</h5>
              </div>
            </div>
            <div
              className={styles.tabListItem}
              onClick={() => setActiveTabNumber(4)}
            >
              <div
                className={`${styles.numberWrapper} ${
                  activeTabNumber > 3 ? styles.selectedTab : ""
                }`}
              >
                <div className={styles.Number}>
                  <span>4</span>
                </div>
              </div>
              <div className={styles.itemContentWrapper}>
                <h5>Sign documents</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightContet}>
          <div className={styles.tableDropdownWrapper}>
            {activeTabNumber == 1 && (
              <div className={styles.rightHeaderWrapper}>
                <h1> Company Structure </h1>
                <p> Choose the entity type that's right for your business. </p>
              </div>
            )}
            {activeTabNumber == 2 && (
              <div className={styles.rightHeaderWrapper}>
                <h1> Choose your registration state </h1>
              </div>
            )}

            {activeTabNumber == 3 && (
              <div className={styles.rightHeaderWrapper}>
                <h1>Review and Pay </h1>
                <p> You’re almost done. 🎉 <br/>
                Please review your information and proceed to payment.</p>
              </div>
            )}


            

            {activeTabNumber == 1 && (
              <div className={styles.accordionStyles}>
                <CompanyType />
              </div>
            )}
            {activeTabNumber == 2 && (
              <div className={styles.accordionStyles}>
                <RegistrationState />
              </div>
            )}
            {activeTabNumber == 3 && (
              <div className={styles.accordionStyles}>
                <ReviewandPay />
              </div>
            )}

            <div className={styles.btnWrapper}>
              <button>
                <span>Continue </span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartBusinessTabs;
