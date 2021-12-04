import { Route, Routes } from "react-router-dom"
import { routes } from "../data/routes"

const RouterConfig = ()=> {
    return (
        <Routes>
            {
                routes.map(item => 
                    <Route key={item.path} path={item.path} exact={item.exact} 
                        element={item.component} />
                )
            }
        </Routes>
    )
}

export default RouterConfig