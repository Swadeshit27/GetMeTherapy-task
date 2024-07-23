import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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
  username: Yup.string().required("Username is required"),
  // .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //     'Password must contain at least one uppercase,lowercase letter, number, special character and min 6 characters',
  // ),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (values: userType) => {
    try {
      setLoading(true);
      const { email, password } = values;
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("registration successful");
      navigate("/tracking-screen");
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
      navigate("/tracking-screen");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-full xs:min-h-screen   flex items-center justify-center bg-img">
      {loading &&
        <Loader />
      }
      <div className="w-full max-xs:h-full xs:max-w-md px-3 xxs:px-5 xs:p-6 py-12 xs:py-4 bg-white xs:rounded-xl xs:border xs:my-8">
        <div className="mb-12 xs:mb-6">
          <h1 className="text-2xl xxs:text-[32px] xxs:leading-[40px] text-heading font-semibold mb-1.5 xs:mb-2 max-w-md">
            Create your new account
          </h1>
          <p className="text-sm xs:text-base text-para1">
            Create an account to start looking for the food you like
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "", username: "", terms: false }}
          onSubmit={registerUser}
          validationSchema={validate}
        >
          {({ values }) => (
            <Form>
              <InputField
                name="email"
                label="Email Address"
                placeholder="Enter email"
              />
              <InputField
                name="username"
                label="User Name"
                placeholder="Enter username"
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                isPass={true}
              />
              <div className="flex xs:items-center mb-4" >
                <Field
                  type="checkbox"
                  name="terms"
                  className="w-4 h-4 mt-0.5 min-w-4 me-3 accent-main bg-white"
                />
                <label className="text-[15px] font-medium text-heading">
                  I Agree with <span className="text-main">Terms of Service</span> and <span className="text-main">Privacy Policy</span>
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-3 ${!values.terms ? "bg-orange-200" : "bg-main"} text-white rounded-full font-medium`}
                disabled={!values.terms}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-between my-4">
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
            <FcGoogle className="text-4xl" />
          </button>
        </div>
        <div className="text-center">
          <p className="text-heading text-sm font-medium">
            Have an account?{" "}
            <Link to="/login" className="text-main">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
