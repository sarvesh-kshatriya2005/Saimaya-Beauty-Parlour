import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the button after 3 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip briefly
      setTimeout(() => setShowTooltip(true), 500);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = "Hi! I'd like to know more about your beauty services and book an appointment.";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 w-48 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg border border-border text-sm animate-in slide-in-from-bottom-2">
          <div className="relative">
            Need help? Chat with us!
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1 -right-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
        </div>
      )}
      
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        data-testid="floating-whatsapp"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>
    </div>
  );
}