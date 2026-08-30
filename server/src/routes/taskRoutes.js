const r=require("express").Router();
const a=require("../middleware/auth");
const c=require("../controllers/taskController");
r.use(a);
r.get("/",c.list);
r.post("/",c.create);
r.put("/:id",c.update);
r.delete("/:id",c.remove);
module.exports=r;
