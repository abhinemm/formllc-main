import React from "react";

import styles from "./pricingComponent.module.scss";

const ProSvg = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.8613 9.36335L10.7302 9.59849C10.5862 9.85677 10.5142 9.98591 10.402 10.0711C10.2897 10.1563 10.1499 10.188 9.87035 10.2512L9.61581 10.3088C8.63195 10.5314 8.14001 10.6427 8.02297 11.0191C7.90593 11.3955 8.2413 11.7876 8.91204 12.572L9.08557 12.7749C9.27617 12.9978 9.37147 13.1092 9.41435 13.2471C9.45722 13.385 9.44281 13.5336 9.41399 13.831L9.38776 14.1018C9.28635 15.1482 9.23565 15.6715 9.54206 15.9041C9.84847 16.1367 10.3091 15.9246 11.2303 15.5005L11.4686 15.3907C11.7304 15.2702 11.8613 15.2099 12 15.2099C12.1387 15.2099 12.2696 15.2702 12.5314 15.3907L12.7697 15.5005C13.6909 15.9246 14.1515 16.1367 14.4579 15.9041C14.7644 15.6715 14.7136 15.1482 14.6122 14.1018L14.586 13.831C14.5572 13.5336 14.5428 13.385 14.5857 13.2471C14.6285 13.1092 14.7238 12.9978 14.9144 12.7749L15.088 12.572C15.7587 11.7876 16.0941 11.3955 15.977 11.0191C15.86 10.6427 15.3681 10.5314 14.3842 10.3088L14.1296 10.2512C13.8501 10.188 13.7103 10.1563 13.598 10.0711C13.4858 9.98592 13.4138 9.85678 13.2698 9.5985L13.1387 9.36335C12.6321 8.45445 12.3787 8 12 8C11.6213 8 11.3679 8.45446 10.8613 9.36335Z"
          fill="#f97316"
        ></path>{" "}
      </g>
    </svg>
  );
};

const PricingCards = () => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.mainCradWrapper}>
        <div className={styles.outerWrapper}>
          <div className={styles.cardTopLine}></div>

          <div className={styles.CardHead}>
            <h4>Basic</h4>
            {/* <h6>Most popular</h6> */}
          </div>

          <div className={styles.description}>
            <p>Get Started: Register Your Business in Montana</p>
          </div>
          <div className={styles.priceWrapper}>
            <div>
              <h2>
                $199{" "}
                <span>
                  /One Time Fee
                  <br />
                </span>
              </h2>
            </div>

            {/* <div>
              <h6>
                <span>Billed yearly ($1,068)</span>
              </h6>
            </div> */}
          </div>

          <button>Get Started</button>

          <div className={styles.serviceList}>
            <h6>Everything in </h6>
            <ul>
              <li>Company formation in Montana</li>
              <li>Expedited Tax ID (EIN) setup</li>
              <li>Register buisness with 7-10 days</li>
              <li>
                Open a business bank account with one of our banking partners
              </li>
              <li>All essential and important documents</li>
              <li>
                All essential and important documents - e.g. stock purchase
                agreement, bylaws, etc
              </li>
              <li>Lifetime expert support</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.mainCradWrapper}>
        <div className={styles.outerWrapper}>
          <div className={styles.cardTopLine}></div>

          <div className={styles.CardHead}>
            <h4>
              {" "}
              <ProSvg /> Pro
            </h4>
            <h6>Most popular</h6>
          </div>

          <div className={styles.description}>
            <p>Get Started: Register Your Business in Wyoming</p>
          </div>
          <div className={styles.priceWrapper}>
            <div>
              <h2>
                $299{" "}
                <span>
                  /One Time Fee
                  <br />
                </span>
              </h2>
            </div>

            {/* <div>
              <h6>
                <span>Billed yearly ($1,068)</span>
              </h6>
            </div> */}
          </div>

          <button>Get Started</button>

          <div className={styles.serviceList}>
            <h6>Everything in </h6>

            <ul>
              <li>Company formation in Montana</li>
              <li>Expedited Tax ID (EIN) setup</li>
              <li>Register buisness with 3-5 days</li>
              <li>
                Open a business bank account with one of our banking partners
              </li>
              <li>All essential and important documents</li>
              <li>
                All essential and important documents - e.g. stock purchase
                agreement, bylaws, etc
              </li>
              <li>Lifetime expert support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
