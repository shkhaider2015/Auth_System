import { useState } from "react"
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../State/ActionHook";
import { IState } from "../State/Types/Reducers";
import axios from "axios";
import { FormikProps, useFormik } from "formik";
import { signupSchema } from "./YupSchema";




const SignupComp = () => {
    const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
    const isAuthenticated = useSelector((state: IState) => state.Auth.isAuthenticated)
    const { signup } = useAction()
    // const [formData, setFormData] = useState<ISignupFormData>({
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     password: '',
    //     re_password: ''
    // })
    // const { first_name, last_name, email, password, re_password } = formData;

    const formik:FormikProps<ISignupFormData> = useFormik<ISignupFormData>({
        initialValues : { 
            first_name : '',
            last_name : '',
            email : '',
            password : '',
            re_password : ''
         },
         validationSchema : signupSchema,
         onSubmit : val => {
            signup(val.first_name, val.last_name, val.email, val.password, val.re_password)
            setIsAccountCreated(true)
         }
    })



    // const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value })

    // const onSubmit = (e: any) => {
    //     e.preventDefault();

    //     if (password === re_password) {
    //         signup(first_name, last_name, email, password, re_password)
    //         setIsAccountCreated(true)
    //     }
    // };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`)

            window.location.replace(res.data.authorization_url)
        } catch (error) {

        }
    }

    if (isAuthenticated) {
        return <Redirect to="/" />
    }
    if (isAccountCreated) {
        return <Redirect to="/login" />
    }


    return <div className="container mt-5" >
        <h1>SignUp</h1>
        <p>Signup to your account</p>

        <form onSubmit={formik.handleSubmit}>

            <div className="form-group w-50 mt-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required />
                    <p style={{ opacity : 0.5, fontSize : 12, color : 'red' }} >
                    {
                        formik.touched.first_name && formik.errors.first_name
                        ? formik.errors.first_name
                        : null
                    }
                </p>
            </div>
            <div className="form-group w-50 mt-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required />
                    <p style={{ opacity : 0.5, fontSize : 12, color : 'red' }} >
                    {
                        formik.touched.last_name && formik.errors.last_name
                        ? formik.errors.last_name
                        : null
                    }
                </p>
            </div>

            <div className="form-group w-50 mt-2">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required />
                    <p style={{ opacity : 0.5, fontSize : 12, color : 'red' }} >
                    {
                        formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null
                    }
                </p>
            </div>

            <div className="form-group w-50 mt-2">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={6}
                    required />
                    <p style={{ opacity : 0.5, fontSize : 12, color : 'red' }} >
                    {
                        formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null
                    }
                </p>
            </div>

            <div className="form-group w-50 mt-2">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="re_password"
                    value={formik.values.re_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength={6}
                    required />

                    <p style={{ opacity : 0.5, fontSize : 12, color : 'red' }} >
                    {
                        formik.touched.re_password && formik.errors.re_password
                        ? formik.errors.re_password
                        : null
                    }
                </p>
            </div>

            <button className="btn btn-primary mt-2" type="submit" >Signup</button>
        </form>

        <button className="btn btn-danger mt-3" onClick={() => continueWithGoogle()} >Continue with google</button>
        <p className="mt-3" > Already have an account? <Link to="/login" >Login</Link> </p>
    </div>
}

interface ISignupFormData {
    first_name: string
    last_name: string
    email: string
    password: string
    re_password: string
}

export { SignupComp }