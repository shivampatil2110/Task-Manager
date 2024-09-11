const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.connection = require("./db/connection");
const taskRoutes = require("./routes/taskRoutes");
const usersRoutes = require("./routes/usersRoutes");
const redisClient = require("./db/redis");
const connectRedis = require("connect-redis");
const cookieParser = require("cookie-parser");

const RedisStore = connectRedis(session);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cookieParser());
app.use(
  session({
    name: "session_id",
    secret: "Secret Key",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
  })
);

app.use("/task", taskRoutes);
app.use("/", usersRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
