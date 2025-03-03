const User = require("../models/User");
const redisCache = require("../config/redisCache");

const getUserProfile = async (user) => {
  const cacheKey = `user.profile=${user.email}`;

  const cachedUser = await redisCache.getUserProfile(cacheKey);
  if (cachedUser) {
    console.log("Serving from cache");
    return cachedUser;
  }

  let userProfile;
  if (user.role === "normalUser") {
    userProfile = await User.findOne({ email: user.email })
      .populate("admin")
      .select("-password");
  } else if (user.role === "admin") {
    userProfile = await User.findOne({ email: user.email })
      .populate("normalUser")
      .select("-password");
  }

  if (!userProfile) return null;
  await redisCache.setUserProfile(cacheKey, userProfile);

  console.log("Serving from db");
  return userProfile;
};

const updateUserProfile = async (user, updatedData) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: user.email },
    updatedData,
    { new: true }
  ).select("-password");

  if (!updatedUser) return null;

  const cacheKey = `user.profile=${user.email}`;
  await redisCache.clearUserProfile(cacheKey);

  return updatedUser;
};

module.exports = { getUserProfile, updateUserProfile };
