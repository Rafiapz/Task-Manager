import { Field, Formik, Form, ErrorMessage } from "formik";
import { FC } from "react";
import { loginSchema } from "../schema/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/axios";
import { jsonConfig } from "../utils/apiUtils";
import toast from "react-hot-toast";

interface ILoginForm {
   email: string;
   password: string;
}

const LoginForm: FC = () => {
   const initialState: ILoginForm = {
      email: "",
      password: "",
   };

   const query: QueryClient = useQueryClient();

   const navigate = useNavigate();
   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         return (await apiClient.post("/user/login", formData, jsonConfig)).data;
      },
      onSuccess: (data) => {
         toast.success(data?.status);
         query.invalidateQueries({
            queryKey: ["auth"],
         });
         query.removeQueries();
         if (data.status == "success") {
            navigate("/");
         }
      },
      onError: (error: any) => {
         toast.error(error?.response?.data?.message);
      },
   });
   const handleSubmit = (values: ILoginForm) => {
      const formData = new FormData();
      formData.append("email", values?.email);
      formData.append("password", values?.password);
      mutate(formData);
   };

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
                        <Field name="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500" component={"div"} />
                     </div>
                     <div className=" p-5 pt-0 ">
                        <button type="submit" className="bg-blue-500 w-full h-10 text-white">
                           Login
                        </button>
                     </div>
                     <div className="flex gap-2 justify-center">
                        <p>Don't have an account?</p>
                        <Link to={"/signup"} className="text-blue-400">
                           Signup
                        </Link>
                     </div>
                     <div className="flex justify-center">
                        <button
                           onClick={() => {
                              toast.success("success");
                           }}
                           className="bg-blue-500 mt-5 text-white w-44 h-10 rounded-lg"
                        >
                           Login with Google
                        </button>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
