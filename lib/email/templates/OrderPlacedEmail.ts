import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

type OrderItem = {
  name?: string;
  product?: string;
  quantity: number;
  totalPrice: number;
};

interface OrderPlacedEmailProps {
  order: {
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
}

export function OrderPlacedEmail({ order }: OrderPlacedEmailProps) {
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

  const content = `
    ${EmailHeader()}

    <tr>
      <td
        class="email-content"
        style="padding:34px 32px;"
      >

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

        <p
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

    ${EmailFooter()}
  `;

  return EmailLayout({
    title: `Order #${order.orderNumber} Confirmed | The GetOvr`,
    children: content,
  });
}
