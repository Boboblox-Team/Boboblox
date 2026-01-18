import { NextResponse } from "next/server";

// Use a global store so data persists across API routes during runtime
const payments: Record<string, any> = globalThis.payments || {};
globalThis.payments = payments;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing payment ID" },
      { status: 400 }
    );
  }

  const payment = payments[id];

  if (!payment) {
    return NextResponse.json(
      { error: "Payment session not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(payment);
}
