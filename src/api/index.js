import axios from 'axios';

const url="https://memories-back.onrender.com/";
// const url="http://localhost:5000/";
const API =axios.create({baseURL:url});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('PROFILE')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('PROFILE')).token}`;
    }
    return req;
})

export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || "none" }&tags=${searchQuery.tags}`);
export const createPosts=(newPost)=>API.post('/posts',newPost);
export const updatePost=(id,post)=>API.patch(`/posts/${id}`,post);
export const deletePost=(id)=>API.delete(`/posts/${id}`);
export const likePost=(id)=>API.patch(`/posts/${id}/likePost`);
export const signIn =(formData)=>API.post('/users/signIn',formData);
export const signUp=(formData)=>API.post('/users/signUp',formData);