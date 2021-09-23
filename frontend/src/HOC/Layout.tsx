import { FC, ReactNode } from "react-router/node_modules/@types/react";
import { NavbarComp } from "../Components/Components";

interface IProps {
    children : ReactNode
}

export const LayoutComp:FC<IProps> = (props:IProps) =>
{
    return <div>
        <NavbarComp />
        {props.children}
    </div>
}