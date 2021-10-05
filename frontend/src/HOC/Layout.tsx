import { ReactNode, useEffect } from "react";
import { NavbarComp } from "../Components/Components";
import { useAction } from "../State/ActionHook";


interface IProps{
    children : ReactNode,
}


const LayoutComp  = (prop:IProps) =>
{
    const { checkAuthenticated, load_user } = useAction();

    useEffect(() => {
        
            checkAuthenticated()
            load_user()
        // eslint-disable-next-line
    }, [])

    return <div>
        <NavbarComp />
        {prop.children}
    </div>
}


export default LayoutComp;