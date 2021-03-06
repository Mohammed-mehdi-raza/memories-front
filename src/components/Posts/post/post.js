import React from 'react'; 
import useStyles from './styles.js';
import {Card,CardMedia,CardActions,CardContent,Typography,Button} from "@material-ui/core";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/posts.js';

const Post=({post,setCurrentId})=>{
  const classes=useStyles();
  const dispatch =useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === ((user && user.result && user.result.googleId )|| (user && user.result && user.result._id)))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
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
       {//user && user.result && (user.result.googleId===post.creator || user.result._id ===post.creator) && (
          <div className={classes.overlay2}>
            <Button style={{color:'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
              <MoreHorizIcon fontSize='default'/>
            </Button>
          </div>
       //)
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
         {//(user && user.result && user.result.googleId === post.creator || user && user.result && user.result._id === post && post.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
         //)
         }
       </CardActions>
     </Card>
    ); 
} 

export default Post;