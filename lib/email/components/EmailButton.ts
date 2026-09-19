interface EmailButtonProps {
  text: string;
  href: string;
}

export function EmailButton({ text, href }: EmailButtonProps) {
  return `
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      role="presentation"
      style="margin:24px 0 0;"
    >
      <tr>
        <td
          align="center"
          style="
            border-radius:10px;
            background-color:#181715;
          "
        >
          <a
            href="${href}"
            target="_blank"
            style="
              display:inline-block;
              padding:13px 22px;
              border-radius:10px;
              background-color:#181715;
              color:#ffffff;
              font-family:Arial,Helvetica,sans-serif;
              font-size:13px;
              line-height:20px;
              font-weight:700;
              text-decoration:none;
              letter-spacing:.3px;
            "
          >
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `;
}
