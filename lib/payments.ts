import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
//@ts-ignore
export async function initiateCheckout({ lineItems } = {}) {
  console.log(process.env);
  const stripe = await stripePromise;

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
