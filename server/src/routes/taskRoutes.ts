import { Router } from 'express'
import { addTaskController, deleteTaskController, editTaskController, fetchAllTaskController } from '../controller/taskController'
import { authMiddleware } from '../middleware/userMiddleware'

const router = Router()

router.use(authMiddleware)

router.route('/add-task').post(addTaskController)

router.route('/fetch-all-tasks/:sort').get(fetchAllTaskController)

router.route('/delete-task/:id').delete(deleteTaskController)

router.route('/edit-task/:id').put(editTaskController)

export default router