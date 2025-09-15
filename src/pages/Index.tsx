import { useState } from "react";
import ProfileSetup from "@/components/ProfileSetup";
import InternshipRecommendations from "@/components/InternshipRecommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Users, MapPin, Sparkles } from "lucide-react";

interface ProfileData {
  name: string;
  education: string;
  location: string;
  skills: string[];
  interests: string[];
}

const Index = () => {
  const [step, setStep] = useState<'welcome' | 'setup' | 'recommendations'>('welcome');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleGetStarted = () => {
    setStep('setup');
  };

  const handleProfileComplete = (profile: ProfileData) => {
    setProfileData(profile);
    setStep('recommendations');
  };

  const handleBackToSetup = () => {
    setStep('setup');
  };

  if (step === 'setup') {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  if (step === 'recommendations' && profileData) {
    return <InternshipRecommendations profile={profileData} onBack={handleBackToSetup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-soft">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">PM Internship Scheme</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Internship Match
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered recommendations to connect you with internships that match your skills, interests, and aspirations
            </p>
            
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-xl shadow-large hover:shadow-xl transition-smooth"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-muted-foreground text-lg">
            Designed specifically for Indian youth, including first-generation learners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-soft hover:shadow-medium transition-smooth">
            <CardContent className="p-8">
              <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Personalized Matching
              </h3>
              <p className="text-muted-foreground">
                AI analyzes your profile to suggest 3-5 most relevant internships instead of overwhelming you with hundreds of options
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-smooth">
            <CardContent className="p-8">
              <div className="bg-gradient-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Simple & Accessible
              </h3>
              <p className="text-muted-foreground">
                Designed for users with limited digital experience. Works perfectly on mobile devices with visual cues and minimal text
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-smooth">
            <CardContent className="p-8">
              <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Location Aware
              </h3>
              <p className="text-muted-foreground">
                Considers your location preferences including remote work options and opportunities across all Indian cities
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Active Internships</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">95%</div>
              <div className="text-muted-foreground">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-info mb-2">50+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 shadow-large">
          <Sparkles className="h-12 w-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Internship?
          </h2>
          <p className="text-white/90 text-lg mb-6">
            Join thousands of students who have already found their perfect match
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-soft"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;