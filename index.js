const express = require("express");
const easypay = require("./utils/easypay");
const app = express();
const port = process.env.PORT || 3231;
app.use(express.json());

app.post("/payment/generatelink", (req, res) => {
  const payload = req.body;
  try {
    const response = easypay.generatePayload(
      payload,
      process.env.environment === "prod" ? false : false
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: "Some Error Occured" });
  }
});

app.post("/payment/verify", (req, res) => {
  res.send("In Progress");
});

app.listen(port, () => {
  console.log(`ICICI Easypay Interface Service Started on Port ${port}`);
});
