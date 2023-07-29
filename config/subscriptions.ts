import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 models. Upgrade to the PRO plan for unlimited models.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited models.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
