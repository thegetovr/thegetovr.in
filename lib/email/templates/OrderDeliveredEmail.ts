import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";

interface OrderDeliveredEmailProps {
  order: {
    orderNumber: string;
    customer: {
      firstName?: string;
      lastName?: string;
      email: string;
    };
    shippingAddress?: {
      firstName?: string;
      lastName?: string;
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      pincode?: string;
    };
  };
}

export function OrderDeliveredEmail({ order }: OrderDeliveredEmailProps) {
  const customerName =
    `${order.customer.firstName || ""} ${
      order.customer.lastName || ""
    }`.trim() || "Customer";

  const address = order.shippingAddress;

  const shippingAddress = [
    address?.firstName,
    address?.lastName,
    address?.address,
    address?.city,
    address?.state,
    address?.postalCode || address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const content = `
    ${EmailHeader({
      subtitle: "WEAR YOUR IDENTITY",
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
          ORDER DELIVERED
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
          Your order has arrived.
        </h1>

        <p
          style="
            margin:0;
            font-size:14px;
            line-height:23px;
            color:#66615b;
          "
        >
          Hi ${customerName}, your order from The GetOvr has been
          successfully delivered.
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
                ORDER NUMBER
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:18px;
                  line-height:24px;
                  font-weight:700;
                  color:#181715;
                "
              >
                #${order.orderNumber}
              </div>
            </td>
          </tr>
        </table>

        ${
          shippingAddress
            ? `
              <div
                style="
                  margin-top:26px;
                  font-size:12px;
                  line-height:18px;
                  font-weight:700;
                  color:#181715;
                  text-transform:uppercase;
                  letter-spacing:.8px;
                "
              >
                Delivered To
              </div>

              <div
                style="
                  margin-top:8px;
                  padding:16px;
                  border:1px solid #e6dfd6;
                  border-radius:10px;
                  background-color:#ffffff;
                  font-size:13px;
                  line-height:21px;
                  color:#66615b;
                "
              >
                ${shippingAddress}
              </div>
            `
            : ""
        }

        <div
          style="
            margin-top:28px;
            padding:18px;
            border-radius:12px;
            background-color:#f5f2ee;
          "
        >
          <div
            style="
              font-size:14px;
              line-height:21px;
              font-weight:700;
              color:#181715;
            "
          >
            Thank you for shopping with The GetOvr.
          </div>

          <div
            style="
              margin-top:6px;
              font-size:13px;
              line-height:21px;
              color:#66615b;
            "
          >
            We hope you love your order. If you need any help,
            our support team is here for you.
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
    title: `Order #${order.orderNumber} Delivered | The GetOvr`,
    children: content,
  });
}
