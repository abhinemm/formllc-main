"use client";

import React, { useState } from "react";
import styles from "./StartBusiness.module.scss";
import CompanyType from "./components/CompanyType";
import RegistrationState from "./components/RegistrationState";
import ReviewandPay from "./components/ReviewandPay";
import CreateAccount from "../CreateAccount/CreateAccount";

const StartBusinessTabs: React.FC = () => {
  const [activeTabNumber, setActiveTabNumber] = useState<number>(1);
  const [companyType, setCompanyType] = useState<any>();

  return (
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
                <p>
                  {" "}
                  Choose the entity type that&apos;s right for your business.{" "}
                </p>
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
                <p>
                  {" "}
                  You’re almost done. 🎉 <br />
                  Please review your information and proceed to payment.
                </p>
              </div>
            )}
            {activeTabNumber == 4 && (
              <div className={styles.rightHeaderWrapper}>
                <h1>Create an account </h1>
                <p>
                  {" "}
                  Already have an account? <a>sign in</a>
                </p>
              </div>
            )}

            {activeTabNumber == 1 && (
              <div className={styles.accordionStyles}>
                <CompanyType
                  companyType={companyType}
                  setCompanyType={setCompanyType}
                />
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
            {activeTabNumber == 4 && (
              <div className={styles.accordionStyles}>
                <CreateAccount />
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
