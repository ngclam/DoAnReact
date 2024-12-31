import express from "express";
import {
  placeOrder,
  placeOrderMomo,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//Tính năng admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Tính năng thanh toán
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/momo", authUser, placeOrderMomo);

//Tính năng người dùng
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
