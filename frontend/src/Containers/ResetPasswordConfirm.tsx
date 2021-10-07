import { useState } from "react"
import { Redirect, useParams } from "react-router-dom";
import { useAction } from "../State/ActionHook";




const ResetPasswordConfirmComp = () =>
{
    const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
    const { uid, token } = useParams<{ uid : string, token : string }>();
    const { reset_password_confirm } = useAction()
    const [formData, setFormData] = useState<ILoginFormData>({new_password : '', re_new_password : ''})
    const { new_password, re_new_password } = formData;
    

    

    const onChange = (e:any) => setFormData({ ...formData, [e.target.name] : e.target.value })
    
    const onSubmit = (e:any) => {
        e.preventDefault();
        reset_password_confirm(uid, token, new_password, re_new_password);
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
            <div className="form-group  mt-2">
            <input 
                type="password"
                className="form-control"
                placeholder="New Password"
                name="new_password"
                value={new_password}
                onChange={(e:any) => onChange(e)}
                required />
            </div>

            <div className="form-group  mt-2">
            <input 
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                name="re_new_password"
                value={re_new_password}
                onChange={(e:any) => onChange(e)}
                required />
            </div>
            
            <button className="btn btn-primary mt-2" type="submit" >Change Password</button>
        </form>
    </div>
}

interface ILoginFormData {
    new_password : string,
    re_new_password : string
}

export  {ResetPasswordConfirmComp};