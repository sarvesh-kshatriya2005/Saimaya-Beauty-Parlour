
import { storage } from "../server/storage";
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