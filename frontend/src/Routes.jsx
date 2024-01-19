import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";

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
        ]
    }
]);

export default Routes;


