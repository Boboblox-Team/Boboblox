import { notFound } from "next/navigation";

export default async function CheckoutPage({
  params,
}: {
  params: { id: string };
}) {
  const paymentId = params.id;

  // Fetch the payment session from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bobibe/session?id=${paymentId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const payment = await res.json();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">Bobibe Checkout</h1>

      <div className="bg-secondary/30 border border-border rounded-xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2">Bobobux Purchase</h2>

        <p className="text-muted-foreground mb-4">You are purchasing:</p>

        <div className="text-3xl font-bold mb-4">
          {payment.amount.toLocaleString()} Bobobux
        </div>

        <div className="text-2xl font-bold text-primary mb-6">
          £{payment.price.toFixed(2)}
        </div>

        <a
          href={`/bobibe/success/${paymentId}`}
          className="block w-full bg-primary text-white py-3 rounded-lg font-semibold mb-3"
        >
          Confirm Purchase
        </a>

        <a
          href="/shop"
          className="block w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
        >
          Cancel
        </a>
      </div>
    </div>
  );
}
