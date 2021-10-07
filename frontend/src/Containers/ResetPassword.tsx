import { useState } from "react"
import { Redirect } from "react-router-dom";
import { useAction } from "../State/ActionHook";




const ResetPasswordComp = () =>
{
    const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
    const { passwordReset } = useAction()
    const [formData, setFormData] = useState<ILoginFormData>({email : ''})
    const {email} = formData;

    

    const onChange = (e:any) => setFormData({ ...formData, [e.target.name] : e.target.value })
    
    const onSubmit = (e:any) => {
        e.preventDefault();

        passwordReset(email);
        setIsRequestSent(true)
    };


    if(isRequestSent)
    {
        return <Redirect to="/" />
    }


    return <div className="container mt-5 col-12 col-sm-12 col-md-8 col-lg-6" >
        <h1>Request Reset Password</h1>
        <p>Sign in to your account</p>

        <form onSubmit={(e:any) => onSubmit(e)}>
            <div className="form-group mt-2">
            <input 
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e:any) => onChange(e)}
                required />
            </div>
            
            <button className="btn btn-primary mt-2" type="submit" >Reset Request</button>
        </form>
    </div>
}

interface ILoginFormData {
    email : string
}

export  {ResetPasswordComp};