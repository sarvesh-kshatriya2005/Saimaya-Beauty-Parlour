import { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";
import { insertAppointmentSchema } from "../shared/schema";
import { z } from "zod";

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