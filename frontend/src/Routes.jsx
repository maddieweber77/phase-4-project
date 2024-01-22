import React from "react";
import { createBrowserRouter } from 'react-router-dom';

// Import other components after the router imports
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Create_Meme from "./pages/Create_Meme";
import Caption_Meme from "./pages/Caption_Meme";
import Battle_Memes from "./pages/Battle_Memes";
import Leaderboard from "./pages/Leaderboard";


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
                path: "/Create-Meme",
                element: <Create_Meme />,
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
                errorElement: <ErrorPage />
            },
            {
                path: "/Leaderboard",
                element: <Leaderboard />,
                errorElement: <ErrorPage />
            }
        ]
    }
]);

export default Routes;


