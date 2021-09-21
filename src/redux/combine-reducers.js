import { combineReducers } from "redux";
import cssReducer from "./css-reducer";
import { templatesReducer } from "../appModules/manage-templates/reducer";
import { Authreducer } from '../appModules/auth/reducers'
import { dashboardreducer } from "../appModules/dashboard/reducers";

export default asyncReducers =>
  combineReducers({
    ...asyncReducers,
    templatesReducer,
    Authreducer,
    cssReducer,
    dashboardreducer
  });
