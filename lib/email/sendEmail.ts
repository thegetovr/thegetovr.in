import { Resend } from "resend";

import { EMAIL_CONFIG, type EmailType } from "./config/emailConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  type: EmailType;
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  type,
  to,
  subject,
  html,
  from = "The GetOvr <customer@thegetovr.in>",
}: SendEmailParams) {
  // =====================================================
  // CHECK EMAIL TYPE
  // =====================================================

  if (!EMAIL_CONFIG[type]) {
    console.log(`[EMAIL DISABLED] ${type} → ${subject}`);

    return {
      success: true,
      skipped: true,
    };
  }

  // =====================================================
  // CHECK RESEND API KEY
  // =====================================================

  if (!process.env.RESEND_API_KEY) {
    console.error(`[EMAIL ERROR] RESEND_API_KEY is missing.`);

    return {
      success: false,
      skipped: false,
    };
  }

  // =====================================================
  // SEND EMAIL
  // =====================================================

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error(`[EMAIL ERROR] ${type}:`, result.error);

      return {
        success: false,
        skipped: false,
        error: result.error,
      };
    }

    console.log(`[EMAIL SENT] ${type} → ${subject}`);

    return {
      success: true,
      skipped: false,
      data: result.data,
    };
  } catch (error) {
    console.error(`[EMAIL ERROR] ${type}:`, error);

    return {
      success: false,
      skipped: false,
      error,
    };
  }
}
