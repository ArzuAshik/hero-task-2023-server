const { Bill } = require("../models/Bill");

exports.getAllBills = async (req, res, next) => {
  let { page = "1", limit = "10", search = "" } = req.query;
  console.log(search);
  page = Number(page);
  limit = Number(limit);
  const query = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const data = await Bill.find(query)
      .sort()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const documentCount = await Bill.countDocuments(query);
    const [amount] = await Bill.aggregate([
      { $group: { _id: null, paidTotal: { $sum: "$paidAmount" } } },
    ]);

    res.status(200).json({
      documentCount,
      totalPage: Math.ceil(documentCount / limit),
      currentPage: page,
      paidTotal: amount?.paidTotal || 0,
      data,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.addBill = async (req, res, next) => {
  try {
    const result = await Bill.create(req.body);
    res.json(result);
  } catch (error) {
    res.json({ error, msg: "error" });
  }
};

exports.updateBill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Bill.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Bill info updated successfully.",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Bill info update failed.",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.deleteBill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Bill.deleteOne({ _id: id });
    res.status(200).json(result);
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Bill deleted successfully.",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Bill delete failed.",
      });
    }
  } catch (error) {
    res.send(error);
  }
};
