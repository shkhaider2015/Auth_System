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
    const authState = useSelector((state: IState) => state.Auth)
    const { signup } = useAction()

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


    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url)
        } catch (error) {

        }
    }
    const continueWithFacebook = async () =>
    {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)
            
            window.location.replace(res.data.authorization_url)
        } catch (error) {
            
        }
    }

    if (authState.isAuthenticated) {
        return <Redirect to="/" />
    }
    if (isAccountCreated) {
        return <Redirect to="/login" />
    }


    return <div className="container mt-5 col-12 col-sm-12 col-md-8 col-lg-6" >
        <h1>SignUp</h1>
        <p>Signup to your account</p>
        {
            authState.error
            ? <p className="text-denger" > {authState.error} </p>
            : null
        }
        <form onSubmit={formik.handleSubmit}>

            <div className="form-group  mt-2">
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
            <div className="form-group  mt-2">
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

            <div className="form-group  mt-2">
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

            <div className="form-group  mt-2">
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

            <div className="form-group  mt-2">
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
        <h5 className="mt-2" >OR Continue with</h5>
        <button className="btn btn-danger mt-2" onClick={() => continueWithGoogle()} ><i className="fa fa-google"></i>  Google</button>
        <br />
        <button className="btn btn-primary mt-2" onClick={() => continueWithFacebook()} ><i className="fa fa-facebook"></i>  Facebook</button>
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