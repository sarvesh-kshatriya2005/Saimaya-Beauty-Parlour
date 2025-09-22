import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, User } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export default function AppointmentModal({ isOpen, onClose, selectedService = "" }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: selectedService,
    preferredDate: "",
    message: ""
  });

  const { toast } = useToast();

  const appointmentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return await response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Appointment Requested!",
        description: response.message,
      });
      // Reset form and close modal
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        service: "",
        preferredDate: "",
        message: ""
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appointmentMutation.mutate(formData);
  };

  const services = [
    "Bridal Makeup",
    "Hair Styling", 
    "Nail Art",
    "Skincare & Facials",
    "Party Makeup",
    "Makeup Classes"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-primary" />
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            Fill out your details and we'll contact you to confirm your appointment slot.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="pl-10"
                required
                data-testid="input-client-name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email *</Label>
            <Input
              id="clientEmail"
              name="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              data-testid="input-client-email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone Number</Label>
            <Input
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              data-testid="input-client-phone"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Service *</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
              data-testid="select-service"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                placeholder="e.g., Next Saturday morning, December 15th, etc."
                className="pl-10"
                data-testid="input-preferred-date"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any special requirements, questions, or preferences..."
              rows={3}
              data-testid="textarea-message"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={appointmentMutation.isPending}
              data-testid="button-book"
            >
              {appointmentMutation.isPending ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}