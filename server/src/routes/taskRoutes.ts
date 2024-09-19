import { Router } from 'express'
import { addTaskController, deleteTaskController, fetchAllTaskController } from '../controller/taskController'
import { authMiddleware } from '../middleware/userMiddleware'

const router = Router()

router.use(authMiddleware)

router.route('/add-task').post(addTaskController)

router.route('/fetch-all-tasks').get(fetchAllTaskController)

router.route('/delete-task/:id').delete(deleteTaskController)

export default router