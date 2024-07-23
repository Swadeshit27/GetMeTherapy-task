import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import InputField from "../../components/InputField";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const validate = Yup.object({
    email: Yup.string()
        .email("Provide a valid email")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     'Password must contain at least one uppercase,lowercase letter, number, special character and min 6 characters',
    // ),
});

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (values: { email: string; password: string }) => {
        try {
            setLoading(true);
            const { email, password } = values;
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful");
            navigate("/login-successful");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Login successful");
            navigate("/login-successful");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <div className=" xs:h-screen   flex items-center justify-center bg-img">
            {loading && <Loader />}
            <div className="w-full max-xs:h-full max-w-md px-3 xxs:px-5 xs:px-6 py-6 bg-white xs:rounded-xl border xs:my-8">
                <div className="mb-6">
                    <h1 className="text-2xl xxs:text-[32px] xxs:leading-[40px] text-heading font-semibold mb-1.5 xs:mb-2 max-w-md">
                        Login to your account.
                    </h1>
                    <p className="text-sm xs:text-lg text-para1">
                        Please sign in to your account
                    </p>
                </div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={loginUser}
                    validationSchema={validate}
                >
                    {() => (
                        <Form>
                            <InputField
                                name="email"
                                label="Email Address"
                                placeholder="Enter email"
                            />
                            <InputField
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                isPass={true}
                            />
                            <div className="flex items-center justify-end mb-6">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-main text-end "
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-main text-white rounded-full font-medium  "
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="flex items-center justify-between my-6">
                    <div className="border-b border-gray-300 w-1/3"></div>
                    <span className="text-gray-600 text-sm font-medium">
                        Or Sign in with
                    </span>
                    <div className="border-b border-gray-300 w-1/3"></div>
                </div>
                <div className="flex items-center justify-center mb-4">
                    <button
                        onClick={loginWithGoogle}
                        className="border rounded-full p-2 "
                    >
                        <FcGoogle className="text-2xl xs:text-4xl" />
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-heading text-sm font-medium">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-main">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
