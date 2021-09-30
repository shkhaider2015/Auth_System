import { useState } from "react"
import { Redirect, useParams } from "react-router-dom";
import { useAction } from "../State/ActionHook";




const ActivateComp = () =>
{
    const [isVarified, setIsVerified] = useState<boolean>(false);
    const { verify } = useAction()
    const { uid, token } = useParams<{ uid : string, token : string }>()

    
    const verify_account = () => {
        verify(uid, token);
        setIsVerified(true)
    };


    if(isVarified)
    {
        return <Redirect to="/" />
    }


    return <div className="container" >

        <div
            style={{ marginTop : '200px' }} 
            className="d-flex flex-column justify-content-center align-item-center">
                <h1>Verify Your account</h1>
                <button
                    onClick={() => verify_account()}
                    type="button"
                    className="btn  btn-primary"
                    >
                    Verify
                </button>

        </div>
       
    </div>
}


export {ActivateComp}