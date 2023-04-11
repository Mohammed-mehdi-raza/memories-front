import React,{useState,useEffect} from 'react'; 
import useStyles from './styles.js';
import {Card,CardMedia,CardActions,CardContent,Typography,Button,ButtonBase} from "@material-ui/core";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';

const Post=({post,setCurrentId})=>{
  const classes=useStyles();
  const dispatch =useDispatch();
  const user = JSON.parse(localStorage.getItem('PROFILE'));
  const [temp,setTemp]=useState(0);
  const navigate=useNavigate();

  useEffect(()=>{
    if(user){
      if(user.result){
        if(user.result.googleId){
          setTemp(user.result.googleId);
        }else{
          setTemp(user.result._id);
        }
      }
    }
  })

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.filter((like) => like === temp)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 1 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const liked=()=>{
    dispatch(likePost(post._id));
    navigate(0);
  }

  const deleted=()=>{
    dispatch(deletePost(post._id));
    navigate(0);
  }

  const postClick=()=>navigate(`post/${post._id}`);

  return(
     <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={postClick} component="span" name="test">
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
              {
                post.creator===temp?
                <div className={classes.overlay2}>
                  <Button style={{color:'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize='default'/>
                  </Button>
                </div>:
                <></>
              }
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant="h6" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={user && !user.result} onClick={liked}>
            <Likes/>
          </Button>
            {
              post.creator===temp?
              <Button size="small" color="secondary" onClick={deleted}>
                <DeleteIcon fontSize="small" /> Delete
              </Button>:
              <></>
            }
        </CardActions>
     </Card>
    ); 
} 

export default Post;