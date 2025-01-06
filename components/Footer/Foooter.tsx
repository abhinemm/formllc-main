import React from "react";
import styles from "./Footer.module.scss";

const Foooter = () => {
  return (
    <footer className="container" >
      <div className={styles.footer}>

        <div>

          <h2>Formllc</h2>
          <p>
            Have any questions or valuable feedback? Don't hesitate to reach out to our dedicated support team at{' '}
            <a href="">contact@formllc.com</a>. Your input is important to us!
          </p>
          <p>©2025 formllc.io. All Rights Reserved.</p>

        </div>

      </div>
    </footer>
  );
};

export default Foooter;
