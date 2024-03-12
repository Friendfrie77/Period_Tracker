const jwt = require("jsonwebtoken");
const User = require("../mongoose-schmea/User");
const Guest = require("../mongoose-schmea/Demo");
const GenPeriods = require("../utils/genGuestPeriodInfo");
const mongoose = require("mongoose");

//used to check user role and return the mongoose-schmea name that is needed for functions needed.
function checkUserRole(role) {
  let roleType;
  if (role === "Guest") {
    roleType = Guest;
  } else {
    roleType = User;
  }
  return roleType;
}
const register = async (req, res) => {
  const { email, username, password } = req.body;
  const results = await User.exists({ email: email });
  try {
    if (results) {
      res.status(401).json({ error: "User already exists" });
    } else {
      const user = new User({
        email,
        username,
        password,
        role: "User",
        cycle: "",
        periodStartDate: "",
        periodEndDate: "",
        canBleed: false,
        isBleeding: false,
        notification: false,
        avgLength: "",
        previousPeriod: [],
      });
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          const userId = { id: user._id };
          console.log(userId);
          const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
          const newUser = user.sendUserInfo(user);
          res.status(201).json({ newUser, userId, accessToken });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.messege });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, function (err, username) {
      if (err) {
        res.status(500).json({ error: err.messege });
      } else if (!username) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        username.authPassword(password, function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again later",
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password",
            });
          } else {
            const userId = { id: username._id };
            const accessToken = jwt.sign(
              userId,
              process.env.ACCESS_TOKEN_SECRET
            );
            username.accessToken = accessToken;
            const user = username.sendUserInfo(username);
            res.status(200).json({ accessToken, user, userId });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.messege });
  }
};

const deleteAccount = async (req, res) => {
  let { userRole, userId} = req.body;
  console.log(userRole, userId);
  userRole = checkUserRole(userRole);
  try {
    userRole.deleteOne({ _id: userId }).exec();
    res.status(200).json({ messege: "Account Deleted" });
  } catch {
    res.status(401).json({
      messege: "No account found",
    });
  }
};

const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    res.status(500).json({ messege: "An error has Occurred" });
  } else {
    user.authPassword(oldPassword, function (err, same) {
      if (err) {
        res.status(500).json({ messege: "An error has Occurred" });
      } else if (!same) {
        res.status(401).json({
          error: "Unauthorized",
          message: "Current Password Incorrect",
        });
      } else {
        user.password = newPassword;
        user.save();
        res.status(200).json({ message: "Password Updated" });
      }
    });
  }
};

const demoAccount = async (req, res) => {
  const { username, loggedPeriods } = req.body;
  let user;
  user = new Guest({
    username,
    password: "password",
    role: "Guest",
    cycle: "",
    periodStartDate: "",
    periodEndDate: "",
    canBleed: false,
    isBleeding: false,
    avgLength: "",
  });
  if (!loggedPeriods) {
    let periodInfo = [];
    GenPeriods.genAllPeriods(periodInfo, 4);
    user.previousPeriod = [...periodInfo];
  } else {
    user.previousPeriod = [...loggedPeriods];
  }
  const userId = { id: user._id };
  const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
  const userInfo = user.sendUserInfo(user);
  res.status(200).json({ accessToken, userInfo, userId });
};

module.exports = {
  register,
  login,
  deleteAccount,
  changePassword,
  demoAccount,
};
