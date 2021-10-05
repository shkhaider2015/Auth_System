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
    // const [formData, setFormData] = useState<ILoginFormData>({email : '', password : ''})
    // const {email, password} = formData;
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

    

    // const onChange = (e:any) => setFormData({ ...formData, [e.target.name] : e.target.value })
    
    // const onSubmit = (e:any) => {
    //     e.preventDefault();

    //     login(email, password)
    // };

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


    return <div className="container mt-5" >
        <h1>Sign In</h1>
        <p>Sign in to your account</p>

        <form onSubmit={formik.handleSubmit}>
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
            
            <button className="btn btn-primary mt-2" type="submit" >Login</button>
        </form>
            <button className="btn btn-danger mt-3" onClick={() => continueWithGoogle()} >Continue with google</button>
            <br />
            <button className="btn btn-primary mt-3" onClick={() => continueWithFacebook()} >Continue with facebook</button>
            <p className="mt-3" > Dont have an account? <Link to="/signup" >Signup</Link> </p>
            <p className="mt-3" >Forgot your password? <Link to="reset-password" >Reset Password</Link> </p>
    </div>
}

interface ILoginFormData {
    email : string
    password : string
}

export {LoginComp}