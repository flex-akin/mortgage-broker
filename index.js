const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const db = require("./models")
const dotenv = require("dotenv");

app.use(cors());
dotenv.config();

app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true })); //


app.get("/", (req, res) => {
  res.json({ message: "Server is online and connected" });
});

const realtor = require("./routes/realtor.routes");
app.use("/api/realtor", realtor);

const transaction = require("./routes/transaction.routes");
app.use("/api/transaction", transaction);

const PORT = process.env.PORT

db.sequelize.sync().then((res) => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
      });
})
