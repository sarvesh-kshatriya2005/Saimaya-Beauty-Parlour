import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      // In a real app, you'd send an email here
      console.log("New contact inquiry received:", inquiry);
      
      res.json({ 
        success: true, 
        message: "Thank you for your inquiry! We'll get back to you within 24 hours.",
        inquiryId: inquiry.id 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your form data",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again." 
      });
    }
  });

  // Appointment booking
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      
      // In a real app, you'd send confirmation emails here
      console.log("New appointment booked:", appointment);
      
      res.json({ 
        success: true, 
        message: "Your appointment request has been submitted! We'll contact you to confirm your slot.",
        appointmentId: appointment.id 
      });
    } catch (error) {
      console.error("Appointment booking error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your booking details",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again." 
      });
    }
  });

  // Get all contact inquiries (for admin)
  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Error fetching inquiries" });
    }
  });

  // Get all appointments (for admin)
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Error fetching appointments" });
    }
  });

  // Update appointment status (for admin)
  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const appointment = await storage.updateAppointmentStatus(id, status);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(appointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ message: "Error updating appointment status" });
    }
  });

  // Newsletter signup (simple storage for now)
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ 
          success: false, 
          message: "Please enter a valid email address" 
        });
      }
      
      // In a real app, you'd add to mailing list service
      console.log("Newsletter signup:", email);
      
      res.json({ 
        success: true, 
        message: "Thank you for subscribing! You'll receive our beauty tips and updates." 
      });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
