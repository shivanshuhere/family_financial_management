import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const registerUser =  async (req, res) => {
  try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      return res.json({ message: "User registered successfully!" });
  } catch (error) {
    return res.json({ message: "User registered failed !", error });
    
  }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password!" });
    
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token, message: "User login successfully !" });
    } catch (error) {
    return res.json({ message: "User login  failed !", error });
        
    }
};

export {registerUser, loginUser}
