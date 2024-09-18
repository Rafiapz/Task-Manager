import { Field, Formik, Form, ErrorMessage } from "formik";
import { FC } from "react";
import { loginSchema } from "../schema/loginSchema";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
   const handleSubmit = (values: any) => {
      console.log(values);
   };
   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
         <div className="h-10 w-[600px]">
            <h1 className="font-bold text-blue-500 text-2xl ">Login</h1>
         </div>
         <div className="w-[600px] h-96 border-2 border-blue-500 rounded-lg">
            <div className="mt-5">
               <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit} validationSchema={loginSchema}>
                  <Form>
                     <div className="flex flex-col p-5  ">
                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />
                        <Field name="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500" component={"div"} />
                     </div>
                     <div className=" p-5 pt-0 ">
                        <button className="bg-blue-500 w-full h-10 text-white">Login</button>
                     </div>
                     <div className="flex gap-2 justify-center">
                        <p>Don't have an account?</p>
                        <Link to={"/signup"} className="text-blue-400">
                           Signup
                        </Link>
                     </div>
                     <div className="flex justify-center">
                        <button className="bg-blue-500 mt-5 text-white w-44 h-10 rounded-lg">Login with Google</button>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
