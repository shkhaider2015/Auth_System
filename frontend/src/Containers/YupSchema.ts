import * as yup from 'yup'

export const signupSchema = yup.object({
    first_name : yup.string().max(20, "Maximum length must not be 20 chars")
                                .required("First Name is required field"),
    last_name : yup.string().max(20, "Maximum length must not be 20 chars")
                            .required("Last Name is required field"),
    email : yup.string().email().required("Email is required field"),
    password : yup.string().min(6, "Password mini length must be at least 6 chars")
                            .max(12, 'Password maxi length must not be axceeds to 20 chars')
                            .required('Password is a required field'),
    re_password : yup.string().min(6, 'Password mini length must be at least 6 chars')
                                .max(12, 'Password maxi length must not be axceeds to 20 chars')
                                .when("password", {
                                        is: (val: string) => (val && val.length > 6 && val.length < 12 ? true : false),
                                        then: yup.string().oneOf([yup.ref("password")], 'Passwords are not match')})
                                .required("Confirm Password is a required field")
}) 

export const loginSchema = yup.object({
    email : yup.string().email("Enter a valid email address").required('Email is required'),
    password : yup.string().min(6, "Password length must be at least 6 chars").required('Password is required')
})