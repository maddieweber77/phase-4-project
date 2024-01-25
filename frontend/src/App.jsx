import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import './index.css'
import './App.css'
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}


export default App;
