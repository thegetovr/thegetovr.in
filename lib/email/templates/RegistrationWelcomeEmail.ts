import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

interface RegistrationWelcomeEmailProps {
  firstName?: string;
}

export function RegistrationWelcomeEmail({
  firstName,
}: RegistrationWelcomeEmailProps) {
  const customerName = firstName?.trim() || "there";

  const content = `
    ${EmailHeader({
      subtitle: "WELCOME TO THE GETOVR",
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
          WELCOME
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
          Welcome to The GetOvr.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, your account has been successfully
          created. We're happy to have you with us.
        </p>

        <div
          style="
            margin-top:26px;
            padding:20px;
            border-radius:12px;
            background-color:#f5f2ee;
          "
        >
          <div
            style="
              font-size:15px;
              line-height:22px;
              font-weight:700;
              color:#181715;
            "
          >
            WEAR YOUR IDENTITY
          </div>

          <div
            style="
              margin-top:7px;
              font-size:13px;
              line-height:21px;
              color:#66615b;
            "
          >
            Discover products made to match your style and make
            every choice feel like your own.
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
          Your account is ready. You can now browse products,
          manage your profile, place orders and track your
          purchases.
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
    title: "Welcome to The GetOvr",
    children: content,
  });
}
