import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignUp from "./pages/signup/index-signup";
import SignIn from "./pages/signin/index-signin";
import Main from "./pages/main/main-index";
import { getItem } from "./utils/storage";

function ProtectRoutes({ redirectTo }) {
    const token = getItem('token');
    return token ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (

        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<ProtectRoutes redirectTo='/' />}>
                <Route path='/main' element={<Main />} />
            </Route>
        </Routes >
    )
}

export default MainRoutes;