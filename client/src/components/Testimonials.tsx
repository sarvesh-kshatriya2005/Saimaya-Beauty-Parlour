import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

// todo: remove mock functionality - replace with real testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Saimaya Beauty Parlour made my wedding day absolutely perfect! The bridal makeup was flawless and lasted the entire celebration. The team was professional, punctual, and truly understood my vision.",
    service: "Bridal Makeup"
  },
  {
    id: 2,
    name: "Anita Desai",
    role: "Academy Graduate",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The makeup course at Saimaya Academy transformed my career completely. The instructors are incredibly knowledgeable and the hands-on training gave me the confidence to start my own practice.",
    service: "Academy Training"
  },
  {
    id: 3,
    name: "Kavya Patel",
    role: "Regular Client",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I've been coming to Saimaya for over 2 years for my skincare treatments. The facials are amazing and my skin has never looked better. The staff is always welcoming and professional.",
    service: "Skincare Treatment"
  },
  {
    id: 4,
    name: "Meera Agarwal",
    role: "Party Client",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The party makeup for my sister's engagement was stunning! Everyone kept asking who did my makeup. The attention to detail and the quality of products used is exceptional.",
    service: "Party Makeup"
  },
  {
    id: 5,
    name: "Sunita Joshi",
    role: "Bride's Mother",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Not only did they make my daughter look absolutely radiant, but they also took care of my makeup beautifully. The team is skilled in creating age-appropriate, elegant looks.",
    service: "Family Makeup"
  },
  {
    id: 6,
    name: "Riya Gupta",
    role: "Nail Art Client",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The nail art designs at Saimaya are creative and long-lasting. I always receive compliments on my nails! The hygiene standards and technique are top-notch.",
    service: "Nail Art"
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4" data-testid="badge-testimonials">
            Testimonials
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our happy clients have to say about 
            their experience with Saimaya Beauty Parlour and Academy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex items-center mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                
                <Badge variant="secondary" className="text-xs">
                  {testimonial.service}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of satisfied clients who trust Saimaya for their beauty needs
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary">5000+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary">4.9</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}