import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Foooter = () => {
  return (
    <footer className="container">
      <div className={styles.footer}>
        <div>
          <h2>Formllc</h2>
          <p>
            Have any questions or valuable feedback? Don't hesitate to reach out
            to our dedicated support team at <a href="">support@formllc.com</a>.
            Your input is important to us!
          </p>
          <div className={styles.linkWrapper}>
            <Link href="/terms-conditions" target="_blank">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" target="_blank">
              Refund Policy
            </Link>
          </div>
          <p>©2025 formllc.io. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Foooter;
