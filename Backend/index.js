const express = require("express");
const app = express();
const replay = require("./routes/replay");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors());
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const replayRouter = new replay();
app.use("/replay", replayRouter.getRouter());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

