const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  familyId: { type: String },
  memberId: { type: String },
  transactionDate: { type: Date  },
  category: { type: String  },
  amount: { type: Number },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
