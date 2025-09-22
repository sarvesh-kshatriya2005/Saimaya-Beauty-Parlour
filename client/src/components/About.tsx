import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Users, GraduationCap, Star, Heart, Trophy } from "lucide-react";
import academyImage from "@assets/generated_images/beauty_academy_classroom_e4cf4d85.png";
import { useLocation } from "wouter";

const achievements = [
  {
    icon: Trophy,
    title: "Beauty Show Awards",
    description: "Winner of 3 regional beauty competitions",
    year: "2023-2024"
  },
  {
    icon: GraduationCap,
    title: "Certified Academy",
    description: "Officially recognized makeup training institute",
    year: "Since 2020"
  },
  {
    icon: Users,
    title: "1000+ Students",
    description: "Successfully trained professional makeup artists",
    year: "Ongoing"
  },
  {
    icon: Star,
    title: "Expert Seminars",
    description: "Regular workshops by industry professionals",
    year: "Monthly"
  }
];

const stats = [
  { number: "8+", label: "Years Experience" },
  { number: "5000+", label: "Happy Clients" },
  { number: "1000+", label: "Students Trained" },
  { number: "50+", label: "Expert Stylists" }
];

export default function About() {
  const [location, setLocation] = useLocation();

  const handleContactUs = () => {
    // Check if contact section exists on current page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to contact page if not on home
      setLocation('/contact');
    }
  };

  const handleViewAcademy = () => {
    setLocation('/academy');
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4" data-testid="badge-about">
            About Us
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Beauty Legacy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Saimaya Beauty Parlour has been transforming lives through beauty for over 8 years. 
            We're not just a salon, but a destination for excellence, education, and empowerment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
              Excellence in Beauty & Education
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded with a vision to redefine beauty standards, Saimaya Beauty Parlour has grown 
              into a premier destination for luxury beauty services and professional education. Our 
              journey began with a passion for enhancing natural beauty and has evolved into a 
              comprehensive beauty ecosystem.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our academy stands as a testament to our commitment to the beauty industry, having 
              trained over 1000 aspiring makeup artists who now work professionally across the country. 
              We take pride in our achievements at various beauty shows and our continuous efforts 
              to stay ahead of industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleContactUs} data-testid="button-contact-us">
                <Heart className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" onClick={handleViewAcademy} data-testid="button-view-academy">
                <GraduationCap className="mr-2 h-4 w-4" />
                View Academy
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img
              src={academyImage}
              alt="Saimaya Beauty Academy classroom"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <Award className="h-8 w-8 mb-2" />
              <p className="font-bold text-lg">Award Winning</p>
              <p className="text-sm opacity-90">Beauty Academy</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover-elevate" data-testid={`card-stat-${index}`}>
              <CardContent className="pt-6">
                <p className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
            Our Achievements & Recognition
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="text-center hover-elevate" data-testid={`card-achievement-${index}`}>
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription className="text-sm">{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.year}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}