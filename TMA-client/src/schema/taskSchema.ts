import * as Yup from 'yup'

export const taskSchema = Yup.object({

    title: Yup.string().trim().min(3, 'Title must be atleast 3 letters').required('This field is required'),
    description: Yup.string().trim().min(6, 'Description must be atleast 6 letters').required('This field is required'),

});
