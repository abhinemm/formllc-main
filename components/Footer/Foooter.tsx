import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {
  WhatsAppOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Foooter = () => {
  return (
    <footer className="container">
      <div className={styles.footer}>
        <div>
          <h2>Formllc</h2>
          <div className={styles.secionWrapper}>
            <div className={styles.coloum}>
              <Link href="/contact-us" target="_blank">
                Contact US
              </Link>
              <p> 30 N GOULD ST STE R, SHERIDAN, WY 82801</p>
              <div className={styles.iocnWrapper}>
                <Link
                  href="https://api.whatsapp.com/send?phone=447909729519"
                  target="_blank"
                >
                  <WhatsAppOutlined style={{ fontSize: "1.5rem" }} />
                </Link>
                <Link href="tel:+447909729519" target="_blank">
                  <PhoneOutlined style={{ fontSize: "1.5rem" }} />
                </Link>
                <Link href="mailto:support@formllc.io" target="_blank">
                  <MailOutlined style={{ fontSize: "1.5rem" }} />
                </Link>
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <h2>Support</h2>
              <Link
                href="https://api.whatsapp.com/send?phone=447909729519"
                target="_blank"
              >
                Contact us
              </Link>
              <Link href="mailto:support@formllc.io" target="_blank">
                support@formllc.io
              </Link>
            </div>
            <div className={styles.contentWrapper}>
              <h2>Legal</h2>
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
          </div>
          <hr />
          <p>
            Have any questions or valuable feedback? Don't hesitate to reach out
            to our dedicated support team at{" "}
            <Link href="mailto:support@formllc.io" target="_blank">
              support@formllc.io
            </Link>{" "}
            . Your input is important to us!
          </p>
          <p>©2025 formllc.io. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Foooter;
