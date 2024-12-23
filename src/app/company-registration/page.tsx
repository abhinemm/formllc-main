import React from "react";
import styles from "./company-registration.module.scss";

const page = () => {
  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <form className={styles.fbform}>
        <div className={styles.doubleFlex}>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Owner First Name</label>
            <input
              className={styles.fbinput}
              id="first-name"
              type="text"
              placeholder="Type your first name here"
            />
          </div>

          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Owner Last Name</label>
            <input
              className={styles.fbinput}
              id="last-name"
              type="text"
              placeholder="Type your last name here"
            />
          </div>
        </div>

        <div className={styles.doubleFlex}>
          {" "}
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Company Name</label>
            <input
              className={styles.fbinput}
              id="email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Email</label>
            <input
              className={styles.fbinput}
              id="confirm-email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
        </div>
        <div className={styles.doubleFlex}>
          {" "}
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Street Address</label>
            <input
              className={styles.fbinput}
              id="email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>City / Town</label>
            <input
              className={styles.fbinput}
              id="confirm-email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
        </div>
        <div className={styles.doubleFlex}>
          {" "}
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>State / Province / Region</label>
            <input
              className={styles.fbinput}
              id="email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Postal / ZIP Code</label>
            <input
              className={styles.fbinput}
              id="confirm-email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
        </div>
        <div className={styles.doubleFlex}>
          {" "}
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Country</label>
            <select className={styles.fbinput} id="email">
              <option value="1">country</option>
              <option value="1">country</option>
              <option value="1">country</option>
              <option value="1">country</option>
            </select>
          </div>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Proof of Address</label>
            <div className={styles.fileUpload}>
              <input
                className={styles.fbinput}
                id="confirm-email"
                type="file"
              />
              <div className=""></div>
            </div>
          </div>
        </div>

        <div className={styles.fbformitem}>
          <label className={styles.fbcheckboxlabel}>
            <input className={styles.fbcheckbox} type="checkbox" />
            <span> I read and agree with the </span>
            <a className={styles.fblink} href="" target="_blank">
              Terms of Use
            </a>{" "}
            <span> and </span>
            <a className={styles.fblink} href="" target="_blank">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        <div className={styles.signUpOptions}>
          <ul>
            <li>
              <button className={styles.signInBtn}>Register</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default page;
