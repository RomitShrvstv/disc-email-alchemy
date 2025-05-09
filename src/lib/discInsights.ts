
// DISC Profile insights for email generation
export interface DiscInsight {
  profile: string;
  fullName: string;
  careAbout: string;
  hates: string;
  promptInsight: string;
}

export const discInsights: DiscInsight[] = [
  {
    profile: "D",
    fullName: "Dominant",
    careAbout: "results and speed",
    hates: "wasting time",
    promptInsight: "This person cares about results and speed. They hate wasting time."
  },
  {
    profile: "I",
    fullName: "Influence",
    careAbout: "relationships and fun",
    hates: "boring content",
    promptInsight: "This person cares about relationships and fun. They hate boring content."
  },
  {
    profile: "S",
    fullName: "Steady",
    careAbout: "stability and trust",
    hates: "pushiness",
    promptInsight: "This person cares about stability and trust. They hate pushiness."
  },
  {
    profile: "C",
    fullName: "Conscientious",
    careAbout: "accuracy and logic",
    hates: "hype",
    promptInsight: "This person cares about accuracy and logic. They hate hype."
  }
];

export interface BuyerPersona {
  value: string;
  label: string;
}

export const buyerPersonas: BuyerPersona[] = [
  { value: "VP Sales", label: "VP Sales" },
  { value: "RevOps", label: "RevOps" },
  { value: "Founder", label: "Founder" }
];

export interface EmailTone {
  value: string;
  label: string;
}

export const emailTones: EmailTone[] = [
  { value: "Casual", label: "Casual" },
  { value: "Confident", label: "Confident" },
  { value: "Persuasive", label: "Persuasive" }
];

export const getDiscInsightByProfile = (profile: string): DiscInsight | undefined => {
  return discInsights.find(insight => insight.profile === profile);
};
