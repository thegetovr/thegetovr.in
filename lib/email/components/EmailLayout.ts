interface EmailLayoutProps {
  children: string;
  title?: string;
}

export function EmailLayout({
  children,
  title = "The GetOvr",
}: EmailLayoutProps) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="x-apple-disable-message-reformatting"
  />

  <title>${title}</title>

  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 16px !important;
      }

      .email-container {
        width: 100% !important;
        border-radius: 16px !important;
      }

      .email-content {
        padding: 26px 20px !important;
      }

      .email-footer {
        padding: 20px !important;
      }
    }
  </style>
</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f5f2ee;
    font-family:Arial,Helvetica,sans-serif;
    color:#181715;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    style="
      width:100%;
      background-color:#f5f2ee;
    "
  >
    <tr>
      <td
        align="center"
        class="email-wrapper"
        style="padding:32px 16px;"
      >

        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          role="presentation"
          class="email-container"
          style="
            width:100%;
            max-width:600px;
            background-color:#ffffff;
            border:1px solid #ddd5ca;
            border-radius:20px;
            overflow:hidden;
          "
        >

          ${children}

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
