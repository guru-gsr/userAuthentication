import User from "../models/User.models.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: " No user found" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log("Error occures ", error);
  }
  //console.log("USER" ,existingUser);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! login instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  let user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
   // console.log("THis is ", user);
    await user.save();
  } catch (error) {
    console.log("Not saving ", error);
  }
   return res.status(201).json({ user });
};
