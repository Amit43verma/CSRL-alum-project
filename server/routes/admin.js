const express = require("express")
const User = require("../models/User")
const sendEmail = require("../utils/email")
const { authenticate, requireAdmin } = require("../middleware/auth")

const router = express.Router()

// --- NEW ROUTE: Get Admin Stats ---
router.get("/stats", authenticate, requireAdmin, async (req, res) => {
  try {
    // Count users based on their status
    const totalUsers = await User.countDocuments({ approvalStatus: "approved" })
    const pendingUsers = await User.countDocuments({ approvalStatus: "pending" })

    res.json({
      totalUsers,
      pendingUsers
    })
  } catch (err) {
    console.error("Stats error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all users pending admin approval
router.get("/pending-users", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ approvalStatus: "pending" })
      .select("name email batch center createdAt")
      .sort({ createdAt: 1 })

    res.json(users) // Changed from { users } to users to match your frontend expected array format
  } catch (err) {
    console.error("List pending users error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// Approve a user registration
router.post("/approve-user/:id", authenticate, requireAdmin, async (req, res) => {
  // Note: Changed route from /approve/:id to /approve-user/:id to match frontend
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { approvalStatus: "approved", rejectionReason: null } },
      { new: true },
    )

    if (!user) return res.status(404).json({ message: "User not found" })

    try {
      await sendEmail({
        email: user.email,
        subject: "Registration Approved - Alumni Portal",
        html: `<p>Hi ${user.name},</p>
               <p>Your registration has been approved. You can now sign in and start using the Alumni Portal.</p>
               <p>Best regards,<br/>CSRL Alumni Team</p>`,
      })
    } catch (emailErr) {
      console.error("Approval email error:", emailErr)
    }

    res.json({ message: "User approved successfully" })
  } catch (err) {
    console.error("Approve user error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// Reject a user registration
router.post("/reject-user/:id", authenticate, requireAdmin, async (req, res) => {
  // Note: Changed route from /reject/:id to /reject-user/:id to match frontend
  try {
    const { reason } = req.body || {}
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { approvalStatus: "rejected", rejectionReason: reason || null } },
      { new: true },
    )

    if (!user) return res.status(404).json({ message: "User not found" })

    try {
      await sendEmail({
        email: user.email,
        subject: "Registration Rejected - Alumni Portal",
        html: `<p>Hi ${user.name},</p>
               <p>We’re sorry, but your registration request was not approved at this time${reason ? ` for the following reason: <em>${reason}</em>` : "."}</p>
               <p>If you believe this is a mistake, please reply to this email.</p>
               <p>Best regards,<br/>CSRL Alumni Team</p>`,
      })
    } catch (emailErr) {
      console.error("Rejection email error:", emailErr)
    }

    res.json({ message: "User rejected successfully" })
  } catch (err) {
    console.error("Reject user error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router