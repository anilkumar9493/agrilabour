import { dashBoardRouteConstants } from '../../constants/route-constants';
import Post from '../dashboard/pages/post/post'
import SideBar from '../../components/SideBar';
import DisplayPosts from './pages/post/displayposts'
import SinglePost from '../dashboard/pages/post/singlepost'
import Negotiate from '../dashboard/pages/post/negotiate'
import MyRequests from '../dashboard/pages/post/myrequest'

export const dashboardRoutes = [
    {
        path: dashBoardRouteConstants.POST,
        component: Post,
        loginNotRequired: true,
        exact: true
    },
    {
        path: `/dashboard`,
        component: DisplayPosts,
        loginNotRequired: true,
        exact: true
    },

    {
        path: `/singlepost/:id`,
        component: SinglePost,
        loginNotRequired: true,
        exact: true
    },

    {
        path: `/negotiate/:id`,
        component: Negotiate,
        loginNotRequired: true,
        exact: true
    },

    {
        path: `/myrequests`,
        component: MyRequests,
        loginNotRequired: true,
        exact: true
    },

    {
        path: `/myposts`,
        component: DisplayPosts,
        loginNotRequired: true,
        exact: true
    },
]