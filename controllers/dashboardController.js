import Record from "../models/Record.js";


export const getDashboard = async (req, res) => {
  try {
    const totals = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach(t => {
      if (t._id === "income") totalIncome = t.total;
      if (t._id === "expense") totalExpense = t.total;
    });

    const categoryTotals = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    const recent = await Record.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    const monthly = await Record.aggregate([
      {
        $group: {
          _id: { $month: { $ifNull: ["$date", new Date()] } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recent,
      monthlyTrends: monthly
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};