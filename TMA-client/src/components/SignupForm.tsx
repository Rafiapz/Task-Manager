import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { signupSchema } from "../schema/signupSchem";

interface IinitialState {
   fullName: string;
   email:string;
   password:string;
}

const SignupForm: FC = () => {
   const initialState:IinitialState = {
      fullName: "",
      email: "",
      password:''
   };
   const handleSubmit = (values: IinitialState) => {
      
   };
   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
         <div className="h-10 w-[600px]">
            <h1 className="font-bold text-blue-500 text-2xl ">Signup</h1>
         </div>
         <div className="w-[600px] h-[450px] border-2 border-blue-500 rounded-lg">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={signupSchema}>
                  <Form>
                     <div className="flex flex-col p-5">
                        <Field name="fullName" placeholder="Full Name" className="border border-gray-500 h-10 pl-2" />
                        <ErrorMessage name="fullName" className="text-red-500 h-5" component={"div"} />

                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />

                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="password" className="text-red-500 h-5" component={"div"} />
                     </div>

                     <div className="p-5 pt-0">
                        <button className="bg-blue-500 w-full h-10 text-white">Signup</button>
                     </div>

                     <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="text-blue-400">
                           Login
                        </Link>
                     </div>

                     <div className="flex justify-center">
                        <button className="bg-blue-500 mt-5 text-white w-44 h-10 rounded-lg">Signup with Google</button>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default SignupForm;
