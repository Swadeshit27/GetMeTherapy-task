import { ErrorMessage, useField } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    isPass?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, isPass = false, type = 'text', ...props }) => {
    const [view, setView] = useState(false);
    const [field, meta] = useField(props);
    return (
        <>
            <div className='mb-3'>
                <label
                    htmlFor={field.name}
                    className='capitalize font-medium max-xs:text-sm '
                >
                    {label}
                </label>
                <div className="relative mt-1">
                    <input
                        {...field}
                        type={view ? 'text' : type}
                        {...props}
                        className={`px-3 py-2   text-heading border border-border_2 outline-none rounded-lg focus:border-main w-full  ${meta.touched && meta.error && "border border-red-500"}`}
                    />
                    {isPass &&
                        <div className={`text-xl text-gray-600 absolute right-3 top-3 ${isPass && 'cursor-pointer'}`} onClick={() => setView(!view)}>
                            {view ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    }
                </div>
                <ErrorMessage component={'div'} name={field.name} className="text-red-600 text-[12px] sm:text-sm" />
            </div >
        </>
    )
}
export default InputField