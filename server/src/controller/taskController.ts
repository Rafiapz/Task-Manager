import { Request, Response } from 'express'
import { taskValidation } from '../validation/taskValidation'
import Tasks from '../model/tasksModel'


export const addTaskController = async (req: Request, res: Response) => {

    try {
        const { value, error } = taskValidation.validate(req?.body)
        if (error) {
            throw new Error(error?.message)
        }
        value.userId = req?.user?._id
        const result = await Tasks.create(value)
        if (!result) {
            throw new Error('Failed to add task')
        }

        res.status(200).json({ status: 'success', data: result })

    } catch (error: any) {
        console.log(error)
        if (error?.code === 11000) {
            res.status(500).json({ status: 'error', message: 'The title you entered is already in use. Please choose a different title' })
            return
        }
        res.status(500).json({ status: 'error', message: error?.message })
    }
}

export const fetchAllTaskController = async (req: Request, res: Response) => {

    try {

        const data = await Tasks.find({ userId: req?.user?._id })

        res.status(200).json({ status: 'success', data })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message })
    }
}

export const deleteTaskController = async (req: Request, res: Response) => {
    try {

        const id = req?.params?.id
        const result = await Tasks.deleteOne({ _id: id })
        console.log(result, '==result')
        res.status(200).json({ status: 'success' })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message })
    }
}