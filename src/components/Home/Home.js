import React ,{useEffect,useState} from 'react';
import {Container,Grow,Grid, Paper,AppBar,TextField,Button,Chip} from '@material-ui/core';
import Posts from '../Posts/posts.js'; 
import Form from '../Form/form.js'; 
import {useDispatch} from 'react-redux';
import {getPosts,getPostsBySearch} from '../../actions/posts.js';
import useStyles from './styles.js';
import Pagination from '../Pagination/Pagination.jsx';
import {useNavigate,useLocation} from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home =()=>{
    const [currentId,setCurrentId]=useState(null);
    const classes =useStyles();
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const query=useQuery();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchQuery');
    const [search,setSearch]=useState("");
    const [tags,setTags]=useState([]);
    const [tagValue,setTagValue]=useState("");
  
    // useEffect(()=>{
    //   dispatch(getPosts());
    // },[currentId,dispatch]);

    const handleAdd=(e)=>{
      if(e.keyCode===13){
        setTags([...tags,tagValue])
      }
    }

    const searchPost=()=>{
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search,tags:tags.join(",")}));
        navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
      }else{
        navigate('/');
      }
    }

    const handleKeyPress=(e)=>{
      if(e.keyCode===13){
        searchPost();
      }
    }

    return(
        <Grow in> 
           <Container maxWidth="xl">  
             <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}> 
               <Grid item xs={12} sm={6} md={9}>
                 <Posts setCurrentId={setCurrentId}/>
               </Grid> 
               <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                  <TextField
                    variant='outlined'
                    fullWidth
                    name="search"
                    label="Search Memories"
                    onKeyDown={handleKeyPress}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <Autocomplete
                    multiple
                    freeSolo
                    value={tags}
                    options={[]}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} onDelete={()=>setTags(tags.filter((tag,i)=>i!==index))} />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Search Tags"
                        style={{margin:"10px 0"}}
                        value={tagValue}
                        onChange={(e)=>setTagValue(e.target.value)}
                        onKeyDown={handleAdd}
                      />
                    )}
                  />
                  <Button className={classes.searchButton} variant="contained" color="primary" onClick={searchPost}>search</Button>
                </AppBar>
                 <Form currentId={currentId} setCurrentId={setCurrentId}/>
                 {(!searchQuery && !tags.length) && (
                  <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page}/>
                  </Paper>
                 )}
               </Grid>
             </Grid>
           </Container>
         </Grow>
    );
}

export default Home;