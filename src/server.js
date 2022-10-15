const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const Vehicle = require("./model/vehicle.model");

const app = express();

const PORT = process.env.PORT || 3000;

const dbUrl =
  "mongodb+srv://chatBotShahab:open123456@cluster0.t6qrhkx.mongodb.net/test";
const dbOption = { useNewUrlParser: true, useUnifiedTopology: true };

//connect database
mongoose.connect(dbUrl, dbOption);
mongoose.connection.on("connected", () => {
  console.log("Database connected successfully");
});

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to the runtime terror chatbot server" });
});
app.post("/checkBooking", async (req, res) => {
  try {
    const { date } = req.body;
    const vehicle = await Vehicle.findOne({});
    const isBookAvailabel = vehicle.bookingDate.find((ele) => {
      return (ele = date);
    });
    if (!isBookAvailabel) {
      return res
        .status(200)
        .json({ status: true, message: "vehicle is availabel" });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "vehicle is not availabel" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { date } = req.body;
    const vehicle = await Vehicle.findOne({});
    vehicle.bookingDate.push(date);
    const resp = await vehicle.save();
    return res.status(200).json({
      status: true,
      message: `your booking is successfully done with vehicle name ${vehicle.name} on ${date} with booking No is ${vehicle._id}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

app.post("/bookingStatus", async (req, res) => {
  try {
    const { id, date } = req.body;
    const vehicle = await Vehicle.findById(id);
    const checkBooking = vehicle.bookingDate.find((ele) => {
      return (ele = date);
    });

    if (checkBooking) {
      return res.status(200).json({
        status: true,
        message: `you have booking with us on ${date}`,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: `you do not have booking with us on ${date}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});
app.get("/getAllVehicle", (req, res) => {});
app.post("/getAvailable", (req, res) => {});

//vehicle routes
app.post("/addVehicle", async (req, res) => {
  const { name, image } = req.body;
  const newVehicle = new Vehicle({
    name,
    image,
  });
  const resp = await newVehicle.save();
  return res.status(201).json({
    status: true,
    message: "Vehicle created successfullt",
    data: resp,
  });
});

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
