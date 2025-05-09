
import { useState } from "react";
import { getDiscInsightByProfile } from "@/lib/discInsights";
import { useToast } from "@/components/ui/use-toast";

interface EmailGenerationParams {
  discProfile: string;
  buyerPersona: string;
  emailTone: string;
}

export function useEmailGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const { toast } = useToast();

  const generateEmail = async ({ discProfile, buyerPersona, emailTone }: EmailGenerationParams) => {
    try {
      setIsGenerating(true);
      
      // Get DISC insight for the selected profile
      const discInsight = getDiscInsightByProfile(discProfile);
      
      if (!discInsight) {
        throw new Error("Invalid DISC profile selected");
      }

      // Mock API call for demonstration (in a real app, this would call an OpenAI endpoint)
      // This simulates calling the OpenAI API
      console.log("Generating email with parameters:", { discProfile, buyerPersona, emailTone, discInsight });
      
      // In a production app, we would call the OpenAI API here
      // Instead, for this demo, we'll generate a simulated response based on the parameters
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simulated email based on the parameters
      let emailContent = "";
      
      if (discProfile === "D") {
        emailContent = `Subject: Quick ROI boost with AI outreach personalization

Hi {{First Name}},

Looking at your team's performance metrics at {{Company}}, our AI tool could increase your response rates by 37% through DISC-based personalization.

Key benefit: Your SDRs will close more deals faster, with less effort.

I have a 15-min demo that shows exactly how it works. Are you free Thursday at 10am to see the results firsthand?

Best,
{{Your Name}}`;
      } else if (discProfile === "I") {
        emailContent = `Subject: Make your outreach fun AND effective!

Hey {{First Name}}!

Imagine your team at {{Company}} sending emails that people actually enjoy reading! Our AI tool helps craft messages that build genuine connections using DISC personality insights.

Your team will love how simple it is, and prospects will appreciate the personalized approach.

Want to see how it's transforming sales teams? Let's chat this week!

Cheers,
{{Your Name}}`;
      } else if (discProfile === "S") {
        emailContent = `Subject: A reliable way to improve your team's outreach

Hello {{First Name}},

I noticed {{Company}} values building lasting relationships with clients. Our AI tool helps your team personalize outreach using proven DISC insights, creating stable connections from the first message.

Many teams like yours have seen consistent 30%+ increases in response rates without disrupting existing workflows.

Would you be interested in a no-pressure demonstration to see if it might be helpful for your team?

Best regards,
{{Your Name}}`;
      } else if (discProfile === "C") {
        emailContent = `Subject: Data-backed approach to outreach personalization

Hello {{First Name}},

Our AI tool systematically improves email response rates by applying verified DISC personality frameworks to outreach personalization at {{Company}}.

Specifically:
- 42% higher response rates
- 28% faster deal progression
- 99.7% accuracy in profile matching

Would Tuesday at 2pm work for a precise 20-minute demonstration of the methodology and implementation process?

Regards,
{{Your Name}}`;
      }
      
      // Adjust tone based on selection
      if (emailTone === "Confident") {
        emailContent = emailContent.replace("might be helpful", "will deliver results");
        emailContent = emailContent.replace("could increase", "will increase");
        emailContent = emailContent.replace("Would you be interested", "You need to see");
      } else if (emailTone === "Persuasive") {
        emailContent = emailContent.replace("Looking at", "After analyzing");
        emailContent = emailContent.replace("Would you be interested", "You can't afford to miss");
        emailContent = emailContent.replace("Want to see", "You should see");
      }
      
      // Adjust for persona
      if (buyerPersona === "VP Sales") {
        emailContent = emailContent.replace("your team's", "your sales team's");
        emailContent = emailContent.replace("teams like yours", "sales leaders like you");
      } else if (buyerPersona === "RevOps") {
        emailContent = emailContent.replace("performance metrics", "operational efficiency");
        emailContent = emailContent.replace("close more deals", "streamline the sales process");
      } else if (buyerPersona === "Founder") {
        emailContent = emailContent.replace("your team's", "your company's");
        emailContent = emailContent.replace("SDRs will close", "team will achieve");
      }

      setGeneratedEmail(emailContent);
      
      toast({
        title: "Email Generated",
        description: "Your personalized email has been created based on your parameters.",
      });
    } catch (error) {
      console.error("Error generating email:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
      setGeneratedEmail("");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmailToClipboard = async () => {
    if (!generatedEmail) return;
    
    try {
      await navigator.clipboard.writeText(generatedEmail);
      toast({
        title: "Copied!",
        description: "Email copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy email:", error);
      toast({
        title: "Error",
        description: "Failed to copy email to clipboard",
        variant: "destructive",
      });
    }
  };

  return {
    isGenerating,
    generatedEmail,
    generateEmail,
    copyEmailToClipboard
  };
}
