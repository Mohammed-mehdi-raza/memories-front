import React,{useState,useEffect} from "react";
import useStyles from "./styles.js";
import { AppBar, Typography, Avatar, Button, Toolbar } from "@material-ui/core";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import {Link,useNavigate,useLocation} from "react-router-dom";
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch=useDispatch();
  const location=useLocation();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('PROFILE')));

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null);
  };

  const handleLogout=()=>{
    dispatch({type:'LOGOUT'});
    setUser(null);
    navigate('/');
  }

  useEffect(()=>{
    if(user){
      const token = user && user.token;
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    }
    
    setUser(JSON.parse(localStorage.getItem('PROFILE')));
  },[location]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
        <img src={memoriesLogo} alt="memories" height="40px" className={classes.image} />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? 
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user && user.result && user.result.name} src={user && user.result && user.result.imageUrl}>{user && user.result && user.result.name.charAt(0)}</Avatar>
          <Typography variant="h6" className={classes.userName}>{user && user.result && user.result.name}</Typography>
          <Button className={classes.logout} variant="contained" color="secondary" onClick={handleLogout} >Log Out</Button>
        </div> : 
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
