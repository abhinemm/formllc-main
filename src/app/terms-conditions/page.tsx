import React from "react";

import styles from "./terms.module.scss";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | FormLLC.io",
  description:
    "Review the legal terms and conditions for using FormLLC.io’s LLC formation services.",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service | FormLLC.io",
    description:
      "Please read these terms carefully before using our LLC formation platform.",
    url: "https://formllc.io/terms-conditions",
    siteName: "FormLLC.io",
  },
};

const page = () => {
  return (
    <section className="container">
      <div className={styles.termsWrapper}>
        <h1>Terms of Service</h1>
        <div className={styles.terms}>
          <p className={styles.date}>
            <strong>Effective Date:</strong> May 5, 2025
          </p>
          <p className={styles.intro}>
            Welcome to FormLLC LLC ("FormLLC," "we," "our," or "us"). By
            accessing or using our website and services, you agree to be bound
            by these Terms of Service ("Terms"). If you do not agree, please do
            not use our services.
          </p>

          <div className={styles.section}>
            <h2>1. Our Services</h2>
            <p>
              FormLLC provides online tools to help individuals and businesses
              form LLCs in the United States. We are not a law firm and do not
              offer legal, tax, or financial advice. Our platform automates the
              process based on user-provided data.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Eligibility</h2>
            <p>
              By using FormLLC, you confirm that you are at least 18 years old
              and capable of entering into legally binding agreements.
            </p>
          </div>

          <div className={styles.section}>
            <h2>3. User Responsibilities</h2>
            <ul>
              <li>
                You agree to provide accurate, current, and complete
                information.
              </li>
              <li>
                You are solely responsible for all activity under your account.
              </li>
              <li>
                You agree not to use FormLLC for any illegal or unauthorized
                purpose.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Intellectual Property</h2>
            <p>
              All content on our site, including software, text, images, and
              trademarks, are the property of FormLLC LLC or its licensors.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Payments</h2>
            <p>
              Payments for our services are securely processed through trusted
              third-party providers. We do not store or process payment
              information directly on our servers.
            </p>
          </div>

          <div className={styles.section}>
            <h2>6. Refund Policy</h2>
            <p>
              We offer a 100% refund if there is an error or delay in our
              service caused by us. Refunds must be requested within 30 days of
              purchase.
            </p>
          </div>

          <div className={styles.section}>
            <h2>7. No Legal Advice</h2>
            <p>
              FormLLC is not a substitute for legal advice. You should consult a
              licensed attorney for legal questions specific to your situation.
            </p>
          </div>

          <div className={styles.section}>
            <h2>8. Disclaimers</h2>
            <p>
              We make no warranties regarding the accuracy or completeness of
              information on the platform. Your use of the service is at your
              own risk.
            </p>
          </div>

          <div className={styles.section}>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, FormLLC shall not be
              liable for any indirect, incidental, special, or consequential
              damages.
            </p>
          </div>

          <div className={styles.section}>
            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the United States and the
              state in which FormLLC LLC is registered.
            </p>
          </div>

          <div className={styles.section}>
            <h2>11. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Your continued use of the
              service constitutes acceptance of the updated Terms.
            </p>
          </div>
          <div className={styles.section}>
            <h2>12. Changes to Terms</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <Link href="mailto:support@formllc.io" target="_blank">
                support@formllc.io
              </Link>{" "}
            </p>
          </div>
        </div>
        {/* <Tabs defaultActiveKey="1" items={items} /> */}
      </div>
    </section>
  );
};

export default page;
