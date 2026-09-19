import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";
import { EmailButton } from "../components/EmailButton";

interface ForgotPasswordEmailProps {
  firstName?: string;
  resetUrl: string;
}

export function ForgotPasswordEmail({
  firstName,
  resetUrl,
}: ForgotPasswordEmailProps) {
  const customerName = firstName?.trim() || "Customer";

  const content = `
    ${EmailHeader({
      subtitle: "ACCOUNT SECURITY",
    })}

    <tr>
      <td
        class="email-content"
        style="
          padding:36px 32px;
          background-color:#ffffff;
        "
      >

        <div
          style="
            display:inline-block;
            padding:7px 12px;
            border-radius:999px;
            background-color:#f5f2ee;
            color:#66615b;
            font-size:11px;
            line-height:16px;
            font-weight:700;
            letter-spacing:1px;
          "
        >
          PASSWORD RESET
        </div>

        <h1
          style="
            margin:20px 0 10px;
            font-size:28px;
            line-height:36px;
            font-weight:700;
            color:#181715;
          "
        >
          Reset your password.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, we received a request to reset the
          password for your The GetOvr account.
        </p>

        <p
          style="
            margin:18px 0 0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Click the button below to create a new password.
          This link will expire in <strong>15 minutes</strong>.
        </p>

        ${EmailButton({
          text: "RESET PASSWORD",
          href: resetUrl,
        })}

        <div
          style="
            margin-top:28px;
            padding:18px;
            border-radius:12px;
            background-color:#f5f2ee;
          "
        >
          <div
            style="
              font-size:13px;
              line-height:21px;
              font-weight:700;
              color:#181715;
            "
          >
            Didn't request this?
          </div>

          <div
            style="
              margin-top:6px;
              font-size:13px;
              line-height:21px;
              color:#66615b;
            "
          >
            You can safely ignore this email. Your password will
            remain unchanged.
          </div>
        </div>

        <div
          style="
            margin-top:24px;
            font-size:12px;
            line-height:20px;
            color:#999;
            word-break:break-all;
          "
        >
          If the button doesn't work, copy and paste this link into
          your browser:
          <br />
          <span style="color:#66615b;">
            ${resetUrl}
          </span>
        </div>

        <div
          style="
            margin-top:28px;
            font-size:13px;
            line-height:21px;
            color:#66615b;
          "
        >
          Regards,<br />
          <strong style="color:#181715;">
            The GetOvr Team
          </strong>
        </div>

      </td>
    </tr>

    ${EmailFooter()}
  `;

  return EmailLayout({
    title: "Reset Your Password | The GetOvr",
    children: content,
  });
}
