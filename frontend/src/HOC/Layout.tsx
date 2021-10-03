import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import { NavbarComp } from "../Components/Components";
import { useAction } from "../State/ActionHook";
import queryString from 'query-string';


interface IProps{
    children : ReactNode,
}


const LayoutComp  = (prop:IProps) =>
{
    let location = useLocation();
    const { checkAuthenticated, load_user, googleAuthentication } = useAction();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null; 

        console.log("State : ", state);
        console.log("Code : ", code)

        if(state && code)
        {
            googleAuthentication(state, code);
        }
        else
        {
            checkAuthenticated()
            load_user()
        }

        // eslint-disable-next-line
    }, [location])

    return <div>
        <NavbarComp />
        {prop.children}
    </div>
}


export default LayoutComp;