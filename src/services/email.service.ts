import { getTransporter } from "@/lib/mail";

export default class EmailService {
  static async send({
    text = "",
    htmlTemp = "",
    to,
    subject,
    link,
  }: {
    text?: string;
    htmlTemp?: string;
    to: string;
    subject: string;
    link?: string;
  }) {
    try {
      const transporter = getTransporter();
      const stripHtml = (html: string) =>
        html
          .replace(/<\/?[^>]+(>|$)/g, "") // remove tags
          .replace(/&nbsp;|\s+/g, " ")
          .trim();

      const fullText =
        text && text.length > 20 ? text : stripHtml(htmlTemp) || text || "";
      // build List-Unsubscribe header from FROM_EMAIL domain and optional BASE_URL
      const fromEmail =
        process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@localhost";
      const fromDomain = fromEmail.includes("@")
        ? fromEmail.split("@")[1]
        : undefined;
      const mailtoUnsub = fromDomain
        ? `mailto:unsubscribe@${fromDomain}?subject=unsubscribe`
        : undefined;

      const listUnsubscribeParts = [] as string[];
      if (mailtoUnsub) listUnsubscribeParts.push(`<${mailtoUnsub}>`);
      if (link) listUnsubscribeParts.push(`<${link}>`);

      const headers: Record<string, string> = {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      };
      if (listUnsubscribeParts.length) {
        headers["List-Unsubscribe"] = listUnsubscribeParts.join(", ");
      }

      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        text: fullText || undefined,
        html: htmlTemp,
        replyTo: process.env.REPLY_TO || process.env.FROM_EMAIL,
        envelope: {
          from: process.env.SMTP_ENVELOPE_FROM || process.env.FROM_EMAIL,
          to: to,
        },
        headers,
      });
      return { ok: true, messageId: info.messageId };
    } catch (error: any) {
      return { ok: false, error: String(error?.message || error) };
    }
  }
}
