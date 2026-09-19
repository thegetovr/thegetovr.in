import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

interface AccountDeletedEmailProps {
  firstName?: string;
  deletedAt?: string;
}

export function AccountDeletedEmail({
  firstName,
  deletedAt,
}: AccountDeletedEmailProps) {
  const customerName = firstName?.trim() || "Customer";

  const content = `
    ${EmailHeader({
      subtitle: "ACCOUNT UPDATE",
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
          ACCOUNT DELETED
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
          Your account has been deleted.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, your The GetOvr account has been
          successfully deleted as requested.
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
                DELETED AT
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
                ${deletedAt || "Just now"}
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
            Changed your mind?
          </div>

          <div
            style="
              margin-top:6px;
              font-size:13px;
              line-height:21px;
              color:#66615b;
            "
          >
            You can always create a new account and shop with
            The GetOvr again.
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
    title: "Account Deleted | The GetOvr",
    children: content,
  });
}
