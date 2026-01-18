import { NextResponse } from "next/server";

// Temporary in‑memory store (replace with DB later)
const payments: Record<string, any> = {};

// Your Bobobux packages (same as Shop.tsx)
const packages = {
  starter: { amount: 100, price: 3.40 },
  basic: { amount: 250, price: 7.99, bonus: 25 },
  popular: { amount: 500, price: 14.99, bonus: 75 },
  premium: { amount: 1000, price: 27.99, bonus: 200 },
  mega: { amount: 2500, price: 64.99, bonus: 625 },
  ultimate: { amount: 5000, price: 119.99, bonus: 1500 },
};

export async function POST(req: Request) {
  try {
    const { packId } = await req.json();

    // Validate package
    const pack = packages[packId];
    if (!pack) {
      return NextResponse.json(
        { error: "Invalid Bobobux package" },
        { status: 400 }
      );
    }

    // Create payment session
    const paymentId = crypto.randomUUID();

    payments[paymentId] = {
      id: paymentId,
      packId,
      amount: pack.amount + (pack.bonus || 0),
      price: pack.price,
      status: "pending",
      createdAt: Date.now(),
    };

    // Redirect user to Bobibe checkout page
    const checkoutUrl = `/bobibe/checkout?id=${paymentId}`;

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Bobibe start error:", err);
    return NextResponse.json(
      { error: "Failed to start Bobibe payment" },
      { status: 500 }
    );
  }
}
