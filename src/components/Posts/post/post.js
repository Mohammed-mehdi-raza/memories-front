import React,{useState,useEffect} from 'react'; 
import useStyles from './styles.js';
import {Card,CardMedia,CardActions,CardContent,Typography,Button} from "@material-ui/core";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts.js';

const Post=({post,setCurrentId})=>{
  const classes=useStyles();
  const dispatch =useDispatch();
  const user = JSON.parse(localStorage.getItem('PROFILE'));
  const [temp,setTemp]=useState(0);

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

  return(
     <Card className={classes.card}>
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
       <CardActions className={classes.cardActions}>
         <Button size="small" color="primary" disabled={user && !user.result} onClick={()=>dispatch(likePost(post._id))}>
           <Likes/>
         </Button>
          {
            post.creator===temp?
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>:
            <></>
          }
       </CardActions>
     </Card>
    ); 
} 

export default Post;