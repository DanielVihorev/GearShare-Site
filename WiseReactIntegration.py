import axios from "axios";

const createPayment = async () => {
  try {
    const response = await axios.post("http://your-api-url/payments/", {
      recipient_id: "recipient123",
      amount: 100.0,
      currency: "USD",
    });
    console.log("Payment Response:", response.data);
  } catch (error) {
    console.error("Error creating payment:", error);
  }
};

createPayment();