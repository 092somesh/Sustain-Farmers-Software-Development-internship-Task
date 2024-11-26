const express = require('express');
const router = express.Router();
const Family = require('../models/Family');

// Add or Update Family
router.post('/upsert', async (req, res) => {
  const { familyId, income, savings, dependents } = req.body;
  try {
    const family = await Family.findOneAndUpdate(
      { familyId },
      { income, savings, dependents },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, family });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
