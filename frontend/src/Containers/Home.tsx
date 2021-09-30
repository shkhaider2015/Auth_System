import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { IAuthState } from "../State/Types/Auth"

export const HomeComp = () => {

    const isAuthenticated = useSelector((state: IAuthState) => state.isAuthenticated)
    const history = useHistory();

    return <div className="container" >
        <div className="bg-light p-5 mt-5" >
            <h1>Welcome to Auth System !</h1>
            <p>This is an incredible authentication system with production level features</p>
            <hr />
            {
                isAuthenticated
                    ? <p>Logged in successfuly</p>
                    : <div>
                        <p>Click the login button</p>
                        <button className="btn btn-primary" onClick={() => history.push('/login') } >Login</button>
                    </div>
            }

        </div>
    </div>
}