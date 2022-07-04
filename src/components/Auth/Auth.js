import React,{useState} from 'react';
import useStyles from './styles.js';
import {Container,Typography,Avatar,Paper,Grid,Button} from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input.js';
import GoogleLogin from 'react-google-login';
import Icon from './Icon.js';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signUp,signIn} from '../../actions/Auth.js';

const initialState ={FirstName:"",LastName:"",email:"",password:"",confirmPassword:""};

const Auth =()=>{
    const classes=useStyles();
    const [isSignUp,setIsSignUp]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const [formData,setFormData]=useState(initialState);

    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        try {
            if(isSignUp){
                dispatch(signUp(formData,navigate));
            }
            else{
                dispatch(signIn(formData,navigate));
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const showResult=()=>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
    }

    const googleSuccess=(res)=>{
        const result=res.profileObj;
        const token=res.tokenId;

        try {
            dispatch({type:'AUTH',data:{result,token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure=()=>{
        console.log('google sign in unsuccessfull');
    }
    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography>{isSignUp?'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp &&(
                            <>
                            <Input name='FirstName' label='first Name' handleChange={handleChange} autoFocus half/>
                            <Input name='LastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && (<Input name="confirmPassword" label="confirm password" handleChange={handleChange} type="password" />)}
                    </Grid>
                    <Button type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                        {isSignUp?"Sign Up":"Sign In"}
                    </Button>
                    <GoogleLogin clientId='86571725022-6h0b9ri6etb7ll38b3gm303njgb267lr.apps.googleusercontent.com' render={(renderProps)=>(
                        <Button color="primary" fullWidth variant="contained" className={classes.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}>
                            Google Sign In
                        </Button>
                    )} onSuccess={googleSuccess} onFailure={googleFailure}/>
                    <Container justifycontent='flex-end'>
                        <Grid item>
                            <Button onClick={showResult}>
                                {isSignUp?"Already have an account? Sign In":"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Container>               
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
