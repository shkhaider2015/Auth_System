import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreator from './Actions/index';

export const useAction = () =>
{
    const dispatch = useDispatch();
     
    return bindActionCreators(actionCreator, dispatch);
}