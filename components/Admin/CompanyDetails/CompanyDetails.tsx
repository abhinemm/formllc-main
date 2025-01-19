import React, { useRef } from "react";
import styles from "./CompanyDetails.module.scss"

const CompanyDetails = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY > 0 ? 50 : -50;
    }
  };

  return (
    <section className={styles.userDashSection}>
      <>
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className={styles.userStepsMainWrapper}
        >
          <ul>
            {/* <li className={styles.StepCompleted}> 
            if a step is completed add this class to the li for the style 
              */}

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <li
                className={`${item % 2 == 0 ? styles.StepCompleted : ""}`}
                key={index}
              >
                <div className={styles.stepCountWrapper}>
                  <h5>step {item}</h5>

                  {item % 2 == 0 && <span>completed</span>}
                </div>
                <div className={styles.stepContent}>
                  <h6>Company steps content</h6>

                  <p className={styles.underlined}>
                    By default, the mouse wheel scrolls vertically. Even if your
                    section has overflow-x: scroll, the mouse wheel won't scroll
                    horizontally unless:
                  </p>
                </div>

                <button> button </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.deatialsMainWrapper}>
          <h3>Details</h3>
          <label htmlFor="">Personal and company details</label>
          <div className={styles.detailsListWrapper}>
            <div className={styles.deatilsItem}>
              <h6>Company Name</h6>
              <div>
                <label htmlFor="">
                  <span>company name</span>
                </label>
              </div>
            </div>

            <div className={styles.deatilsItem}>
              <h6>Company Email</h6>
              <div>
                <label htmlFor="">
                  <span>company email</span>
                </label>
              </div>
            </div>
            <div className={styles.deatilsItem}>
              <h6>State</h6>
              <div>
                <label htmlFor="">
                  <span>state</span>
                </label>
              </div>
            </div>
            <div className={styles.deatilsItem}>
              <h6>Company Type</h6>
              <div>
                <label htmlFor="">company type</label>
              </div>
            </div>
            <div className={styles.deatilsItem}>
              <h6>Company Type</h6>
              <div>
                <label htmlFor="">company type</label>
              </div>
            </div>

            <div className={styles.deatilsItem}>
              <h6>Responsible Party</h6>
              <div>
                <label htmlFor="">
                  Name
                  <span>name</span>
                </label>
                <label htmlFor="">
                  Address
                  <span>
                    adderss line 1 , addressline 2 <article>(100%)</article>{" "}
                  </span>
                </label>
                <label htmlFor="">
                  Phone
                  <span>93030203003</span>
                </label>
                <label htmlFor="">
                  Email
                  <span>email.email</span>
                </label>
              </div>
            </div>
            <div className={styles.deatilsItem}>
              <h6>Owner</h6>
              <div>
                <label htmlFor="">
                  Name
                  <span>name</span>
                </label>
                <label htmlFor="">
                  Address
                  <span>
                    adderss line 1 , addressline 2 <article>(100%)</article>{" "}
                  </span>
                </label>
                <label htmlFor="">
                  Phone
                  <span>98342902</span>
                </label>
                <label htmlFor="">
                  Email
                  <span>email</span>
                </label>
              </div>
            </div>

            <div className={styles.deatilsItem}>
              <h6>Mailing Address</h6>
              <div>
                <label htmlFor="">
                  Address
                  <span>
                    adderss line 1 , addressline 2 <article>(100%)</article>{" "}
                  </span>
                </label>
              </div>
            </div>
          </div>
          {/* <DocumentPreview
          onClose={() => setShowDocumentViewer(false)}
          open={showDocumentViewer}
          url={docUrl}
        /> */}
        </div>
      </>
    </section>
  );
};

export default CompanyDetails;
