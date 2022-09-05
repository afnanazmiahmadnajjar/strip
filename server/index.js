const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LeGicIN52kFR3FiN1OPFopdZskt2nXufaDViHe3FHPFZ4MG2kVX8Ctv9ipnkrXuUJf6lONs1hsorLldRg9crGJ300yLaWEVBY"
);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;

  const info = {
    amount: amount,
    currency: "USD",
    description: "American University",
    payment_method: id,
    confirm: true,
  };
  const payment = await stripe.paymentIntents.create(info);
  console.log("Payment", payment);
  res.end();
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "American University",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment.data);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 6002, () => {
  console.log("Sever is listening on port 6002");
});
