import React from "react";
import styles from "../StartBusiness.module.scss";
import { RegistrationStation } from "@/constants/constants";

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
          className={
            companyLocation === RegistrationStation?.mexico_state
              ? styles.selectedState
              : ""
          }
          onClick={() => {
            setCompanyLocation(RegistrationStation?.mexico_state);
            setPlan("basic");
          }}
        >
          <h5>New Mexico</h5>
          <p>
            Affordable option at <b>$199</b> with no state income tax if
            operating outside New Mexico. Suitable for businesses seeking
            lower upfront costs.
          </p>
        </div>
        <div
          className={
            companyLocation === RegistrationStation?.wyoming_state
              ? styles.selectedState
              : ""
          }
          onClick={() => {
            setCompanyLocation(RegistrationStation?.wyoming_state);
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
