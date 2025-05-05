import React from "react";
import styles from "./refundPolicy.module.scss";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy | FormLLC.io",
  description:
    "Understand our refund policy, eligibility criteria, and how to request a refund from FormLLC.io.",
  robots: "index, follow",
  openGraph: {
    title: "Refund Policy | FormLLC.io",
    description:
      "We offer full refunds for issues with service delivery or filing errors. Read more here.",
    url: "https://formllc.io/refund-policy",
    siteName: "FormLLC.io",
  },
};

const page = () => {
  return (
    <section className="container">
      <div className={styles.policyWrapper}>
        <h1>Refund Policy</h1>
        <p>
          <strong>Effective Date:</strong> May 5, 2025
        </p>

        <p>
          At <strong>FormLLC.io</strong>, customer satisfaction is important to
          us. We aim to deliver timely and accurate LLC formation services as
          promised on our website.
        </p>

        <h2>1. Refund Eligibility</h2>
        <p>We offer a full refund in the following situations:</p>
        <ul>
          <li>
            If we are unable to deliver the LLC formation due to our error
          </li>
          <li>
            If your order is delayed beyond a reasonable timeframe and you
            choose not to proceed
          </li>
          <li>
            If documents provided are incorrect and not usable for legal or
            business purposes
          </li>
        </ul>

        <h2>2. Non-Refundable Situations</h2>
        <ul>
          <li>Once filings have been submitted to state agencies</li>
          <li>Services already rendered (e.g., EIN application completed)</li>
          <li>Customer provides incorrect or fraudulent information</li>
        </ul>

        <h2>3. How to Request a Refund</h2>
        <p>
          To request a refund, contact our support team at{" "}
          <Link href="mailto:support@formllc.com" target="_blank">
            support@formllc.com
          </Link>{" "}
          within 7 days of your order. Include your order number and reason for
          the request.
        </p>

        <h2>4. Processing Time</h2>
        <p>
          Approved refunds are processed within 5–10 business days to the
          original payment method.
        </p>

        <h2>5. Contact</h2>
        <p>
          For any refund-related questions, contact us at:
          <br />
          <strong>Email:</strong>{" "}
          <Link href="mailto:support@formllc.com" target="_blank">
            support@formllc.com
          </Link>
          <br />
          <strong>Business Address:</strong> 30 N GOULD ST STE R, SHERIDAN, WY
          82801
        </p>

        <p>&copy; 2025 FormLLC.io. All rights reserved.</p>
      </div>
    </section>
  );
};

export default page;
