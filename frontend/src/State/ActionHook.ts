import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreator from './Actions/index';

export const useAction = () =>
{
    const dispatch = useDispatch();
    // const { checkAuthenticated, load_user, login, logout } = bindActionCreators(actionCreator, dispatch);
     
    return bindActionCreators(actionCreator, dispatch);
}