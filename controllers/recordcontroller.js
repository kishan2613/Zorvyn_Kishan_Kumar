import Record from "../models/Record.js";
import mongoose from "mongoose";

export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        success: false,
        msg: "Amount, type and category are required"
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        msg: "Type must be income or expense"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        msg: "Amount must be greater than 0"
      });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      note,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: record,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;

    const records = await Record.find(filter)
    .skip((page-1)*limit)
    .limit(limit);

    res.json({
      success: true,
      count: records.length,
      data: records,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Check valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedRecord,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



// ✅ DELETE RECORD
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Check valid ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    await Record.findByIdAndDelete(id);

    res.json({
      success: true,
      msg: "Record deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};