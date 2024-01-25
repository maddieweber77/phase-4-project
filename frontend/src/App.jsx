import { Outlet } from 'react-router-dom'
import Header from "./components/Header";
import './index.css'
import './app.css'

function App() {

  // add check session function?

  

  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
