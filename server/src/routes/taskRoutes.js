const r = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/taskController");

r.use(auth);
r.get("/", c.getTasks);
r.post("/", c.createTask);
r.put("/:id", c.updateTask);
r.delete("/:id", c.deleteTask);

module.exports = r;
