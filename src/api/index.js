import axios from 'axios';

const url="https://my-memories12.herokuapp.com/posts";
const API =axios.create({baseURL:url});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('PROFILE')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('PROFILE')).token}`;
    }
    return req;
})

export const fetchPosts=()=>API.get('/posts');
export const createPosts=(newPost)=>API.post('/posts',newPost);
export const updatePost=(id,post)=>API.patch(`/posts/${id}`,post);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const signIn =(formData)=>API.post('/users/signIn',formData);
export const signUp=(formData)=>API.post('/users/signUp',formData);