const Income = require("../models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, amount, source, date } = req.body;

    if (!amount || !source || !date)
      return res.status(400).json({ message: "All fields are required" });

    const newIncome = new Income({
      userId,
      amount,
      source,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding income", error: error.message });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting income", error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting income", error: error.message });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error downloading file", error: error.message });
  }
};
