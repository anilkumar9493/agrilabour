import Login from "./pages/login/login";
import Register from "./pages/register/register"
import { authRouteConstants } from "../../constants/route-constants";

export const authRoutes = [
  {
    path: authRouteConstants.LOGIN,
    component: Login,
    loginNotRequired: true,
    exact: true
  },
  {
    path: authRouteConstants.REGISTER,
    component: Register,
    loginNotRequired: true,
    exact: true
  },
];
