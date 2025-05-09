
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmailGeneration } from "@/hooks/useEmailGeneration";
import EmailDisplay from "./EmailDisplay";
import { discInsights, buyerPersonas, emailTones } from "@/lib/discInsights";

const EmailGenerator: React.FC = () => {
  const [discProfile, setDiscProfile] = useState<string>("");
  const [buyerPersona, setBuyerPersona] = useState<string>("");
  const [emailTone, setEmailTone] = useState<string>("");
  
  const { isGenerating, generatedEmail, generateEmail, copyEmailToClipboard } = useEmailGeneration();

  const handleGenerateEmail = () => {
    if (!discProfile || !buyerPersona || !emailTone) return;
    
    generateEmail({
      discProfile,
      buyerPersona,
      emailTone
    });
  };

  // Check if all required fields are selected
  const isFormComplete = discProfile && buyerPersona && emailTone;
  
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Email Parameters</CardTitle>
          <CardDescription>
            Select the DISC profile, buyer persona, and tone for your personalized email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DISC Profile Selection */}
            <div className="space-y-2">
              <Label htmlFor="disc-profile">DISC Profile</Label>
              <Select
                value={discProfile}
                onValueChange={setDiscProfile}
              >
                <SelectTrigger id="disc-profile">
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>DISC Profiles</SelectLabel>
                    {discInsights.map((insight) => (
                      <SelectItem key={insight.profile} value={insight.profile}>
                        {insight.profile} - {insight.fullName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {discProfile && (
                <p className="text-xs text-muted-foreground mt-2">
                  Cares about: {discInsights.find(d => d.profile === discProfile)?.careAbout}<br />
                  Hates: {discInsights.find(d => d.profile === discProfile)?.hates}
                </p>
              )}
            </div>
            
            {/* Buyer Persona Selection */}
            <div className="space-y-2">
              <Label htmlFor="buyer-persona">Buyer Persona</Label>
              <Select
                value={buyerPersona}
                onValueChange={setBuyerPersona}
              >
                <SelectTrigger id="buyer-persona">
                  <SelectValue placeholder="Select persona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Personas</SelectLabel>
                    {buyerPersonas.map((persona) => (
                      <SelectItem key={persona.value} value={persona.value}>
                        {persona.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Email Tone Selection */}
            <div className="space-y-2">
              <Label htmlFor="email-tone">Email Tone</Label>
              <Select
                value={emailTone}
                onValueChange={setEmailTone}
              >
                <SelectTrigger id="email-tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tones</SelectLabel>
                    {emailTones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateEmail} 
            disabled={!isFormComplete || isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Email"}
          </Button>
        </CardContent>
      </Card>
      
      <EmailDisplay 
        email={generatedEmail} 
        onCopy={copyEmailToClipboard} 
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default EmailGenerator;
