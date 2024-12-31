import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//Đặt hàng ship COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(
      userId,
      { cartData: {} },

      res.json({ success: true, message: "Đã đặt hàng" })
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Đặt hàng thanh toán Momo
const placeOrderMomo = async (req, res) => {



};

//Dữ liệu đơn hàng ở trang admin
const allOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({});
    res.json({success:true,orders})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

};

//Dữ liệu người mua của đơn hàng ở Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Cập nhật trạng thái đơn hàng từ admin
const updateStatus = async (req, res) => {
  try {

    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({success:true,message:'Cập nhật trạng thái'})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

export { placeOrder, placeOrderMomo, allOrders, userOrders, updateStatus };
