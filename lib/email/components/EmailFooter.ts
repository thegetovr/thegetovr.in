interface EmailFooterProps {
  year?: number;
}

export function EmailFooter({
  year = new Date().getFullYear(),
}: EmailFooterProps = {}) {
  return `
    <tr>
      <td
        align="center"
        class="email-footer"
        style="
          padding:22px 24px;
          background-color:#faf7f2;
          border-top:1px solid #eee8df;
        "
      >
        <div
          style="
            font-size:11px;
            line-height:17px;
            color:#999;
          "
        >
          © ${year} The GetOvr. All rights reserved.
        </div>

        <div
          style="
            margin-top:5px;
            font-size:11px;
            line-height:17px;
            color:#aaa;
          "
        >
          Thank you for choosing The GetOvr.
        </div>
      </td>
    </tr>
  `;
}
