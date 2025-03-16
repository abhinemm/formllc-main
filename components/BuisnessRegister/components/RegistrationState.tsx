import React from "react";
import styles from "../StartBusiness.module.scss";

interface IRegistrationState {
  setCompanyLocation: any;
  companyLocation: any;
  setPlan: any;
  setActiveTabNumber: any;
}

const RegistrationState: React.FC<IRegistrationState> = ({
  setCompanyLocation,
  companyLocation,
  setPlan,
  setActiveTabNumber,
}) => {
  return (
    <div className={styles.registrationMainWrapper}>
      <h6>Popular State</h6>

      <div className={styles.stateContainer}>
        <div
          className={companyLocation === "Montana" ? styles.selectedState : ""}
          onClick={() => {
            setCompanyLocation("Montana");
            setPlan("basic");
          }}
        >
          <h5>Montana</h5>
          <p>
            Affordable option at <b>$199</b> with no state income tax if
            operating outside Montana. Suitable for businesses seeking lower
            upfront costs.
          </p>
        </div>
        <div
          className={companyLocation === "Wyoming" ? styles.selectedState : ""}
          onClick={() => {
            setCompanyLocation("Wyoming");
            setPlan("pro");
          }}
        >
          <h5>Wyoming </h5>
          <p>
            Best for e-commerce LLCs with no state income tax or annual
            franchise tax. Costs <b>$299</b>.
          </p>

          <div className={styles.absoluteContainer}>RECOMMENDED FOR LLC</div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.btnWrapper}>
          <button type="button" onClick={() => setActiveTabNumber(3)}>
            <span> Continue </span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationState;
