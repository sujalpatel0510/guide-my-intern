import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, GraduationCap, MapPin, Briefcase } from "lucide-react";

interface ProfileData {
  name: string;
  education: string;
  location: string;
  skills: string[];
  interests: string[];
}

interface ProfileSetupProps {
  onComplete: (profile: ProfileData) => void;
}

const skillCategories = [
  { id: "tech", label: "Technology", icon: "💻" },
  { id: "marketing", label: "Marketing", icon: "📱" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "sales", label: "Sales", icon: "📈" },
  { id: "hr", label: "Human Resources", icon: "👥" },
  { id: "operations", label: "Operations", icon: "⚙️" },
];

const interestAreas = [
  { id: "startup", label: "Startups", icon: "🚀" },
  { id: "corporate", label: "Corporate", icon: "🏢" },
  { id: "ngo", label: "NGO/Social", icon: "🤝" },
  { id: "govt", label: "Government", icon: "🏛️" },
  { id: "remote", label: "Remote Work", icon: "🌐" },
  { id: "research", label: "Research", icon: "🔬" },
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    education: "",
    location: "",
    skills: [],
    interests: [],
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    onComplete(profile);
  };

  const toggleSkill = (skillId: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(s => s !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const toggleInterest = (interestId: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return profile.name && profile.education;
      case 2: return profile.location;
      case 3: return profile.skills.length > 0;
      case 4: return profile.interests.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-large">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-primary rounded-full p-3">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Profile Setup - Step {step} of 4
          </CardTitle>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <GraduationCap className="h-5 w-5" />
                <span>Basic Information</span>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select value={profile.education} onValueChange={(value) => setProfile({...profile, education: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <MapPin className="h-5 w-5" />
                <span>Location Preference</span>
              </div>
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Select value={profile.location} onValueChange={(value) => setProfile({...profile, location: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your preferred location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                    <SelectItem value="remote">Remote/Work from Home</SelectItem>
                    <SelectItem value="any">Any Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <Briefcase className="h-5 w-5" />
                <span>Skills & Expertise</span>
              </div>
              <p className="text-muted-foreground text-sm">Select areas where you have skills or interest (Select multiple)</p>
              <div className="grid grid-cols-2 gap-3">
                {skillCategories.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-smooth text-center hover:shadow-soft ${
                      profile.skills.includes(skill.id)
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <div className="text-sm font-medium">{skill.label}</div>
                    {profile.skills.includes(skill.id) && (
                      <CheckCircle className="h-4 w-4 text-primary mx-auto mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>Work Environment Preferences</span>
              </div>
              <p className="text-muted-foreground text-sm">What type of work environment interests you?</p>
              <div className="grid grid-cols-2 gap-3">
                {interestAreas.map((interest) => (
                  <div
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-smooth text-center hover:shadow-soft ${
                      profile.interests.includes(interest.id)
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{interest.icon}</div>
                    <div className="text-sm font-medium">{interest.label}</div>
                    {profile.interests.includes(interest.id) && (
                      <CheckCircle className="h-4 w-4 text-secondary mx-auto mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center space-x-2"
            >
              <span>Back</span>
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
              >
                <span>Next</span>
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!isStepComplete()}
                className="flex items-center space-x-2 bg-gradient-secondary hover:opacity-90"
              >
                <span>Get Recommendations</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}