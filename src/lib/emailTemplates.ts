// lib/emailTemplates.ts

export function forgotPasswordEmail({
  name,
  otp,
  validFor,
  year = new Date().getFullYear(),
}: {
  name: string;
  otp: string;
  validFor: number;
  year?: number;
}) {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Password Reset Code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #0b0d1a;
      font-family: Inter, Arial, sans-serif;
      color: #d9dfea;
    "
  >
    <div
      style="
        max-width: 640px;
        margin: 0 auto;
        background: #0f1224;
        border-radius: 16px;
        padding: 32px 28px;
        color: #d9dfea;
        margin-top: 30px;
        margin-bottom: 30px;
      "
    >
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #fff">
        FormLLC<span
          style="
            display: inline-block;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #9c6bff, #ff6b8a);
            border-radius: 50%;
            margin-left: 6px;
          "
        ></span>
      </h2>
      <p style="font-size: 14px; color: #9aa3b2; margin-top: 4px">
        USA Company Registration
      </p>

      <h1
        style="
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin: 20px 0 10px;
        "
      >
        Password Reset Code
      </h1>

      <p style="font-size: 15px; line-height: 1.6">
        Hi ${name},<br />
        Use the one-time code below to reset your FormLLC password. This code
        expires in <strong>${validFor} minutes</strong>.
      </p>

      <div
        style="
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px;
          margin: 20px 0;
        "
      >
        <div
          style="
            font-size: 26px;
            font-weight: 800;
            letter-spacing: 8px;
            text-align: center;
            color: #fff;
            background: #0b0f21;
            border: 1px dashed rgba(255, 255, 255, 0.14);
            border-radius: 12px;
            padding: 16px 10px;
            margin: 8px 0 2px;
          "
        >
          ${otp}
        </div>
        <p
          style="
            font-size: 13px;
            color: #9aa3b2;
            text-align: center;
            margin: 10px 0 0;
          "
        >
          Don’t share this code with anyone. FormLLC support will never ask for
          it.
        </p>
      </div>

      <p style="font-size: 13px; color: #9aa3b2; margin-top: 18px">
        If you didn’t request this, you can safely ignore this email. Your
        password won’t change.
      </p>

      <hr
        style="
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 24px 0;
        "
      />

      <p style="font-size: 13px; color: #9aa3b2">
        Need help? Reply to this email or contact us at
        <a
          href="mailto:support@formllc.io"
          style="color: #b4bef5; text-decoration: none"
          >support@formllc.io</a
        >.
      </p>

      <p
        style="
          font-size: 12px;
          color: #7f8894;
          text-align: center;
          margin-top: 28px;
        "
      >
        © ${year} FormLLC • All rights reserved<br />
        30 N GOULD ST STE R, SHERIDAN, WY 82801 (Mailing) | formllc.io
      </p>
    </div>
  </body>
</html>
  `;
}

export function subscriptionRenewal({
  name,
  content,
  plan_name,
  amount,
  status,
  payment_link,
}: {
  name: string;
  content: string;
  plan_name: string;
  amount: string;
  status: string;
  payment_link: string;
}) {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Subscription Renewal</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="margin:0;padding:0;background:#0B0D1A;color:#D9DFEA;font-family:Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;"
  >
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Subscription renewal for the Mail room service
    </div>

    <div style="padding:32px 16px;">
      <div
        style="max-width:640px;margin:0 auto;background:#0F1224;border-radius:16px;border:1px solid rgba(255,255,255,0.06);box-shadow:0 10px 30px rgba(0,0,0,0.45);"
      >
        <div style="padding:32px 28px;">
          <!-- Header -->
          <div style="font-weight:800;color:#fff;font-size:18px;letter-spacing:0.2px;">
            FormLLC
            <span
              style="display:inline-block;width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#9C6BFF,#FF6B8A);margin-left:6px;vertical-align:middle;"
            ></span>
          </div>
          <div style="color:#9AA3B2;font-size:12px;margin-top:6px;">
            USA Company Registration
          </div>

          <!-- Title -->
          <h1
            style="margin:16px 0 8px;font-size:24px;line-height:1.25;font-weight:800;background:linear-gradient(90deg,#B388FF 0%,#FF8BA7 100%);-webkit-background-clip:text;background-clip:text;color:transparent;"
          >
            Subscription renewal
          </h1>

          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#D9DFEA;">
            Hi <strong>${name}</strong>.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#D9DFEA;">
            ${content}
          </p>

          <!-- Plan Info Card -->
          <div
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:18px;margin-top:12px;"
          >
            <table
              role="presentation"
              width="100%"
              style="width:100%;border-collapse:collapse;margin-top:8px;"
            >
              <tr>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#9AA3B2;width:42%;"
                >
                  Plan
                </td>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;"
                >
                  <strong>${plan_name}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#9AA3B2;width:42%;"
                >
                  Amount
                </td>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;"
                >
                  <strong>${amount}</strong> / Monthly
                </td>
              </tr>
              <tr>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#9AA3B2;width:42%;"
                >
                  Status
                </td>
                <td
                  style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;"
                >
                  <strong>${status}</strong>
                </td>
              </tr>
            </table>
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin-top:22px;">
            <a
              href="${payment_link}"
              target="_blank"
              style="display:inline-block;padding:14px 18px;border-radius:12px;font-weight:700;background:linear-gradient(90deg,#9C6BFF,#FF6B8A);color:#0B0D1A !important;text-decoration:none;"
            >
              Manage subscription
            </a>
          </div>

          <hr
            style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;"
          />

          <p style="font-size:13px;color:#9AA3B2;line-height:1.6;margin:0;">
            Questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color:#B4BEF5;text-decoration:none;"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="text-align:center;color:#7F8894;font-size:12px;padding:18px;"
        >
          © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 (Mailing) • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}

export function enqurieEmail({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Subscription Renewal</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="margin:0;padding:0;background:#0B0D1A;color:#D9DFEA;font-family:Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;"
  >
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Replay to enqurie
    </div>

    <div style="padding:32px 16px;">
      <div
        style="max-width:640px;margin:0 auto;background:#0F1224;border-radius:16px;border:1px solid rgba(255,255,255,0.06);box-shadow:0 10px 30px rgba(0,0,0,0.45);"
      >
        <div style="padding:32px 28px;">
          <!-- Header -->
          <div style="font-weight:800;color:#fff;font-size:18px;letter-spacing:0.2px;">
            FormLLC
            <span
              style="display:inline-block;width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#9C6BFF,#FF6B8A);margin-left:6px;vertical-align:middle;"
            ></span>
          </div>
          <div style="color:#9AA3B2;font-size:12px;margin-top:6px;margin-bottom: 20px;">
            USA Company Registration
          </div>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#D9DFEA;">
            Hi <strong>${name}</strong>.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#D9DFEA;">
            ${content}
          </p>

          <hr
            style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;"
          />

          <p style="font-size:13px;color:#9AA3B2;line-height:1.6;margin:0;">
            Questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color:#B4BEF5;text-decoration:none;"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="text-align:center;color:#7F8894;font-size:12px;padding:18px;"
        >
          © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 (Mailing) • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}

export function paymentSuccessEmail({
  name,
  registation_state,
  amount,
}: {
  name: string;
  registation_state: string;
  amount: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Company Registration Payment Success</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #0b0d1a;
      color: #d9dfea;
      font-family: Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    "
  >
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0">
      Company registration payment success notification
    </div>

    <div style="padding: 32px 16px">
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          background: #0f1224;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        "
      >
        <div style="padding: 32px 28px">
          <!-- Header -->
          <div
            style="
              font-weight: 800;
              color: #fff;
              font-size: 18px;
              letter-spacing: 0.2px;
            "
          >
            FormLLC
            <span
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9c6bff, #ff6b8a);
                margin-left: 6px;
                vertical-align: middle;
              "
            ></span>
          </div>
          <div style="color: #9aa3b2; font-size: 12px; margin-top: 6px">
            USA Company Registration
          </div>

          <!-- Title -->
          <h1
            style="
              margin: 16px 0 8px;
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              color: #fff;
            "
          >
            Your Company Formation Is on Its Way
          </h1>

          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Hi <strong>${name}</strong>,
          </p>
          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Thank you for your payment toward your U.S. company registration. 
            We’ve successfully received your registration fee, 
            and your application will now move forward to the next stage of processing.
          </p>

          <!-- Plan Info Card -->
          <div
            style="
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 14px;
              padding: 18px;
              margin-top: 12px;
            "
          >
            <table
              role="presentation"
              width="100%"
              style="width: 100%; border-collapse: collapse; margin-top: 8px"
            >
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Registration State
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${registation_state}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Amount
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${amount}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Status
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>Paid</strong>
                </td>
              </tr>
            </table>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 22px">
            <a
              href="https://formllc.io/user"
              target="_blank"
              style="
                display: inline-block;
                padding: 14px 18px;
                border-radius: 12px;
                font-weight: 700;
                background: linear-gradient(90deg, #9c6bff, #ff6b8a);
                color: #0b0d1a !important;
                text-decoration: none;
              "
            >
              View registration details
            </a>
          </div>

          <hr
            style="
              border: none;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
              margin: 24px 0;
            "
          />

          <p
            style="font-size: 13px; color: #9aa3b2; line-height: 1.6; margin: 0"
          >
            Questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color: #b4bef5; text-decoration: none"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="
            text-align: center;
            color: #7f8894;
            font-size: 12px;
            padding: 18px;
          "
        >
          © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
`;
}

