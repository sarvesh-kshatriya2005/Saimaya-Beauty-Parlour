import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Scissors, Sparkles, Heart, Users, GraduationCap } from "lucide-react";
import bridalImage from "@assets/generated_images/bridal_makeup_transformation_f77e8d1a.png";
import nailImage from "@assets/generated_images/elegant_nail_art_showcase_a17e36cd.png";
import skincareImage from "@assets/generated_images/luxury_skincare_treatment_108301b2.png";
import hairstyleImage from "@assets/generated_images/elegant_hairstyling_showcase_7e766517.png";

const services = [
  {
    icon: Heart,
    title: "Bridal Makeup",
    description: "Complete bridal transformation with traditional and contemporary styles",
    image: bridalImage,
    features: ["Pre-bridal consultation", "Trial makeup session", "Wedding day service", "Touch-up kit"],
    price: "Starting from ₹15,000",
    popular: true
  },
  {
    icon: Scissors,
    title: "Hair Styling",
    description: "Professional hairstyling for all occasions and hair types",
    image: hairstyleImage,
    features: ["Bridal updos", "Party styles", "Hair treatments", "Styling consultation"],
    price: "Starting from ₹2,500"
  },
  {
    icon: Sparkles,
    title: "Nail Art",
    description: "Creative nail designs and professional nail care services",
    image: nailImage,
    features: ["Custom nail art", "Gel polish", "Nail extensions", "Nail health treatments"],
    price: "Starting from ₹800"
  },
  {
    icon: Palette,
    title: "Skincare & Facials",
    description: "Rejuvenating treatments for healthy, glowing skin",
    image: skincareImage,
    features: ["Deep cleansing facials", "Anti-aging treatments", "Skin consultation", "Home care routine"],
    price: "Starting from ₹1,200"
  },
  {
    icon: Users,
    title: "Party Makeup",
    description: "Glamorous makeup for special occasions and events",
    image: bridalImage,
    features: ["Event makeup", "Photography makeup", "Group bookings", "Makeup touch-ups"],
    price: "Starting from ₹3,500"
  },
  {
    icon: GraduationCap,
    title: "Makeup Classes",
    description: "Learn professional makeup techniques from certified experts",
    image: bridalImage,
    features: ["Basic to advanced courses", "Certificate programs", "Personal consultation", "Practice sessions"],
    price: "Starting from ₹8,000"
  }
];

export default function Services() {
  const handleLearnMore = (serviceName: string) => {
    console.log(`Learn more about ${serviceName} clicked`);
  };

  const handleBookService = (serviceName: string) => {
    console.log(`Book ${serviceName} clicked`);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4" data-testid="badge-services">
            Our Services
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Premium Beauty Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of beauty services designed to enhance your natural beauty 
            and confidence. Each service is delivered by our expert team using premium products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover-elevate overflow-hidden" data-testid={`card-service-${index}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <Sparkles className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-primary text-lg mb-4">{service.price}</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleBookService(service.title)}
                        data-testid={`button-book-${index}`}
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLearnMore(service.title)}
                        data-testid={`button-learn-${index}`}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}