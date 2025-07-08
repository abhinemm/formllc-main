import React from "react";
import styles from "./pricing.module.scss";
import PricingCards from "../../../components/pricing/PricingCards";

const Ticksvg = () => {
  return (
    <svg
      fill="rgb(37, 99, 235)"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="rgb(37, 99, 235)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
      </g>
    </svg>
  );
};

const EmptySvg = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6 12L18 12"
          stroke="#747272"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const ProSvg = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.8613 9.36335L10.7302 9.59849C10.5862 9.85677 10.5142 9.98591 10.402 10.0711C10.2897 10.1563 10.1499 10.188 9.87035 10.2512L9.61581 10.3088C8.63195 10.5314 8.14001 10.6427 8.02297 11.0191C7.90593 11.3955 8.2413 11.7876 8.91204 12.572L9.08557 12.7749C9.27617 12.9978 9.37147 13.1092 9.41435 13.2471C9.45722 13.385 9.44281 13.5336 9.41399 13.831L9.38776 14.1018C9.28635 15.1482 9.23565 15.6715 9.54206 15.9041C9.84847 16.1367 10.3091 15.9246 11.2303 15.5005L11.4686 15.3907C11.7304 15.2702 11.8613 15.2099 12 15.2099C12.1387 15.2099 12.2696 15.2702 12.5314 15.3907L12.7697 15.5005C13.6909 15.9246 14.1515 16.1367 14.4579 15.9041C14.7644 15.6715 14.7136 15.1482 14.6122 14.1018L14.586 13.831C14.5572 13.5336 14.5428 13.385 14.5857 13.2471C14.6285 13.1092 14.7238 12.9978 14.9144 12.7749L15.088 12.572C15.7587 11.7876 16.0941 11.3955 15.977 11.0191C15.86 10.6427 15.3681 10.5314 14.3842 10.3088L14.1296 10.2512C13.8501 10.188 13.7103 10.1563 13.598 10.0711C13.4858 9.98592 13.4138 9.85678 13.2698 9.5985L13.1387 9.36335C12.6321 8.45445 12.3787 8 12 8C11.6213 8 11.3679 8.45446 10.8613 9.36335Z"
          fill="#f97316"
        ></path>{" "}
      </g>
    </svg>
  );
};

const page = () => {
  return (
    <section className="container">
      <div className={styles.pricingTopHead}>
        <div className={styles.textContainer}>
          <p className={styles.text}>Your partner in success:</p>
          <p className={styles.text}>simple pricing, powerful features</p>
        </div>

        <div className={styles.description}>
          <p className={styles.text}>
            Launch, manage, and grow your US business with confidence -{" "}
            <span className={styles.highlight}>100% remote</span>. Enjoy{" "}
            <span className={styles.highlight}>free</span> business formation
            and EIN included in all plans!
          </p>
        </div>
      </div>

      <div>
        <PricingCards />
      </div>
      {/* <div className={styles.compareWrapper}>
        <div className={styles.mainStickyWrapper}>
          <div className={styles.emptyContainer}></div>
          <div className={styles.headContainer}>
            {" "}
            <div className={styles.head}>
              <span>Basic</span>
            </div>
            <div>
              <h3>$199</h3>
            </div>
            <button>Get Started</button>
          </div>
          <div className={styles.headContainer}>
            {" "}
            <div className={styles.head}>
              {" "}
              <ProSvg /> <span>Pro</span>
              <h6>Most popular</h6>
            </div>
            <div>
              <h3>$299</h3>
            </div>
            <button>Get Started</button>
          </div>
        </div>

        <>
          <h5>Formation</h5>

          <div className={styles.contentContainer}>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>No State Income Tax</div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Privacy Protection (Anonymous LLC)
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>Asset Protection</div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>No Corporate Income Tax</div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Affordable Formation Cost ($299)
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Ease of Maintenance for Non-US Clients
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Faster Registration (3-5 Days)
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Preferred by E-commerce Sellers
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Lower Initial Setup Cost ($199)
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.subHead}>
                Access to Reliable Bank Accounts
              </div>
              <div className={styles.tick}>
                <Ticksvg />
              </div>
              <div className={styles.tick}>
                <EmptySvg />
              </div>
            </div>
          </div>
        </>
      </div> */}
    </section>
  );
};

export default page;
