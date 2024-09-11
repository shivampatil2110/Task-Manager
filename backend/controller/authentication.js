const express = require("express");
const connection = require("../db/connection");
const bcrypt = require("bcrypt");
const redisClient = require("../db/redis");
const validator = require("email-validator");
const app = express();
// const jwt = require("jsonwebtoken");
app.use(express.json());

const userInfo = (req, res) => {
  console.log(req.session);
  connection.query(
    "SELECT * FROM users WHERE id=?",
    req.user_id,
    (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send(results);
      }
    }
  );
};

const signUp = (req, res) => {
  const data = req.body;
  connection.query(
    "SELECT email FROM users WHERE email=?",
    [data.email],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      }
      if (result.length > 0) {
        console.log(result);
        res.status(403).json({
          message: "Email already exists",
        });
      } else {
        const isValid = validator.validate(data.email);
        if (!isValid) {
          return res.status(422).json({
            msg: "Invalid email",
          });
        }
        bcrypt.hash(data.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              msg: "Internal server error",
            });
          } else {
            connection.query(
              "INSERT INTO users (name, email, password) values (?,?,?)",
              [data.name, data.email, hash],
              (err, results) => {
                if (err) {
                  res.status(500).json({
                    msg: "Internal server error",
                  });
                } else {
                  console.log(results);
                  console.log(req.session);
                  res.send(results);
                }
              }
            );
          }
        });
      }
    }
  );
};

// ---------------------  Login using jwt tokens  -------------------
// const login = (req, res) => {
//   const user = req.body;

//   connection.query(
//     "SELECT * FROM users WHERE email=?",
//     [user.email],
//     (err, results) => {
//       if (results.length > 0) {
//         bcrypt.compare(user.password, results[0].password, (err, result) => {
//           if (!result) {
//             return res.status(401).json({
//               msg: "Invalid password",
//             });
//           }
//           if (result) {
//             const userData = {
//               name: results[0].name,
//               email: results[0].email,
//               id: results[0].id,
//             };
//             const token = jwt.sign(userData, "Secret Key");
//             res.cookie("jwt", token, {
//               maxAge: 60 * 60 * 1000,
//               httpOnly: true,
//             });
//             res.send({
//               name: userData.name,
//               email: userData.email,
//               id: userData.id,
//               token: token,
//             });
//             console.log(res);
//           }
//         });
//       } else {
//         res.status(401).json({
//           msg: "No results found",
//         });
//       }
//     }
//   );
// };

// -------------------     Login using session      ------------------------
const login = (req, res) => {
  const user = req.body;
  const isValid = validator.validate(user.email);
  if (!isValid) {
    return res.status(422).send("Not valid email address");
  }

  connection.query(
    "SELECT * FROM users WHERE email=?",
    [user.email],
    (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      }
      if (results.length > 0) {
        bcrypt.compare(user.password, results[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              msg: "Internal Server Error",
            });
          }
          if (!result) {
            return res.status(401).json({
              msg: "Invalid password",
            });
          }
          if (result) {
            const userData = {
              name: results[0].name,
              email: results[0].email,
              id: results[0].id,
            };
            redisClient.set(req.sessionID, userData.id, "EX", 3600);
            res.cookie("sessionID", req.sessionID, {
              maxAge: 60 * 60 * 1000,
              httpOnly: false,
            });
            res.send({
              name: userData.name,
              email: userData.email,
              id: userData.id,
              token: req.sessionID,
            });
            // console.log(req);
          }
        });
      } else {
        res.status(401).json({
          msg: "Email does not exist",
        });
      }
    }
  );
};

const logout = (req, res) => {
  const cookie = req.cookies.sessionID;
  console.log(cookie);
  redisClient.del(cookie);
  console.log(req);
  res.clearCookie("sessionID");
  res.send("logged out successfully");
};

const updatePassword = (req, res) => {
  const user = req.body;
  const id = req.user_id;
  connection.query(
    `SELECT password FROM users WHERE id=?`,
    [id],
    (err, result) => {
      if (err) {
        res.status(404).json({
          msg: "User does not exist",
        });
      }
      bcrypt.compare(
        user.current_password,
        result[0].password,
        (err, result) => {
          if (err) {
            res.status(500).json({
              msg: "Internal Error",
            });
          }
          if (!result) {
            return res.status(401).json({
              msg: "Invalid current password",
            });
          } else {
            bcrypt.hash(user.password, 10, (err, hash) => {
              if (err) {
                res.status(500).send("Internal Server Error");
              } else {
                connection.query(
                  "UPDATE users SET password=? WHERE id=?",
                  [hash, id],
                  (err, result) => {
                    if (err) {
                      res.status(500).send("server error");
                    } else {
                      res.send("Updated password");
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  );
};

module.exports = { signUp, userInfo, login, logout, updatePassword };
