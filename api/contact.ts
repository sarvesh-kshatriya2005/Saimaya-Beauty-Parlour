import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "../server/storage";
import { insertContactInquirySchema, insertAppointmentSchema } from "../shared/schema";
import { z } from "zod";

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