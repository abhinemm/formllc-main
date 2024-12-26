import React from "react";
import styles from "./CreateAccount.module.scss";

const CreateAccount = () => {
  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <form className={styles.fbform}>
        <div className={styles.doubleFlex}>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>First Name</label>
            <input
              className={styles.fbinput}
              id="first-name"
              type="text"
              placeholder="Type your first name here"
            />
          </div>

          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Last Name</label>
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
            <label className={styles.fblabel}>Email</label>
            <input
              className={styles.fbinput}
              id="email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Confirm Email</label>
            <input
              className={styles.fbinput}
              id="confirm-email"
              type="text"
              placeholder="john.doe@mail.com"
            />
          </div>
        </div>

        <div className={styles.doubleFlex}>
          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Password</label>
            <input
              className={styles.fbinput}
              id="password"
              type="password"
              placeholder="●●●●●●●●●"
            />
          </div>

          <div className={styles.fbformitem}>
            <label className={styles.fblabel}>Confirm Password</label>
            <input
              className={styles.fbinput}
              id="confirm-password"
              type="password"
              placeholder="●●●●●●●●●"
            />
          </div>
        </div>

        <div className={styles.fbformitem}>
          <label className={styles.fbcheckboxlabel}>
            <input className={styles.fbcheckbox} type="checkbox" /><span> I read and
            agree with the </span>
             <a
              className={styles.fblink}
              href=""
              target="_blank"
            >
            Terms of Use 
            </a>{" "}
             <span> and </span>
             <a
              className={styles.fblink}
              href=""
              target="_blank"
            >
               Privacy Policy
            </a>
            .
          </label>
        </div>
      </form>

      <div className={styles.signUpOptions}>

        <ul>
          <li>
            <button className={styles.signInBtn}>Sign up</button>
          </li>
          <li><div><span>or</span></div></li>
          <li>
            <button className={styles.signInGoogleBtn}>Signup with Google</button>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default CreateAccount;
