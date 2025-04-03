import React from 'react';
import UserForm from './components/UserForm';
import Register from './components/register';
import Navbar from './components/navbar';
import Hello from './components/hello';

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
const App: React.FC = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Navbar />}>
          <Route index element={<UserForm />} />
          <Route path="register" element={<Register />} />
          <Route path="hello" element={<Hello />} />

  
        </Route>
      )
    );
  return (
   
    <RouterProvider router={router} /> 
      
      
   
  );
};

export default App;