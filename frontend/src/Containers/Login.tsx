import { useState } from "react"
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../State/ActionHook";
import { IState } from "../State/Types/Reducers";




const LoginComp = () =>
{
    const isAuthenticated = useSelector((state:IState) => state.Auth.isAuthenticated)
    const { login } = useAction()
    const [formData, setFormData] = useState<ILoginFormData>({email : '', password : ''})
    const {email, password} = formData;

    

    const onChange = (e:any) => setFormData({ ...formData, [e.target.name] : e.target.value })
    
    const onSubmit = (e:any) => {
        e.preventDefault();

        login(email, password)
    };


    if(isAuthenticated)
    {
        return <Redirect to="/" />
    }


    return <div className="container mt-5" >
        <h1>Sign In</h1>
        <p>Sign in to your account</p>

        <form onSubmit={(e:any) => onSubmit(e)}>
            <div className="form-group w-50 mt-2">
            <input 
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e:any) => onChange(e)}
                required />
            </div>

            <div className="form-group w-50 mt-2">
            <input 
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e:any) => onChange(e)}
                minLength={6}
                required />
            </div>
            
            <button className="btn btn-primary mt-2" type="submit" >Login</button>
            <p className="mt-3" > Dont have an account? <Link to="/signup" >Signup</Link> </p>
            <p className="mt-3" >Forgot your password? <Link to="reset-password" >Reset Password</Link> </p>
        </form>
    </div>
}

interface ILoginFormData {
    email : string
    password : string
}

export {LoginComp}