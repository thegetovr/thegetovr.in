import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type OrderItem = {
  name?: string;
  product?: string;
  quantity: number;
  totalPrice: number;
};

type Order = {
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: string;
};

export async function sendOrderPlacedEmail(order: Order) {
  const itemsHtml = order.items
    .map((item) => {
      const itemName = item.name || item.product || "Product";

      return `
        <tr>
          <td
            style="
              padding:14px 0;
              border-bottom:1px solid #eee8df;
              vertical-align:top;
            "
          >
            <div
              style="
                font-size:14px;
                line-height:20px;
                font-weight:600;
                color:#181715;
              "
            >
              ${itemName}
            </div>

            <div
              style="
                margin-top:4px;
                font-size:12px;
                line-height:18px;
                color:#777;
              "
            >
              Quantity: ${item.quantity}
            </div>
          </td>

          <td
            align="right"
            style="
              padding:14px 0;
              border-bottom:1px solid #eee8df;
              vertical-align:top;
              white-space:nowrap;
              font-size:14px;
              line-height:20px;
              font-weight:600;
              color:#181715;
            "
          >
            ₹${item.totalPrice.toLocaleString("en-IN")}
          </td>
        </tr>
      `;
    })
    .join("");

  const { error } = await resend.emails.send({
    from: "The GetOvr <customer@thegetovr.in>",
    to: order.customer.email,
    subject: `Order #${order.orderNumber} Confirmed | The GetOvr`,

    html: `
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

  <title>Your The GetOvr Order</title>

  <style>
    @media only screen and (max-width: 600px) {

      .email-wrapper {
        padding: 16px !important;
      }

      .email-container {
        width: 100% !important;
        border-radius: 16px !important;
      }

      .email-header {
        padding: 24px 20px !important;
      }

      .email-content {
        padding: 26px 20px !important;
      }

      .email-footer {
        padding: 20px !important;
      }

      .main-title {
        font-size: 23px !important;
        line-height: 30px !important;
      }

      .order-number {
        font-size: 16px !important;
      }

      .section-title {
        font-size: 16px !important;
      }

      .mobile-text {
        font-size: 14px !important;
      }

      .address-box {
        padding: 15px !important;
      }

      .total-amount {
        font-size: 18px !important;
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

  <!-- OUTER WRAPPER -->
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

        <!-- EMAIL CONTAINER -->
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

          <!-- HEADER -->
          <tr>
            <td
              align="center"
              class="email-header"
              style="
                padding:28px 24px;
                background-color:#181715;
              "
            >
              <div
                style="
                  font-size:24px;
                  line-height:30px;
                  font-weight:700;
                  letter-spacing:1.5px;
                  color:#ffffff;
                "
              >
                THE GETOVR
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:11px;
                  line-height:16px;
                  letter-spacing:2px;
                  color:#cfc8bf;
                "
              >
                WEAR YOUR IDENTITY
              </div>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td
              class="email-content"
              style="
                padding:34px 32px;
              "
            >

              <!-- STATUS -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
              >
                <tr>
                  <td
                    style="
                      padding:7px 13px;
                      background-color:#eee3d5;
                      border-radius:50px;
                      font-size:11px;
                      line-height:16px;
                      font-weight:700;
                      letter-spacing:.7px;
                      color:#181715;
                    "
                  >
                    ORDER PLACED
                  </td>
                </tr>
              </table>

              <!-- TITLE -->
              <h1
                class="main-title"
                style="
                  margin:20px 0 10px;
                  padding:0;
                  font-size:27px;
                  line-height:35px;
                  font-weight:700;
                  color:#181715;
                "
              >
                Thank you for your order!
              </h1>

              <p
                class="mobile-text"
                style="
                  margin:0;
                  font-size:14px;
                  line-height:22px;
                  color:#66615b;
                "
              >
                Hi ${order.customer.firstName},
                <br /><br />

                Your order has been successfully placed.
                We'll keep you updated as your order moves through
                each stage.
              </p>

              <!-- ORDER NUMBER -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  margin-top:24px;
                  background-color:#faf7f2;
                  border:1px solid #eee3d5;
                  border-radius:12px;
                "
              >
                <tr>
                  <td style="padding:16px 18px;">

                    <div
                      style="
                        font-size:10px;
                        line-height:15px;
                        letter-spacing:1px;
                        text-transform:uppercase;
                        color:#888;
                      "
                    >
                      Order Number
                    </div>

                    <div
                      class="order-number"
                      style="
                        margin-top:5px;
                        font-size:17px;
                        line-height:23px;
                        font-weight:700;
                        color:#181715;
                      "
                    >
                      #${order.orderNumber}
                    </div>

                  </td>
                </tr>
              </table>

              <!-- ORDER SUMMARY -->
              <h2
                class="section-title"
                style="
                  margin:30px 0 14px;
                  padding:0;
                  font-size:18px;
                  line-height:24px;
                  font-weight:700;
                  color:#181715;
                "
              >
                Order Summary
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="width:100%;"
              >
                ${itemsHtml}
              </table>

              <!-- TOTALS -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  margin-top:18px;
                  width:100%;
                "
              >

                <tr>
                  <td
                    style="
                      padding:5px 0;
                      font-size:13px;
                      line-height:20px;
                      color:#777;
                    "
                  >
                    Subtotal
                  </td>

                  <td
                    align="right"
                    style="
                      padding:5px 0;
                      font-size:13px;
                      line-height:20px;
                      color:#555;
                    "
                  >
                    ₹${order.subtotal.toLocaleString("en-IN")}
                  </td>
                </tr>

                ${
                  order.discount > 0
                    ? `
                      <tr>
                        <td
                          style="
                            padding:5px 0;
                            font-size:13px;
                            line-height:20px;
                            color:#4f7a55;
                          "
                        >
                          Discount
                        </td>

                        <td
                          align="right"
                          style="
                            padding:5px 0;
                            font-size:13px;
                            line-height:20px;
                            color:#4f7a55;
                          "
                        >
                          -₹${order.discount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    `
                    : ""
                }

                <tr>
                  <td
                    style="
                      padding-top:14px;
                      border-top:1px solid #ddd5ca;
                      font-size:16px;
                      line-height:22px;
                      font-weight:700;
                      color:#181715;
                    "
                  >
                    Total
                  </td>

                  <td
                    align="right"
                    class="total-amount"
                    style="
                      padding-top:14px;
                      border-top:1px solid #ddd5ca;
                      font-size:19px;
                      line-height:24px;
                      font-weight:700;
                      color:#181715;
                    "
                  >
                    ₹${order.total.toLocaleString("en-IN")}
                  </td>
                </tr>

              </table>

              <!-- SHIPPING ADDRESS -->
              <h2
                class="section-title"
                style="
                  margin:32px 0 14px;
                  padding:0;
                  font-size:18px;
                  line-height:24px;
                  font-weight:700;
                  color:#181715;
                "
              >
                Shipping Address
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                class="address-box"
                style="
                  width:100%;
                  background-color:#faf7f2;
                  border-radius:12px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:17px;
                      font-size:13px;
                      line-height:21px;
                      color:#66615b;
                    "
                  >
                    <strong
                      style="
                        color:#181715;
                        font-size:14px;
                      "
                    >
                      ${order.customer.firstName}
                      ${order.customer.lastName}
                    </strong>

                    <br />

                    ${order.customer.address}

                    <br />

                    ${order.customer.city},
                    ${order.customer.state}
                    -
                    ${order.customer.pincode}

                    <br />

                    Phone:
                    ${order.customer.phone}
                  </td>
                </tr>
              </table>

              <!-- ORDER STATUS -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  margin-top:20px;
                  width:100%;
                  border:1px solid #eee3d5;
                  border-radius:12px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:15px 16px;
                      font-size:13px;
                      line-height:20px;
                      color:#555;
                    "
                  >
                    <strong style="color:#181715;">
                      Order Status:
                    </strong>

                    <span
                      style="
                        margin-left:5px;
                        text-transform:capitalize;
                      "
                    >
                      ${order.status}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- MESSAGE -->
              <p
                class="mobile-text"
                style="
                  margin:28px 0 0;
                  font-size:13px;
                  line-height:21px;
                  color:#777;
                "
              >
                If you have any questions about your order,
                please contact our support team.
              </p>

              <p
                class="mobile-text"
                style="
                  margin:26px 0 0;
                  font-size:14px;
                  line-height:22px;
                  color:#555;
                "
              >
                Regards,
                <br />

                <strong style="color:#181715;">
                  The GetOvr Team
                </strong>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
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
                © ${new Date().getFullYear()}
                The GetOvr. All rights reserved.
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

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
