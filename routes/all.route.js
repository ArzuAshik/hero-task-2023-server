const authControllers = require("../controllers/auth.controller");
const billControllers = require("../controllers/bills.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

router.route("/registration")
    .post(authControllers.signup);
router.route("/login")
    .post(authControllers.login);
    
router.use(verifyToken);
router.route("/billing-list")
    .get(billControllers.getAllBills);

router.route("/add-billing")
    .post(billControllers.addBill);

router.route("/update-billing/:id")
    .patch(billControllers.updateBill);

router.route("/delete-billing/:id")
    .delete(billControllers.deleteBill);

module.exports = router;