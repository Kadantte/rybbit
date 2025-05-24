"use client";

import { authClient } from "@/lib/auth";
import { getStripePrices } from "@/lib/stripe";
import { useRouter } from "next/navigation";
import { StandardPage } from "../../components/StandardPage";
import { useStripeSubscription } from "../settings/subscription/utils/useStripeSubscription";
import { PricingHeader } from "./components/PricingHeader";
import {
  TrialUsageStats,
  daysElapsed,
  extrapolateMonthlyUsage,
} from "./components/TrialUsageStats";
import { PricingCard } from "./components/PricingCard";
import { FAQSection } from "./components/FAQSection";

export default function Subscribe() {
  const { data: sessionData } = authClient.useSession();
  const { data: subscription } = useStripeSubscription();
  const router = useRouter();

  // Redirect if already subscribed
  if (subscription?.status === "active") {
    router.push("/settings/subscription");
  }

  // Calculate trial usage metrics
  const currentUsage = subscription?.monthlyEventCount || 0;
  const trialStartDate = subscription?.currentPeriodStart;
  const daysInTrial = trialStartDate ? daysElapsed(trialStartDate) : 14;
  const projectedMonthlyUsage = extrapolateMonthlyUsage(
    currentUsage,
    daysInTrial
  );

  return (
    <StandardPage>
      <div className="container mx-auto py-12 px-4">
        <PricingHeader />

        {/* Pricing Card */}
        <PricingCard
          stripePrices={getStripePrices()}
          isLoggedIn={!!sessionData?.user}
        />

        {/* Trial Usage Stats */}
        <TrialUsageStats
          currentUsage={currentUsage}
          daysInTrial={daysInTrial}
          projectedMonthlyUsage={projectedMonthlyUsage}
        />

        {/* FAQ Section */}
        <div className="max-w-lg mx-auto">
          <FAQSection />
        </div>
      </div>
    </StandardPage>
  );
}
