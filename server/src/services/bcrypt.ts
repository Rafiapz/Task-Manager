import bcyrpt from 'bcrypt'

export const hashPassword = async (password: string) => {
    try {

        return await bcyrpt.hash(password, 10)

    } catch (error: any) {
        console.log(error)
    }
}

export const validatePassword = async (password: string, encrypted: any) => {
    try {

        return await bcyrpt.compare(password, encrypted)

    } catch (error: any) {
        console.log(error)
    }
}