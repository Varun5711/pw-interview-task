import { addRow } from "../config/sheet.js";

const submitController = async (req, res) => {
    try {
      const { fullName, address, mobile, email, gender } = req.body;
  
      if (!fullName || !address || !mobile || !email || !gender) {
        return res.status(400).json({ error: "Missing fields" });
      }
  
      await addRow([fullName, address, mobile, email, gender]);
  
      res.status(200).json({ success: true, message: "Data added to sheet" });
    } catch (error) {
      console.error("Error adding row:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default submitController;