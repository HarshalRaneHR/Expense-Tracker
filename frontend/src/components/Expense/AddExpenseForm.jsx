import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onExpenseIncome }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectIcon) => handleChange("icon", selectIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        placeholder="Freelance, Salary, etc"
        label="expense category"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        placeholder=""
        label="Amount"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        placeholder=""
        label="Date"
        type="date"
      />
      <div className="mt-6 flex justify-end">
        <button
          className="add-btn add-btn-fill"
          onClick={() => onExpenseIncome(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
