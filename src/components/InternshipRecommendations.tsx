import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, ArrowRight, Building } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  skills: string[];
  description: string;
  matchScore: number;
  stipend?: string;
  applicationDeadline: string;
}

interface InternshipRecommendationsProps {
  profile: any;
  onBack: () => void;
}

export default function InternshipRecommendations({ profile, onBack }: InternshipRecommendationsProps) {
  // Mock recommendation logic based on profile
  const getRecommendations = (): Internship[] => {
    const allInternships: Internship[] = [
      {
        id: "1",
        title: "Digital Marketing Intern",
        company: "TechStart Solutions",
        location: "Mumbai",
        duration: "3 months",
        type: "Marketing",
        skills: ["Digital Marketing", "Social Media", "Content Creation"],
        description: "Join our marketing team to create digital campaigns and manage social media presence.",
        matchScore: 95,
        stipend: "₹15,000/month",
        applicationDeadline: "2024-10-15"
      },
      {
        id: "2",
        title: "Software Development Intern",
        company: "InnovateTech",
        location: "Bangalore",
        duration: "6 months",
        type: "Technology",
        skills: ["Programming", "Web Development", "JavaScript"],
        description: "Work on real-world projects and learn from experienced developers.",
        matchScore: 88,
        stipend: "₹20,000/month",
        applicationDeadline: "2024-10-20"
      },
      {
        id: "3",
        title: "Finance & Operations Intern",
        company: "GrowthCorp",
        location: "Delhi",
        duration: "4 months",
        type: "Finance",
        skills: ["Financial Analysis", "Excel", "Data Analysis"],
        description: "Support financial planning and operational efficiency initiatives.",
        matchScore: 82,
        stipend: "₹18,000/month",
        applicationDeadline: "2024-10-18"
      },
      {
        id: "4",
        title: "Content Writing Intern",
        company: "CreativeHub",
        location: "Pune",
        duration: "3 months",
        type: "Content",
        skills: ["Writing", "Research", "SEO"],
        description: "Create engaging content for various digital platforms and marketing materials.",
        matchScore: 79,
        stipend: "₹12,000/month",
        applicationDeadline: "2024-10-22"
      },
      {
        id: "5",
        title: "Human Resources Intern",
        company: "PeopleFirst Inc",
        location: "Hyderabad",
        duration: "3 months",
        type: "HR",
        skills: ["Communication", "Recruitment", "Employee Relations"],
        description: "Assist in recruitment processes and employee engagement activities.",
        matchScore: 76,
        stipend: "₹14,000/month",
        applicationDeadline: "2024-10-25"
      }
    ];

    // Simple matching logic based on skills and interests
    return allInternships
      .map(internship => {
        let score = internship.matchScore;
        
        // Boost score if skills match
        if (profile.skills.some((skill: string) => 
          internship.type.toLowerCase().includes(skill) || 
          internship.skills.some(s => s.toLowerCase().includes(skill))
        )) {
          score += 10;
        }
        
        // Boost score if location matches
        if (profile.location === internship.location.toLowerCase() || profile.location === 'any') {
          score += 5;
        }
        
        return { ...internship, matchScore: Math.min(score, 100) };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  };

  const recommendations = getRecommendations();

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-info";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  const getMatchBadgeColor = (score: number) => {
    if (score >= 90) return "bg-success/10 text-success border-success/20";
    if (score >= 80) return "bg-info/10 text-info border-info/20";
    if (score >= 70) return "bg-warning/10 text-warning border-warning/20";
    return "bg-muted/10 text-muted-foreground border-muted/20";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Your Personalized Recommendations
          </h1>
          <p className="text-muted-foreground">
            Top 5 internships matched to your profile
          </p>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary rounded-full p-2">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">{profile.name}</span>
              </div>
              <Badge variant="outline">{profile.education}</Badge>
              <Badge variant="outline">{profile.location}</Badge>
              <div className="flex flex-wrap gap-1">
                {profile.skills.slice(0, 3).map((skill: string) => (
                  <Badge key={skill} className="bg-accent text-accent-foreground">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 3 && (
                  <Badge variant="outline">+{profile.skills.length - 3} more</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-6">
          {recommendations.map((internship, index) => (
            <Card key={internship.id} className="shadow-medium hover:shadow-large transition-smooth">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getMatchBadgeColor(internship.matchScore)}>
                        <Star className="h-3 w-3 mr-1" />
                        {internship.matchScore}% Match
                      </Badge>
                      {index === 0 && (
                        <Badge className="bg-success text-success-foreground">
                          Best Match
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {internship.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{internship.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{internship.duration}</span>
                      </div>
                    </div>
                  </div>
                  {internship.stipend && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-success">
                        {internship.stipend}
                      </div>
                      <div className="text-sm text-muted-foreground">Stipend</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {internship.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Apply by: {new Date(internship.applicationDeadline).toLocaleDateString()}
                  </div>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            Update Profile
          </Button>
          <Button className="bg-gradient-secondary hover:opacity-90">
            View All Internships
          </Button>
        </div>
      </div>
    </div>
  );
}