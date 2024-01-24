import { Outlet } from 'react-router-dom'
import Header from "./components/Header";
import './index.css'
import './app.css'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
