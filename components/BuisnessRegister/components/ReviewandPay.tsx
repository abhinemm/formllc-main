import React from "react";
import styles from "../StartBusiness.module.scss";
interface IReviewandPay {
  companyType: string;
  companyLocation: string;
  setActiveTabNumber: any;
  onContinue: any;
  plan: string;
}

const ReviewandPay: React.FC<IReviewandPay> = ({
  companyType,
  companyLocation,
  setActiveTabNumber,
  onContinue,
  plan,
}) => {
  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.reviewListItem}>
        <div className={styles.reviewTitle}>
          <h5>Company Type</h5>
          <p>{companyType}</p>
        </div>
        <div className={styles.reviewIconWrapper}>
          <div onClick={() => setActiveTabNumber(1)}>
            <svg
              data-v-ebc36e23=""
              viewBox="0 0 24 24"
              fill="none"
              height="24"
              width="24"
              aria-label="icon"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25H13.75"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.reviewListItem}>
        <div className={styles.reviewTitle}>
          <h5>Registratin State</h5>
          <p>{companyLocation}</p>
        </div>
        <div className={styles.reviewIconWrapper}>
          <div onClick={() => setActiveTabNumber(2)}>
            <svg
              data-v-ebc36e23=""
              viewBox="0 0 24 24"
              fill="none"
              height="24"
              width="24"
              aria-label="icon"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25H13.75"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.reviewListItem}>
        <div className={styles.reviewTitle}>
          <h5>Plan Selected</h5>
          <p className={styles.textCapitalize}>{plan}</p>
        </div>
        <div className={styles.reviewIconWrapper}>
          <div onClick={() => setActiveTabNumber(3)}>
            <svg
              data-v-ebc36e23=""
              viewBox="0 0 24 24"
              fill="none"
              height="24"
              width="24"
              aria-label="icon"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25H13.75"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button type="button" onClick={onContinue}>
          <span>Continue </span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default ReviewandPay;
