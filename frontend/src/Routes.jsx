import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import Login from "./pages/1Login";
import Home from "./pages/3Home";
import All_open_memes from "./pages/4All_open_memes";
import All_finished_memes from "./pages/5All_finished_memes";
import ErrorPage from "./pages/ErrorPage";



async function memeLoader() {
    const resRes = await fetch("http://localhost:3000/responses")
    const memeRes = await fetch("http://localhost:3000/memes")
    const userRes = await fetch("http://localhost:3000/users")
    return [await resRes.json(), await memeRes.json(), await userRes.json()]

}
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Login />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Home",
                element: <Home />,
                errorElement: <ErrorPage />
            },
            {
                path: "/All_Open_Memes",
                element: <All_open_memes />,
                errorElement: <ErrorPage />
            },
            {
                path: "/All_Finished_Memes",
                element: <All_finished_memes />,
                errorElement: <ErrorPage />
            },
        ]
    }
]);

export default Routes;


