import React from "react";
import styles from "../StartBusiness.module.scss";

interface IRegistrationState {
  setCompanyLocation: any;
  companyLocation: any;
}

const RegistrationState: React.FC<IRegistrationState> = ({
  setCompanyLocation,
  companyLocation,
}) => {
  return (
    <div className={styles.registrationMainWrapper}>
      <h6>Popular State</h6>

      <div className={styles.stateContainer}>
        <div
          className={companyLocation === "Delaware" ? styles.selectedState : ""}
          onClick={() => setCompanyLocation("Delaware")}
        >
          <h5>Delaware</h5>
          <p>
            Recommended for C-Corps due to strong legal protections for
            shareholders and strong business laws. No state income tax if you
            operate in other states.
          </p>
        </div>
        <div
          className={companyLocation === "Wyoming" ? styles.selectedState : ""}
          onClick={() => setCompanyLocation("Wyoming")}
        >
          <h5>Wyoming </h5>
          <p>
            Recommended for LLCs due to lower annual operating costs and
            flexibility. No corporate income tax or annual franchise tax..
          </p>

          <div className={styles.absoluteContainer}>RECOMMENDED FOR LLC</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationState;
