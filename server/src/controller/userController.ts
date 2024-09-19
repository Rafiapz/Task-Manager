import { Request, Response } from 'express'
import Users from '../model/userModel'
import { generateToken } from '../services/jwt'
import { validatePassword, hashPassword } from '../services/bcrypt'
import { signupValidation } from '../validation/signupValidation'
import { loginValidation } from '../validation/loginValidation'


export const signupController = async (req: Request, res: Response) => {
    try {

        const { value, error } = signupValidation.validate(req?.body)

        if (error) {
            throw new Error(error?.message)
        }

        value.password = await hashPassword(value.password)
        const result: any = await Users.create(value)
        if (result) {
            const token = generateToken({ email: result?.email, _id: result?._id })
            res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true })
            res.status(200).json({ status: 'success' })

        } else {
            throw new Error('Failed to create user')
        }

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message || 'internal server error' })
    }
}

export const loginController = async (req: Request, res: Response) => {

    try {

        const { value, error } = loginValidation.validate(req?.body)

        if (error) {
            throw new Error(error?.message)
        }

        const data = await Users.findOne({ email: value?.email })
        if (!data) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' })
            return
        }

        const match = await validatePassword(value?.password, data?.password)

        if (!match) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' })
            return
        }

        const token = generateToken({ email: data?.email, _id: data?._id })
        res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "none", secure: true })
        res.status(200).json({ status: 'success' })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message })
    }
}

export const fetchUser = async (req: Request, res: Response) => {

    try {

        const email = req?.user?.email

        const data = await Users.findOne({ email })

        res.status(200).json({ status: 'success', data, isAuthenticated: true })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message })
    }
}

export const logoutController = async (req: Request, res: Response) => {

    try {

        res.cookie('userToken', '', { maxAge: 1, httpOnly: true, sameSite: "none", secure: true })
        res.status(200).json({ status: 'success' })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ status: 'error', message: error?.message })
    }
}

