
import { Separator } from "@/components/ui/separator";
import EmailGenerator from "@/components/EmailGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            DISC-Based Outreach Personalization Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate personalized cold emails based on DISC personality profiles, buyer personas, 
            and tone preferences to improve your outreach effectiveness.
          </p>
        </div>
        
        <Separator />
        
        <EmailGenerator />
        
        <footer className="pt-8 text-center text-sm text-muted-foreground">
          <p>A tool to showcase the power of personality-based email personalization</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
