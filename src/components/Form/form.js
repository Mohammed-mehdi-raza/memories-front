import React from 'react'; 
import useStyles from './styles.js';
import {Typography,TextField,Paper,Button} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {createPosts,updatePost} from '../../actions/posts.js';
import {useNavigate} from "react-router-dom";

const Form=({currentId ,setCurrentId})=>{
  const post =useSelector((state)=>currentId?state.posts.posts.find((p)=> p._id===currentId):null);
  const classes=useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [postData,setPostData]=useState({
    title:'',message:'',tags:'',selectedFile:''
  });
  const user=JSON.parse(localStorage.getItem('PROFILE'));

  useEffect(()=>{
    if(post)
      setPostData(post);
  },[post])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currentId!==null)
      dispatch(updatePost(currentId,{...postData,name:user&&user.result&&user.result.name}));
    else
      dispatch(createPosts({...postData,name:user&&user.result&&user.result.name}));
    clear();
    navigate(0);
  }
  
  const clear=()=>{
    setCurrentId(null);
    setPostData({
      title:'',message:'',tags:'',selectedFile:''
    });
  }

  if(!(user && user.result && user.result.name)){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please sign in to create your memories and like other's
        </Typography>
      </Paper>
    )
  }
  
  return(
     <Paper className={classes.paper} elevation={6}>
       <form className={`${classes.root} ${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
         <Typography variant="h6">Creating a Memory</Typography>
         <TextField variant="outlined" label="title" name="title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})} required/>
         <TextField variant="outlined" label="message" name="message" fullWidth value={postData.message} multiline rows={4} onChange={(e)=>setPostData({...postData,message:e.target.value})} required/>
         <TextField variant="outlined" label="tags" name="tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})} required/>
         <div className={classes.fileInput}>
           <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
         </div>
         <Button className={classes.buttonSubmit} variant="contained" fullWidth type="submit" color="primary" size="large" >submit</Button>
         <Button variant="contained" fullWidth color="secondary" size="small" onClick={clear}>clear</Button>
       </form>
     </Paper>
    ); 
} 

export default Form;