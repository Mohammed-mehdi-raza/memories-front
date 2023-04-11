import React from 'react'; 
import {Container} from '@material-ui/core';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import Navbar from './components/Navbar/Navbar.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

const App =()=>{
  const user=JSON.parse(localStorage.getItem('PROFILE'));
  return (
      <BrowserRouter>
        <Container maxidth='lg'> 
          <Navbar/>
          <Routes>
            <Route path="/" exact element={<Navigate to='/posts' />}/>
            <Route path="/posts" exact element={<Home/>}/>
            <Route path="/posts/search" exact element={<Home/>}/>
            <Route path="/posts/post/:id" exact element={<PostDetails/>}/>
            <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts"/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    );
}

export default App;