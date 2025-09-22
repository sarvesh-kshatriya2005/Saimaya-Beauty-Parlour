import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_beauty_salon_interior_b6eb8dca.png";

export default function Hero() {
  const handleBookAppointment = () => {
    console.log('Book appointment clicked');
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury beauty salon interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="flex min-h-[80vh] items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-accent font-medium text-sm uppercase tracking-wide">
                Premium Beauty Experience
              </span>
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Beauty with{" "}
              <span className="font-script text-accent text-6xl lg:text-7xl">
                Saimaya
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Experience the finest in bridal makeup, hairstyling, nail art, and skincare. 
              Our expert team and prestigious academy deliver luxury beauty services that 
              enhance your natural radiance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleBookAppointment}
                data-testid="button-hero-book"
              >
                Book Your Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground backdrop-blur-sm"
                onClick={handleLearnMore}
                data-testid="button-hero-learn"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}