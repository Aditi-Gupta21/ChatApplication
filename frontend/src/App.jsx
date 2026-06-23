import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/register",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  }
]);

function App() {
  return (
    <div className="p-4 h-screen items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
