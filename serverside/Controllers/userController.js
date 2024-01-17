const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already exists");

    if (!name || !email || !password)
      return res.status(400).json("All fields are required");

    if (!validator.isEmail(email)) return res.status(400).json("Invalid email");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password not strong enough");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json("Invalid email or password");

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { registerUser, loginUser };
