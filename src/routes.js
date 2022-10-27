import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/index-signup";
import SignIn from "./pages/signin/index-signin";
import Main from "./pages/main/main-index";

function MainRoutes(){
    return(

        <Routes>
            <Route path='/' element={<SignIn/>}/>
        {/* A / significa que é a rota raiz da página */}
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/main' element={<Main/>}/>
        </Routes>
    )
}

export default MainRoutes;