import Razorpay from "razorpay";

let razorpayInstance;

export const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log(
      "INIT RAZORPAY:",
      process.env.RAZORPAY_KEY_ID,
      process.env.RAZORPAY_KEY_SECRET
    );
  }
  return razorpayInstance;
};
