import { ReactNode, FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAction } from "../State/ActionHook";
import queryString from 'query-string';


interface IProps {
    children: ReactNode,
}


const GoogleComp: FC<IProps> = (prop: IProps) => {
    let location = useLocation();
    const { googleAuthentication } = useAction();
    const history = useHistory();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log("State : ", state);
        console.log("Code : ", code)

        if (state && code) {
            googleAuthentication(state, code);
        }

        // eslint-disable-next-line
    }, [location])

    return <div className="container" >
        <div className="bg-light p-5 mt-5" >
            <h1>Welcome to Auth System !</h1>
            <p>This is an incredible authentication system with production level features</p>
            <hr />
            <p>Go To Home</p>
            <button className="btn btn-primary" onClick={() => history.push('/')} >Home</button>


        </div>
    </div>
}


export { GoogleComp };