export function subscriptionRenewed({
  name,
  plan_name,
  amount,
  next_billing_date,
  company_name,
}: {
  name: string;
  plan_name;
  amount: string;
  next_billing_date: string;
  company_name: string;
}): string {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Mail Room Subscription Renewed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #0b0d1a;
      color: #d9dfea;
      font-family: Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    "
  >
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0">
      Your Business Mail Room subscription has been successfully renewed
    </div>

    <div style="padding: 32px 16px">
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          background: #0f1224;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        "
      >
        <div style="padding: 32px 28px">
          <!-- Header -->
          <div
            style="
              font-weight: 800;
              color: #fff;
              font-size: 18px;
              letter-spacing: 0.2px;
            "
          >
            FormLLC
            <span
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9c6bff, #ff6b8a);
                margin-left: 6px;
                vertical-align: middle;
              "
            ></span>
          </div>
          <div style="color: #9aa3b2; font-size: 12px; margin-top: 6px">
            Business Mail Room Service
          </div>

          <!-- Title -->
          <h1
            style="
              margin: 16px 0 8px;
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              color: #fff;
            "
          >
            Subscription Successfully Renewed
          </h1>

          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Hi <strong>${name}</strong>,
          </p>
          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Great news! Your Business Mail Room subscription for <strong>${company_name}</strong> has been successfully renewed. Your service is now active and you can continue using all mail room features without interruption.
          </p>

          <!-- Plan Info Card -->
          <div
            style="
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 14px;
              padding: 18px;
              margin-top: 12px;
            "
          >
            <table
              role="presentation"
              width="100%"
              style="width: 100%; border-collapse: collapse; margin-top: 8px"
            >
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Company
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${company_name}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Plan
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${plan_name}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Amount
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${amount}</strong> / Monthly
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Status
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong style="color: #b388ff;">Active</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Next Billing Date
                </td>
                <td
                  style="
                    padding: 10px 0;
                    font-size: 14px;
                  "
                >
                  <strong>${next_billing_date}</strong>
                </td>
              </tr>
            </table>
          </div>

          <hr
            style="
              border: none;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
              margin: 24px 0;
            "
          />

          <p
            style="font-size: 13px; color: #9aa3b2; line-height: 1.6; margin: 0"
          >
            Questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color: #b4bef5; text-decoration: none"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="
            text-align: center;
            color: #7f8894;
            font-size: 12px;
            padding: 18px;
          "
        >
           © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}

