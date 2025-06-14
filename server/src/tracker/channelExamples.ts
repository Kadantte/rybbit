import { getChannel, getChannelDetails } from "./getChannel.js";
import { getSourceType, getMediumType, isPaidTraffic } from "./const.js";

/**
 * Examples of how to use the enhanced channel detection functions
 */

// Example 1: Basic channel detection
export function exampleBasicChannelDetection() {
  const examples = [
    {
      referrer: "https://google.com/search?q=analytics",
      querystring: "",
      expected: "Organic Search",
    },
    {
      referrer: "https://facebook.com",
      querystring:
        "utm_source=facebook&utm_medium=social&utm_campaign=awareness",
      expected: "Organic Social",
    },
    {
      referrer: "",
      querystring:
        "utm_source=google&utm_medium=cpc&utm_campaign=brand&gclid=123",
      expected: "Paid Search",
    },
    {
      referrer: "https://instagram.com",
      querystring:
        "utm_source=instagram&utm_medium=influencer&utm_campaign=creator_collab",
      expected: "Influencer",
    },
  ];

  examples.forEach(({ referrer, querystring, expected }) => {
    const channel = getChannel(referrer, querystring);
    console.log(`Channel: ${channel} (Expected: ${expected})`);
  });
}

// Example 2: Detailed channel analysis
export function exampleDetailedAnalysis() {
  const referrer = "https://youtube.com/watch?v=abc123";
  const querystring =
    "utm_source=youtube&utm_medium=video&utm_campaign=product_demo";

  const details = getChannelDetails(referrer, querystring);

  console.log("Detailed Analysis:", {
    channel: details.channel, // "Organic Video"
    sourceType: details.sourceType, // "video"
    mediumType: details.mediumType, // "video"
    isPaid: details.isPaid, // false
    isMobile: details.isMobile, // false
    source: details.details.source, // "youtube"
    medium: details.details.medium, // "video"
    campaign: details.details.campaign, // "product_demo"
  });
}

// Example 3: Mobile app tracking
export function exampleMobileAppTracking() {
  const mobileExamples = [
    {
      referrer: "",
      querystring: "utm_source=com.instagram.android&utm_medium=social",
      description: "Instagram Android app",
    },
    {
      referrer: "",
      querystring: "utm_source=com.google.android.youtube&utm_medium=video",
      description: "YouTube Android app",
    },
    {
      referrer: "",
      querystring: "utm_source=com.nytimes.android&utm_medium=news",
      description: "NY Times Android app",
    },
  ];

  mobileExamples.forEach(({ referrer, querystring, description }) => {
    const details = getChannelDetails(referrer, querystring);
    console.log(`${description}:`, {
      channel: details.channel,
      isMobile: details.isMobile,
      sourceType: details.sourceType,
    });
  });
}

// Example 4: Paid vs Organic detection
export function examplePaidVsOrganic() {
  const trafficExamples = [
    "utm_medium=cpc",
    "utm_medium=social",
    "utm_medium=influencer&utm_source=sponsored_post",
    "utm_medium=email",
    "gclid=abc123",
    "utm_medium=display&utm_campaign=retargeting",
  ];

  trafficExamples.forEach((querystring) => {
    const details = getChannelDetails("", querystring);
    console.log(
      `${querystring} -> ${details.channel} (Paid: ${details.isPaid})`
    );
  });
}

// Example 5: Using utility functions directly
export function exampleUtilityFunctions() {
  // Source type detection
  console.log("Source Types:");
  console.log("google.com ->", getSourceType("google.com")); // "search"
  console.log("facebook.com ->", getSourceType("facebook.com")); // "social"
  console.log("youtube.com ->", getSourceType("youtube.com")); // "video"
  console.log("amazon.com ->", getSourceType("amazon.com")); // "shopping"

  // Medium type detection
  console.log("\nMedium Types:");
  console.log("cpc ->", getMediumType("cpc")); // "cpc"
  console.log("social ->", getMediumType("social")); // "social"
  console.log("influencer ->", getMediumType("influencer")); // "influencer"
  console.log("email ->", getMediumType("email")); // "email"

  // Paid traffic detection
  console.log("\nPaid Traffic Detection:");
  console.log("cpc + google ->", isPaidTraffic("cpc", "google")); // true
  console.log("social + facebook ->", isPaidTraffic("social", "facebook")); // false
  console.log(
    "sponsored + instagram ->",
    isPaidTraffic("sponsored", "instagram")
  ); // true
}

// Example 6: Advanced campaign analysis
export function exampleCampaignAnalysis() {
  const campaigns = [
    {
      name: "Google Ads Campaign",
      referrer: "",
      querystring:
        "utm_source=google&utm_medium=cpc&utm_campaign=brand_keywords&gclid=123",
    },
    {
      name: "Influencer Partnership",
      referrer: "https://instagram.com",
      querystring:
        "utm_source=instagram&utm_medium=influencer&utm_campaign=summer_collection&utm_content=creator_jane",
    },
    {
      name: "Content Marketing",
      referrer: "https://techcrunch.com",
      querystring:
        "utm_source=techcrunch&utm_medium=content&utm_campaign=thought_leadership",
    },
    {
      name: "Event Traffic",
      referrer: "",
      querystring:
        "utm_source=conference&utm_medium=event&utm_campaign=tech_summit_2024",
    },
  ];

  campaigns.forEach(({ name, referrer, querystring }) => {
    const details = getChannelDetails(referrer, querystring);
    console.log(`\n${name}:`);
    console.log(`  Channel: ${details.channel}`);
    console.log(`  Source Type: ${details.sourceType}`);
    console.log(`  Medium Type: ${details.mediumType}`);
    console.log(`  Is Paid: ${details.isPaid}`);
    console.log(`  Campaign: ${details.details.campaign}`);
  });
}
