import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../State/ActionHook";
import { IState } from "../State/Types/Reducers";
import axios from "axios";
import { FormikProps, useFormik } from "formik";
import { loginSchema } from "./YupSchema";




const LoginComp = () =>
{
    const isAuthenticated = useSelector((state:IState) => state.Auth.isAuthenticated)
    const { login } = useAction()
    const formik:FormikProps<ILoginFormData> = useFormik<ILoginFormData>({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema : loginSchema,
        onSubmit : val => {
            login(val.email, val.password)
        }
    })

    const continueWithGoogle = async () =>
    {
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

    

    if(isAuthenticated)
    {
        return <Redirect to="/" />
    }


    return <div className="container mt-5 col-12 col-sm-12 col-md-8 col-lg-6" >
        <h1>Sign In</h1>
        <p>Sign in to your account</p>

        <form onSubmit={formik.handleSubmit}>
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
            
            <button className="btn btn-primary mt-2" type="submit" >Login</button>
        </form>
            <h5 className="mt-2" >OR Continue with</h5>
            <button className="btn btn-danger mt-2" onClick={() => continueWithGoogle()} ><i className="fa fa-google"></i>  Google</button>
            <br />
            <button className="btn btn-primary mt-2" onClick={() => continueWithFacebook()} ><i className="fa fa-facebook"></i>  Facebook</button>
            <p className="mt-3" > Dont have an account? <Link to="/signup" >Signup</Link> </p>
            <p className="mt-3" >Forgot your password? <Link to="reset-password" >Reset Password</Link> </p>
    </div>
}

interface ILoginFormData {
    email : string
    password : string
}

export {LoginComp}