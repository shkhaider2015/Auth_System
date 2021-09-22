import { NavbarComp } from "../Components/Components";

export const LayoutComp = (props:any) =>
{
    return <div>
        <NavbarComp />
        {props.children}
    </div>
}