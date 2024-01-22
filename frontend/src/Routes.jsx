import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Login",
                element: <Login />,
                errorElement: <ErrorPage />
            },
            {
                path: ""
            }
        ]
    }
]);

export default Routes;


