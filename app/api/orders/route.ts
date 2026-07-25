import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
export async function POST(request: NextRequest) {
  try {
    const order = await request.json();

    const filePath = path.join(process.cwd(), "data", "orders.json");

const fileContent = await fs.readFile(filePath, "utf-8");

const orders = JSON.parse(fileContent);

orders.push(order);

await fs.writeFile(
  filePath,
  JSON.stringify(orders, null, 2)
);

return NextResponse.json({
  success: true,
  message: "Order saved successfully.",
  order,
});
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid order payload.",
      },
      {
        status: 400,
      }
    );
  }
}