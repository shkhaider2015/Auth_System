import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useAction } from "../State/ActionHook";
import { IState } from "../State/Types/Reducers";

export const NavbarComp = () => {

    const { logout } = useAction()
    const isAuthenticated = useSelector((state: IState) => state.Auth.isAuthenticated);
    const [redirect, setRedirect] = useState<boolean>(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    }

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className="nav-item">
            <a className="nav-link" href="#!" onClick={() => logout_user()} >Logout</a>
        </li>
    );

    return <Fragment>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Auth System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                        </li>
                        {
                            isAuthenticated
                                ? authLinks()
                                : guestLinks()
                        }

                    </ul>
                </div>
            </div>
        </nav>
        {
            redirect
            ? <Redirect to="/" />
            : <Fragment> </Fragment>
        }
    </Fragment>
}