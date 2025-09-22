import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  Send,
  Heart
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Bridal Makeup", href: "/services#bridal" },
    { name: "Hair Styling", href: "/services#hair" },
    { name: "Nail Art", href: "/services#nails" },
    { name: "Skincare & Facials", href: "/services#skincare" },
    { name: "Party Makeup", href: "/services#party" }
  ],
  academy: [
    { name: "Makeup Courses", href: "/academy#courses" },
    { name: "Certification Programs", href: "/academy#certification" },
    { name: "Workshops", href: "/academy#workshops" },
    { name: "Career Guidance", href: "/academy#career" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" }
  ]
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return await response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Subscribed!",
        description: response.message,
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      newsletterMutation.mutate(email);
    }
  };

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      Instagram: "https://instagram.com/saimayabeauty",
      Facebook: "https://facebook.com/saimayabeauty", 
      YouTube: "https://youtube.com/saimayaacademy"
    };
    window.open(socialLinks[platform as keyof typeof socialLinks], "_blank", "noopener");
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand & Description */}
            <div className="lg:col-span-1">
              <Link href="/" data-testid="footer-link-home">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-bold text-primary-foreground">S</span>
                  </div>
                  <span className="font-serif text-xl font-bold">
                    Saimaya Beauty Parlour
                  </span>
                </div>
              </Link>
              <p className="text-background/80 mb-6 leading-relaxed">
                Transforming beauty through expert services and professional education. 
                Your journey to enhanced confidence starts here.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">info@saimayabeauty.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">123 Beauty Street, Fashion District<br />New Delhi, India - 110001</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-serif text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} data-testid={`footer-service-${index}`}>
                      <span className="text-background/80 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academy Links */}
            <div>
              <h3 className="font-serif text-lg font-bold mb-6">Academy</h3>
              <ul className="space-y-3">
                {footerLinks.academy.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} data-testid={`footer-academy-${index}`}>
                      <span className="text-background/80 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="font-serif text-lg font-bold mb-6">Stay Connected</h3>
              <p className="text-background/80 mb-4 text-sm">
                Subscribe to get beauty tips, special offers, and academy updates.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                    data-testid="input-newsletter"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    variant="secondary"
                    disabled={newsletterMutation.isPending}
                    data-testid="button-newsletter"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-medium">Follow Us</h4>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-background hover:text-primary hover:bg-background/10"
                    onClick={() => handleSocialClick('Instagram')}
                    data-testid="footer-social-instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-background hover:text-primary hover:bg-background/10"
                    onClick={() => handleSocialClick('Facebook')}
                    data-testid="footer-social-facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-background hover:text-primary hover:bg-background/10"
                    onClick={() => handleSocialClick('YouTube')}
                    data-testid="footer-social-youtube"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-background/80">
                © 2024 Saimaya Beauty Parlour. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy" data-testid="footer-privacy">
                  <span className="text-background/80 hover:text-primary transition-colors">
                    Privacy Policy
                  </span>
                </Link>
                <Link href="/terms" data-testid="footer-terms">
                  <span className="text-background/80 hover:text-primary transition-colors">
                    Terms of Service
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-background/80">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-primary fill-current" />
              <span>for beautiful people</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}