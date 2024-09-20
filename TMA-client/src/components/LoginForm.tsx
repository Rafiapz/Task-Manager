import { Field, Formik, Form, ErrorMessage } from "formik";
import { FC } from "react";
import { loginSchema } from "../schema/loginSchema";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginWithGoogle, useUserLogin } from "../hooks/useUserHooks";
import { useGoogleLogin } from "@react-oauth/google";
import Loading from "./Loading";

interface ILoginForm {
   email: string;
   password: string;
}

const LoginForm: FC = () => {
   const initialState: ILoginForm = {
      email: "",
      password: "",
   };

   const { mutate, isPending: loginLoading } = useUserLogin();
   const { mutate: googleLogin, isPending: googleLoading } = useLoginWithGoogle();
   const handleSubmit = (values: ILoginForm) => {
      const formData = new FormData();
      formData.append("email", values?.email);
      formData.append("password", values?.password);
      mutate(formData);
   };

   const handleGoogleLoginSuccess = (tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      googleLogin(accessToken);
   };

   const handleGoogleLoginError = (error: any) => {
      toast(error.message);
   };

   const googleAuth = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: handleGoogleLoginError });

   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
         <div className="h-10 w-[600px]">
            <h1 className="font-bold text-blue-500 text-2xl ">Login</h1>
         </div>
         <div className="w-[600px] h-96 border-2 border-blue-500 rounded-lg">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={loginSchema}>
                  <Form>
                     <div className="flex flex-col p-5  ">
                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />
                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="password" className="text-red-500" component={"div"} />
                     </div>
                     <div className=" p-5 pt-0 ">
                        {loginLoading ? (
                           <Loading width={"w-full"} />
                        ) : (
                           <button type="submit" className="bg-blue-500 w-full h-10 text-white">
                              Login
                           </button>
                        )}
                     </div>
                     <div className="flex gap-2 justify-center">
                        <p>Don't have an account?</p>
                        <Link to={"/signup"} className="text-blue-400">
                           Signup
                        </Link>
                     </div>
                  </Form>
               </Formik>
               <div className="flex justify-center pt-5">
                  {googleLoading ? (
                     <Loading width={"w-44"} />
                  ) : (
                     <button onClick={() => googleAuth()} className="bg-blue-500  text-white w-44 h-10 rounded-lg">
                        Login with Google
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
