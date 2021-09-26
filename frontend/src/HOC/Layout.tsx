import { FC, ReactNode, useEffect } from "react";
import { NavbarComp } from "../Components/Components";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../State/Actions/Auth";
import { useAction } from "../State/ActionHook";


// interface IMapDispatchToProps {
//     checkAuthenticated : typeof checkAuthenticated
//     load_user : typeof load_user
// }

interface IProps{
    children : ReactNode,
}

// const actions = {
//     checkAuthenticated,
//     load_user
// }


const LayoutComp  = (prop:IProps) =>
{
    const { checkAuthenticated, load_user } = useAction();

    useEffect(() => {
        checkAuthenticated()
        load_user()
        
    }, [])

    console.log("props : ", prop)

    return <div>
        <NavbarComp />
        {prop.children}
    </div>
}


// export default connect(null, actions )(LayoutComp)

export default LayoutComp;