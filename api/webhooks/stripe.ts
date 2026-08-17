import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;

  if (!secret || !key || !sig) {
    return res.status(400).send("Webhook Error: Missing configuration");
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks);

  try {
    const stripe = new Stripe(key);
    const event = stripe.webhooks.constructEvent(rawBody, sig, secret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const credits = parseInt(session.metadata?.credits || "0");
        console.log(`[WEBHOOK] Checkout completed: ${session.customer_email} — ${credits} credits — $${(session.amount_total || 0) / 100}`);
        break;
      }
      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`[WEBHOOK] Charge succeeded: ${charge.id} — $${charge.amount / 100}`);
        break;
      }
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.log(`[WEBHOOK] PaymentIntent succeeded: ${pi.id} — $${pi.amount / 100}`);
        break;
      }
      default:
        console.log(`[WEBHOOK] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error("[WEBHOOK] Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
