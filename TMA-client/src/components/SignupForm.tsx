import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schema/signupSchem";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { jsonConfig } from "../utils/apiUtils";
import { useLoginWithGoogle } from "../hooks/useUserHooks";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Loading from "./Loading";

interface IinitialState {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   confirmPassword: string;
}

const SignupForm: FC = () => {
   const initialState: IinitialState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
   };

   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         return (await apiClient.post("/user/signup", formData, jsonConfig)).data;
      },
      onSuccess: (data) => {
         console.log(data);
         if (data.status == "success") {
            navigate("/");
         }
      },
   });
   const handleSubmit = (values: IinitialState) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);

      mutate(formData);
   };

   const { mutate: googleLogin, isPending: googleLoading } = useLoginWithGoogle();
   const handleGoogleLoginSuccess = (tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      googleLogin(accessToken);
   };

   const handleGoogleLoginError = (error: any) => {
      toast(error.message);
   };

   const googleAuth = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: handleGoogleLoginError });
   return (
      <div className="flex flex-col items-center justify-center   mx-auto md:h-screen lg:py-0 ">
         <div className=" w-[600px] mt-20">
            <h1 className="font-bold text-blue-500 text-2xl">Signup</h1>
         </div>
         <div className="w-[600px] h-auto pb-3 mt-2  border-2 border-blue-500 rounded-lg">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={signupSchema}>
                  <Form>
                     <div className="flex flex-col p-5">
                        <Field name="firstName" placeholder="First Name" className="border border-gray-500 h-10 pl-2" />

                        <ErrorMessage name="firstName" className="text-red-500 h-5" component={"div"} />

                        <Field name="lastName" placeholder="Last Name" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="lastName" className="text-red-500 h-5" component={"div"} />

                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />

                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="password" className="text-red-500 h-5" component={"div"} />

                        <Field
                           name="confirmPassword"
                           type="password"
                           placeholder="Confirm Password"
                           className="border border-gray-500 h-10 pl-2 mt-5"
                        />
                        <ErrorMessage name="confirmPassword" className="text-red-500 h-5" component={"div"} />
                     </div>

                     <div className="p-5 pt-0">
                        <button type="submit" className="bg-blue-500 w-full h-10 text-white">
                           Signup
                        </button>
                     </div>

                     <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="text-blue-400">
                           Login
                        </Link>
                     </div>
                  </Form>
               </Formik>
               <div className="flex justify-center p-1">
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

export default SignupForm;
