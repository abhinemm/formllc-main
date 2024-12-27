"use client";

import { signIn } from "next-auth/react";
import styles from "./signIn.module.scss";

const SignIn = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error("Error:", result.error);
    } else {
      console.log("Signed in successfully");
    }
  };

  return (
    <div className={styles.mainSigninPageWrapper}>
      <div>
        <div className={styles.signinWithGoogleWrapper}>
          {" "}
          <div className={styles.authHeaderItem}>
            <h2>Welcome to Firstbase</h2>
            <p title="Don’t have an account?">
              Don’t have an account?
              <a
                href="/auth/sign-up"
                className={`${styles.authHeaderLink} ${styles.link}`}
              >
                Sign up
              </a>
            </p>
          </div>
          <button onClick={() => signIn("google")}>
            <div className={styles.bButtonContent}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                className={`${styles.svgInline} ${styles.faGoogle} ${styles.faW16} ${styles.baseIcon}`}
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign In with Google
            </div>
          </button>
          <div className={styles.orBlockWrapper}>
            <span>or continue with</span>
          </div>
        </div>
        <div className={styles.formWrapper}>
          {" "}
          <form
            autoComplete="off"
           
          
          >
            <div className={styles.formContent}>
              {/* Email Input */}
              <div className={`${styles.authFormItem}`}>
                
                  <label
                    htmlFor="input60"
                   
                  >
                    <span>Email</span>
                  </label>
                  
                      <input
                        id="input60"
                        type="email"
                        name="email"
                        placeholder="john.doe@mail.com"
                        autoComplete="off"
                      />
                   
                  
                
              </div>

              {/* Password Input */}
              <div className={`${styles.authFormItem} `}>
              
                  <label
                    htmlFor="input65"
                    className={styles.baseTextFieldLabel}
                  >
                    <span>Password</span>
                  </label>
                 
                      <input
                        id="input65"
                        type="password"
                        name="password"
                        placeholder="●●●●●●●●●"
                        autoComplete="off"
                      />
                  
              </div>

              {/* Remember Me & Forgot Password */}
              <div
                className={`${styles.authFormItem} ${styles.rememberWrapper} `}
              >
                
                  <label className={styles.baseCheckboxLabel}>
                    <input type="checkbox" id="checkbox69" name="remember" />
                    
                    <span className={styles.baseCheckboxContent}>
                      Remember me
                    </span>
                  </label>
                
                <a
                >
                  <p
                    
                    title="Forgot password"
                  >
                    Forgot password
                  </p>
                </a>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                >
                 Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
