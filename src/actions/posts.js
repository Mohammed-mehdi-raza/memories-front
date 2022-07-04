import * as api from '../api';
import { FETCH_ALL,CREATE,UPDATE,DELETE } from '../actionConstants/constant.js';

export const getPosts=()=>async (dispatch)=>{
  try {
    const {data} = await api.fetchPosts();
    dispatch({type:FETCH_ALL,payload:data});
  } catch (e) {
    console.log(e);
  }
}

export const createPosts=(post)=>async(dispatch)=>{
  try {
    const data=await api.createPosts(post);
    dispatch({type:CREATE,payload:data});
  } catch (e) {
    console.log(e);
  }
}

export const updatePost=(id,post)=>async(dispatch)=>{
  try {
    const data =await api.updatePost(id,post);
    dispatch({type:UPDATE,payload:data});
  } catch (error) {
    console.log(error);
  }
}

export const deletePost=(id)=>async(dispatch)=>{
  try {
    await api.deletePost(id);
    dispatch({type:DELETE,payload:id});
  } catch (error) {
    console.log(error);
  }
}

export const likePost=(id)=>async(dispatch)=>{
  try {
    const data=await api.likePost(id);
    dispatch({type:UPDATE,payload:data});
  } catch (error) {
    console.log(error);
  }
}