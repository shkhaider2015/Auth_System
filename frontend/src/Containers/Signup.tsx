import { useState } from "react"
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../State/ActionHook";
import { IState } from "../State/Types/Reducers";




const SignupComp = () =>
{
    const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
    const isAuthenticated = useSelector((state:IState) => state.Auth.isAuthenticated)
    const { signup } = useAction()
    const [formData, setFormData] = useState<ISignupFormData>({
        name : '',
        email : '',
        password : '',
        re_password : ''
    })
    const {name , email, password, re_password} = formData;

    

    const onChange = (e:any) => setFormData({ ...formData, [e.target.name] : e.target.value })
    
    const onSubmit = (e:any) => {
        e.preventDefault();

        if(password === re_password)
        {
            signup(name, email, password, re_password)
            setIsAccountCreated(true)
        }
    };


    if(isAuthenticated)
    {
        return <Redirect to="/" />
    }
    if(isAccountCreated)
    {
        return <Redirect to="/login" />
    }


    return <div className="container mt-5" >
        <h1>SignUp</h1>
        <p>Signup to your account</p>

        <form onSubmit={(e:any) => onSubmit(e)}>

        <div className="form-group w-50 mt-2">
            <input 
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e:any) => onChange(e)}
                required />
            </div>

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

            <div className="form-group w-50 mt-2">
            <input 
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="re_password"
                value={re_password}
                onChange={(e:any) => onChange(e)}
                minLength={6}
                required />
            </div>
            
            <button className="btn btn-primary mt-2" type="submit" >Signup</button>
            <p className="mt-3" > Already have an account? <Link to="/login" >Login</Link> </p>
        </form>
    </div>
}

interface ISignupFormData {
    name : string
    email : string
    password : string
    re_password : string
}

export {SignupComp}