const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
    familyId: { type: String },
    memberId: { type: String },
    transactionDate: { type: Date },
    category: { type: String },
    amount: { type: Number},
    income: { type: Number },
    savings: { type: Number },
    monthlyExpenses: { type: Number },
    loanPayments: { type: Number },
    creditCardSpending: { type: Number },
    dependents: { type: Number },
    financialGoalsMet: { type: Number }
  });

module.exports = mongoose.model('Family', FamilySchema);
