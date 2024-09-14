const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email has been used
  if (!name || !email || !password) {
    res.status(401).json({
      message: "You need to enter all the fields!",
    });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User already exist",
    });
  }

  //Don't save the word password. You need to hash it up!
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Now create the user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
};

const loginUser = async (req, res) => {
  // Get the email and the password
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

//Generate JWT Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = {
  registerUser,
  loginUser,
};
