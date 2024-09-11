const connection = require("../db/connection");

const getAllTask = (req, res) => {
  connection.query(
    "SELECT * FROM todo WHERE user_id=?",
    [req.user_id],
    (err, results) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.json(results);
      }
    }
  );
};

const addTask = (req, res) => {
  let data = req.body;
  console.log(data);
  connection.query(
    "INSERT INTO todo (title,description,user_id) VALUES (?,?,?)",
    [data.title, data.description, req.user_id],
    (err, results) => {
      if (err) {
        res.status(500).send("Error: " + err);
      } else {
        res.send("Task created successfully");
      }
    }
  );
};

const updateTask = (req, res) => {
  const {
    title,
    description,
    status,
    started_at,
    completed_at,
    due_at,
  } = req.body;

  const updateFields = {
    title,
    description,
    status,
    started_at,
    completed_at,
    due_at,
  };

  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] === undefined || updateFields[key] === null) {
      delete updateFields[key];
    }
  });

  const updateValues = Object.values(updateFields);
  console.log(updateValues);
  console.log(
    "UPDATE todo SET " +
      Object.keys(updateFields)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE id = ? AND user_id = ?"
  );
  console.log(req.params.id, req.user_id);
  connection.query(
    "UPDATE todo SET " +
      Object.keys(updateFields)
        .map((key) => `${key} = ?`)
        .join(", ") +
      " WHERE id = ? AND user_id = ?",
    [...updateValues, req.params.id, req.user_id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          msg: "Internal Server Error",
        });
      }
      if (results.affectedRows === 0) {
        res.status(500).send("Error updating");
      } else {
        res.send("Updated successfully");
      }
    }
  );
};

const deleteTask = (req, res) => {
  let data = [req.params.id, req.user_id];
  connection.query(
    "DELETE FROM todo WHERE id =? AND user_id =?",
    data,
    (err, results) => {
      if (err) {
        res.status(500).send("Could not delete");
      } else {
        res.send("Deleted successfully  ");
      }
    }
  );
};

module.exports = { getAllTask, addTask, deleteTask, updateTask };
