
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface EmailDisplayProps {
  email: string;
  onCopy: () => void;
  isGenerating: boolean;
}

const EmailDisplay: React.FC<EmailDisplayProps> = ({ email, onCopy, isGenerating }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Generated Email</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={!email || isGenerating}
          className="flex items-center gap-1"
        >
          <Copy className="h-4 w-4" />
          <span>Copy Email</span>
        </Button>
      </div>
      <Card className="w-full">
        <CardContent className="pt-6">
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-muted-foreground">
                Generating personalized email...
              </div>
            </div>
          ) : email ? (
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{email}</pre>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground text-center">
              <p>
                Generated email will appear here.<br />
                Select parameters and click "Generate Email" to start.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailDisplay;