export function subscriptionCreated({
  name,
  plan_name,
  amount,
  next_billing_date,
  company_name,
}: {
  name: string;
  plan_name;
  amount: string;
  next_billing_date: string;
  company_name: string;
}): string {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Mail Room Subscription Activated</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #0b0d1a;
      color: #d9dfea;
      font-family: Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    "
  >
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0">
      Welcome to FormLLC Business Mail Room - Your subscription is now active
    </div>

    <div style="padding: 32px 16px">
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          background: #0f1224;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        "
      >
        <div style="padding: 32px 28px">
          <!-- Header -->
          <div
            style="
              font-weight: 800;
              color: #fff;
              font-size: 18px;
              letter-spacing: 0.2px;
            "
          >
            FormLLC
            <span
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9c6bff, #ff6b8a);
                margin-left: 6px;
                vertical-align: middle;
              "
            ></span>
          </div>
          <div style="color: #9aa3b2; font-size: 12px; margin-top: 6px">
            Business Mail Room Service
          </div>

          <!-- Title -->
          <h1
            style="
              margin: 16px 0 8px;
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              color: #fff;
            "
          >
            Business Mail Room Activated
          </h1>

          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Hi <strong>${name}</strong>,
          </p>
          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Your Business Mail Room subscription for  <strong>${company_name}</strong>! is now active. You can start managing your 
            business mail and accessing all the features included in your plan.
          </p>
          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            You can now start managing your business mail, receiving packages, and accessing all the features included in your plan.
          </p>

          <!-- Plan Info Card -->
          <div
            style="
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 14px;
              padding: 18px;
              margin-top: 12px;
            "
          >
            <table
              role="presentation"
              width="100%"
              style="width: 100%; border-collapse: collapse; margin-top: 8px"
            >
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Company
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${company_name}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Plan
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${plan_name}</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Amount
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong>${amount}</strong> / Monthly
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Status
                </td>
                <td
                  style="
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 14px;
                  "
                >
                  <strong style="color: #b388ff;">Active</strong>
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 10px 0;
                    font-size: 14px;
                    color: #9aa3b2;
                    width: 42%;
                  "
                >
                  Next Billing Date
                </td>
                <td
                  style="
                    padding: 10px 0;
                    font-size: 14px;
                  "
                >
                  <strong>${next_billing_date}</strong>
                </td>
              </tr>
            </table>
          </div>

          <hr
            style="
              border: none;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
              margin: 24px 0;
            "
          />

          <p
            style="font-size: 13px; color: #9aa3b2; line-height: 1.6; margin: 0"
          >
            Questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color: #b4bef5; text-decoration: none"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="
            text-align: center;
            color: #7f8894;
            font-size: 12px;
            padding: 18px;
          "
        >
          © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 (Mailing) • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}

