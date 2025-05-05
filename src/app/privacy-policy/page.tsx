import React from "react";
import styles from "./privacy.module.scss";
import Link from "next/link";

const page = () => {
  return (
    <section className="container">
      <div className={styles.policyWrapper}>
        <div className={styles.privacyPolicy}>
          <h1>Privacy Policy</h1>
          <p>
            <strong>Effective Date:</strong> May 5, 2025
          </p>

          <p>
            Thank you for choosing <strong>FormLLC.io</strong>. We respect your
            privacy and are committed to protecting your personal information.
          </p>

          <p>
            By using our website or services, you agree to the terms of this
            Privacy Policy. Updates will be posted at:{" "}
            <Link href="https://formllc.io/privacy-policy" target="_blank">
              https://formllc.io/privacy-policy
            </Link>
          </p>

          <h2>1. Information We Collect</h2>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>IP address</li>
            <li>Payment details (bank account, credit/debit card numbers)</li>
            <li>Government-issued ID or SSN (for EIN filings)</li>
          </ul>

          <h2>2. How We Collect It</h2>
          <ul>
            <li>Register an account</li>
            <li>Place an order</li>
            <li>Contact support or submit forms</li>
            <li>Request our LLC filing services</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>Provide LLC formation services</li>
            <li>
              Deliver required documents (e.g., EIN, Articles of Organization)
            </li>
            <li>Send important notifications or updates</li>
            <li>Fulfill legal and regulatory obligations</li>
          </ul>

          <h2>4. No Cookies or Tracking</h2>
          <p>
            We do <strong>not</strong> use cookies, analytics, tracking pixels,
            or third-party ad services on our website.
          </p>

          <h2>5. Sharing with Third Parties</h2>
          <p>We only share data with essential service providers such as:</p>
          <ul>
            <li>Payment processors (e.g., Stripe, Paddle)</li>
            <li>IRS or related agencies (for EIN filing)</li>
          </ul>
          <p>
            We do <strong>not</strong> sell or rent your data.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your data only as long as necessary to deliver services or
            comply with legal obligations.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards to
            protect your data. However, no system is entirely secure.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access or correct your personal information</li>
            <li>Request deletion (where legally allowed)</li>
          </ul>
          <p>
            Contact us at{" "}
            <Link href="mailto:support@formllc.com" target="_blank">
              support@formllc.com
            </Link>{" "}
            for any privacy-related requests.
          </p>

          <h2>9. Children</h2>
          <p>
            Our services are not intended for individuals under 13 years old. If
            we discover such data has been submitted, it will be deleted
            immediately.
          </p>

          <h2>10. Contact</h2>
          <p>
            <strong>Email:</strong>{" "}
            <Link href="mailto:support@formllc.com">support@formllc.com</Link>
            <br />
            <strong>Business Address:</strong> 30 N GOULD ST STE R, SHERIDAN, WY
            82801
          </p>

          <p>&copy; 2025 FormLLC.io. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default page;
