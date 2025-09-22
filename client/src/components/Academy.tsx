import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, Tag, BookOpen, Award } from "lucide-react";
import academyImage from "@assets/generated_images/beauty_academy_classroom_e4cf4d85.png";
import { useLocation } from "wouter";

const courses = [
  {
    title: "Professional Makeup Artistry",
    duration: "3 Months",
    level: "Beginner to Advanced",
    students: "15 per batch",
    description: "Complete makeup training covering bridal, party, and editorial makeup techniques",
    modules: ["Basic makeup techniques", "Bridal makeup mastery", "Color theory", "Client consultation", "Business skills"],
    price: "₹25,000",
    certificate: true
  },
  {
    title: "Bridal Makeup Specialist",
    duration: "1.5 Months",
    level: "Intermediate",
    students: "12 per batch",
    description: "Intensive bridal makeup course with traditional and contemporary styles",
    modules: ["Bridal makeup styles", "Hair styling", "Draping techniques", "Photography makeup", "Portfolio building"],
    price: "₹18,000",
    certificate: true
  },
  {
    title: "Nail Art & Design",
    duration: "1 Month",
    level: "Beginner",
    students: "10 per batch",
    description: "Learn creative nail art techniques and professional nail care",
    modules: ["Basic nail care", "Gel application", "Nail art designs", "3D nail art", "Nail health"],
    price: "₹12,000",
    certificate: true
  },
  {
    title: "Hair Styling Workshop",
    duration: "2 Weeks",
    level: "All levels",
    students: "8 per batch",
    description: "Intensive workshop on contemporary and traditional hairstyling",
    modules: ["Hair cutting basics", "Styling techniques", "Bridal updos", "Hair treatments", "Trend analysis"],
    price: "₹8,000",
    certificate: false
  }
];

const features = [
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from certified professionals with years of industry experience"
  },
  {
    icon: Tag,
    title: "Certification",
    description: "Get recognized certificates that boost your professional credibility"
  },
  {
    icon: BookOpen,
    title: "Practical Training",
    description: "Hands-on learning with real clients and professional equipment"
  },
  {
    icon: Award,
    title: "Job Placement",
    description: "Career guidance and placement assistance for graduating students"
  }
];

export default function Academy() {
  const [location, setLocation] = useLocation();

  const handleEnrollNow = (courseName: string) => {
    // Open WhatsApp with course-specific message
    const message = `Hi! I'm interested in enrolling for the ${courseName} course. Can you please share more details?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  const handleViewDetails = (courseName: string) => {
    // Check if contact section exists on current page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to contact page if not on home
      setLocation('/contact');
    }
  };

  const handleContactAcademy = () => {
    // Check if contact section exists on current page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to contact page if not on home
      setLocation('/contact');
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4" data-testid="badge-academy">
            Academy
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Saimaya Beauty Academy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your passion for beauty into a professional career. Join our certified courses 
            and learn from industry experts in a state-of-the-art learning environment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
              Learn from the Best
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our academy offers comprehensive beauty education with a focus on practical skills 
              and industry readiness. With over 1000 successful graduates, we've established 
              ourselves as a leading beauty education institute.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3" data-testid={`feature-${index}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button size="lg" onClick={handleContactAcademy} data-testid="button-contact-academy">
              <GraduationCap className="mr-2 h-5 w-5" />
              Contact Academy
            </Button>
          </div>
          
          <div className="relative">
            <img
              src={academyImage}
              alt="Saimaya Beauty Academy classroom"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Courses */}
        <div>
          <h3 className="font-serif text-3xl font-bold text-center text-foreground mb-12">
            Our Courses & Programs
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-course-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-base">{course.description}</CardDescription>
                    </div>
                    {course.certificate && (
                      <Badge variant="secondary" className="ml-2">
                        <Tag className="h-3 w-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">{course.students}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-primary text-lg">{course.price}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Course Modules:</h4>
                    <ul className="space-y-1">
                      {course.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="h-1 w-1 bg-primary rounded-full mr-2" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Button
                      size="sm"
                      onClick={() => handleEnrollNow(course.title)}
                      data-testid={`button-enroll-${index}`}
                    >
                      Enroll Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(course.title)}
                      data-testid={`button-details-${index}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}