export function subscriptionCancelled({
  company_name,
  reactivate_link,
}: {
  company_name: string;
  reactivate_link: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>FormLLC • Mail Room Subscription Inactive</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #0b0d1a;
      color: #d9dfea;
      font-family: Inter, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    "
  >
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0">
      Your business mail room subscription is inactive and mail delivery is
      suspended
    </div>
    <div style="padding: 32px 16px">
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          background: #0f1224;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
        "
      >
        <div style="padding: 32px 28px">
          <!-- Header -->
          <div
            style="
              font-weight: 800;
              color: #fff;
              font-size: 18px;
              letter-spacing: 0.2px;
            "
          >
            FormLLC
            <span
              style="
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9c6bff, #ff6b8a);
                margin-left: 6px;
                vertical-align: middle;
              "
            ></span>
          </div>
          <div style="color: #9aa3b2; font-size: 12px; margin-top: 6px">
            Business Mail Room Service
          </div>

          <!-- Title -->
          <h1
            style="
              margin: 16px 0 8px;
              font-size: 24px;
              line-height: 1.25;
              font-weight: 800;
              color: #ea4e4e;
            "
          >
            Your Business Mail Room Is Inactive
          </h1>

          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Your Business Mail Room subscription for
            <strong>${company_name}</strong> has been deactivated.
          </p>
          <p
            style="
              margin: 0 0 18px;
              font-size: 15px;
              line-height: 1.6;
              color: #d9dfea;
            "
          >
            Without an active plan, your mail and packages will not be received
            or forwarded, and your digital mailbox is no longer accessible.
          </p>
          <div
            style="
              background: #261319;
              border: 1px solid #ea4e4e;
              border-radius: 12px;
              padding: 18px;
              margin: 18px 0;
              color: #ffc7bd;
              font-size: 16px;
              font-weight: 700;
              text-align: center;
            "
          >
            ⚠ This interruption can seriously impact your business
            operations.<br />
            You could miss critical:
            <ul
              style="
                text-align: left;
                margin: 16px 0 0 0;
                padding: 0 0 0 24px;
                color: #ffc7bd;
              "
            >
              <li>Government and compliance notices</li>
              <li>Client communications</li>
              <li>Official correspondence tied to your registered address</li>
            </ul>
            <div style="margin-top: 16px">
              <strong
                >Your Business Mail Room service is mandatory for keeping your
                business presence active and compliant.</strong
              >
            </div>
          </div>
          <div style="text-align: center; margin-top: 22px">
            <a
              href="${reactivate_link}"
              target="_blank"
              style="
                display: inline-block;
                padding: 14px 18px;
                border-radius: 12px;
                font-weight: 700;
                background: linear-gradient(90deg, #ea4e4e, #ffaf87);
                color: #fff !important;
                text-decoration: none;
                font-size: 16px;
                margin-top: 4px;
              "
            >
              Reactivate Your Mail Room Service
            </a>
          </div>
          <hr
            style="
              border: none;
              border-top: 1px solid rgba(255, 255, 255, 0.08);
              margin: 24px 0;
            "
          />
          <p
            style="font-size: 13px; color: #9aa3b2; line-height: 1.6; margin: 0"
          >
            Need help or have questions? Reply to this email or contact
            <a
              href="mailto:support@formllc.io"
              style="color: #ea4e4e; text-decoration: none"
              >support@formllc.io</a
            >.
          </p>
        </div>

        <div
          style="
            text-align: center;
            color: #7f8894;
            font-size: 12px;
            padding: 18px;
          "
        >
          © 2024 FormLLC • All rights reserved<br />
          30 N GOULD ST STE R, SHERIDAN, WY 82801 (Mailing) • formllc.io
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}
