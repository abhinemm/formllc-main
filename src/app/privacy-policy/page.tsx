import React from "react";
import styles from "./privacy.module.scss";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | FormLLC.io",
  description:
    "Read how FormLLC.io handles and protects your personal information. We are committed to your privacy.",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | FormLLC.io",
    description:
      "Learn about the personal data we collect, how we use it, and your rights.",
    url: "https://formllc.io/privacy-policy",
    siteName: "FormLLC.io",
  },
};

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
            <strong>Last Updated:</strong> May 5, 2025
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
            <li>When you register an account</li>
            <li>When you place an order</li>
            <li>When you contact support or submit forms</li>
            <li>When you request our LLC filing services</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To provide LLC formation services</li>
            <li>
              To deliver required documents (e.g., EIN, Articles of
              Organization)
            </li>
            <li>To send important notifications or updates</li>
            <li>To fulfill legal and regulatory obligations</li>
          </ul>

          <h2>4. No Cookies or Tracking</h2>
          <p>
            We do <strong>not</strong> use cookies, analytics tools, tracking
            pixels, or third-party advertising services on our website.
          </p>

          <h2>5. Sharing with Third Parties</h2>
          <p>We only share data with essential service providers such as:</p>
          <ul>
            <li>Payment processors (e.g., Stripe)</li>
            <li>IRS or related agencies (for EIN filing)</li>
          </ul>
          <p>
            We do <strong>not</strong> sell or rent your personal data to any
            third parties.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your data only as long as necessary to deliver services
            and comply with legal obligations.
          </p>

          <h2>7. Data Storage</h2>
          <p>
            Your data is stored on secure servers located in the United States.
            Some third-party services may process data in other jurisdictions in
            accordance with their privacy policies.
          </p>

          <h2>8. Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards to
            protect your information. However, no system is 100% secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>9. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access or correct your personal information</li>
            <li>Request deletion of your data (where legally permitted)</li>
            <li>Contact us with any privacy-related concerns</li>
          </ul>
          <p>
            To make a request, email us at{" "}
            <Link href="mailto:support@formllc.io" target="_blank">
              support@formllc.io
            </Link>{" "}
          </p>

          <h2>9. Children</h2>
          <p>
            Our services are not intended for individuals under 13 years old. If
            we become aware that such data has been submitted, we will delete it
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
