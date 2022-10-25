import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";

function MainRoutes(){
    return(

        <Routes>
            <Route path='/' element={<SignIn/>}/>
        {/* A / significa que é a rota raiz da página */}
        </Routes>
    )
}

export default MainRoutes;