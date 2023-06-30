const { Router } = require("express")
const authRequire = require('../middlewares/ValidateToken')
const { CreateTasks, DeleteTasks, UpdateTasks, getTask, getTasks } = require("../controllers/task.controllers");
const createTaskSchema = require('../schemas/task.schema')
const ValidateSchema = require('../middlewares/Validator.middleware')

const router = Router();

router.get("/task", authRequire, getTasks);
router.get("/task/:id", authRequire, getTask);
router.post("/task", authRequire, ValidateSchema(createTaskSchema), CreateTasks);
router.delete("/task/:id", authRequire, DeleteTasks);
router.put("/task/:id", authRequire, UpdateTasks);

module.exports = router;
