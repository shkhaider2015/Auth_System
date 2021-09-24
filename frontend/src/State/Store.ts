import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {RootReducer} from './Reducers/index'

const initialState = {};
const middleware = [thunk];

export const store = createStore(
    RootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)