import React from 'react'; 
import {Container} from '@material-ui/core';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const App =()=>{
  return (
      <BrowserRouter>
        <Container maxidth='lg'> 
          <Navbar/>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/auth" exact element={<Auth/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    );
}

export default App;