import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Caption_Meme from "./pages/Caption_Meme";
import Battle_Memes from "./pages/Battle_Memes";

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
                path: "/Profile",
                element: <Profile />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Caption-Meme",
                element: <Caption_Meme />,
                errorElement: <ErrorPage />
            },
            {
                path: "/Battle-Memes",
                element: <Battle_Memes />,
                errorElement: <ErrorPage />,
                loader: memeLoader
            }
        ]
    }
]);

export default Routes;


