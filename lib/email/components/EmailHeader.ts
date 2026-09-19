interface EmailHeaderProps {
  subtitle?: string;
}

export function EmailHeader({
  subtitle = "WEAR YOUR IDENTITY",
}: EmailHeaderProps = {}) {
  return `
    <tr>
      <td
        align="center"
        class="email-header"
        style="
          padding:28px 24px;
          background-color:#f8f6f1;
          border-bottom:1px solid #ded9cf;
        "
      >
        <div
          class="email-logo"
          style="
            font-size:24px;
            line-height:30px;
            font-weight:700;
            letter-spacing:1.5px;
            color:#171717;
          "
        >
          THE GETOVR
        </div>

        <div
          class="email-subtitle"
          style="
            margin-top:6px;
            font-size:11px;
            line-height:16px;
            letter-spacing:2px;
            color:#b39a68;
          "
        >
          ${subtitle}
        </div>
      </td>
    </tr>

    <style>
      /* =========================================
         LIGHT THEME
         THE GETOVR CREAM BRAND
         ========================================= */

      .email-header {
        background-color:#f8f6f1 !important;
        border-bottom:1px solid #ded9cf !important;
      }

      .email-logo {
        color:#171717 !important;
      }

      .email-subtitle {
        color:#b39a68 !important;
      }


      /* =========================================
         DARK THEME
         ========================================= */

      @media only screen and (prefers-color-scheme: dark) {

        .email-header {
          background-color:#0b0b0b !important;
          border-bottom:1px solid #292929 !important;
        }

        .email-logo {
          color:#ffffff !important;
        }

        .email-subtitle {
          color:#b39a68 !important;
        }
      }
    </style>
  `;
}
