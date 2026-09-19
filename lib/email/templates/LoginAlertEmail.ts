import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

interface LoginAlertEmailProps {
  firstName?: string;
  email?: string;
  loginTime?: string;
}

export function LoginAlertEmail({
  firstName,
  email,
  loginTime,
}: LoginAlertEmailProps) {
  const customerName = firstName?.trim() || "Customer";
  const accountEmail = email?.trim() || "Your registered email";

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
          NEW LOGIN
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
          New login detected.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, your The GetOvr account was
          successfully signed in.
        </p>

        <!-- LOGIN DETAILS -->

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

          <!-- LOGIN TIME -->

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
                LOGIN TIME
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
                ${loginTime || "Just now"}
              </div>
            </td>
          </tr>

          <!-- ACCOUNT EMAIL -->

          <tr>
            <td
              style="
                padding:0 20px 18px;
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
                ACCOUNT EMAIL
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:14px;
                  line-height:21px;
                  font-weight:700;
                  color:#181715;
                  word-break:break-word;
                "
              >
                ${accountEmail}
              </div>
            </td>
          </tr>

        </table>

        <!-- SECURITY MESSAGE -->

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
            If you don't recognize this login, please change your
            password immediately and secure your account.
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
    title: "New Login Alert | The GetOvr",
    children: content,
  });
}
