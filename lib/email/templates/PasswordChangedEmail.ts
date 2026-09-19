import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

interface PasswordChangedEmailProps {
  firstName?: string;
  changedAt?: string;
}

export function PasswordChangedEmail({
  firstName,
  changedAt,
}: PasswordChangedEmailProps) {
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
            background-color:#eef7ee;
            color:#3f713f;
            font-size:11px;
            line-height:16px;
            font-weight:700;
            letter-spacing:1px;
          "
        >
          PASSWORD UPDATED
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
          Your password was changed.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, your The GetOvr account password
          has been successfully changed.
        </p>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          role="presentation"
          style="
            margin-top:26px;
            border:1px solid #e6dfd6;
            border-radius:12px;
          "
        >
          <tr>
            <td
              style="
                padding:18px 20px;
                background-color:#faf7f2;
              "
            >
              <div
                style="
                  font-size:11px;
                  line-height:16px;
                  color:#999;
                  letter-spacing:1px;
                  text-transform:uppercase;
                "
              >
                CHANGED AT
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:15px;
                  line-height:22px;
                  font-weight:700;
                  color:#181715;
                "
              >
                ${changedAt || "Just now"}
              </div>
            </td>
          </tr>
        </table>

        <div
          style="
            margin-top:26px;
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
            Wasn't you?
          </div>

          <div
            style="
              margin-top:6px;
              font-size:13px;
              line-height:21px;
              color:#66615b;
            "
          >
            If you didn't make this change, please secure your
            account immediately by resetting your password.
          </div>
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
    title: "Password Changed | The GetOvr",
    children: content,
  });
}
