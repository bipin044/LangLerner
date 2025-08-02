import User from "../models/User.js";

export const removeFriendController = async (req, res) => {
  try {
    const userId = req.user._id; // or req.user.id depending on your auth
    const friendId = req.params.id;

    // Remove friendId from user's friends array
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

    // Remove userId from friend's friends array (optional, for two-way friendship)
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    res.json({ success: true, message: "Friend removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove friend" });
  }
};