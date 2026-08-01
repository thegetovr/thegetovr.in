import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seedProducts() {
  const { connectToDatabase } = await import("@/lib/mongodb");
  const { default: Product } = await import("@/models/Product");

  await connectToDatabase();

  await Product.deleteMany({});

  await Product.create({
    name: "Classic Black Oversized T-Shirt",
    sku: "OVS-BLK-001",
    category: "Oversized T-Shirt",
    price: 999,
    stock: 50,
    status: "active",
  });

  console.log("✅ Product seeded successfully.");
}

seedProducts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });