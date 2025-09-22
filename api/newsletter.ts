import { VercelRequest, VercelResponse } from "@vercel/node";
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