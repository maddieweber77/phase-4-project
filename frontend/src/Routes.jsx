import React from "react";
import App from "./App";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter } from 'react-router-dom';


const Routes = createBrowserRouter([
    
    {
    path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/Login",
                element: <Login />
            },
        ]

}])


export default Routes;

