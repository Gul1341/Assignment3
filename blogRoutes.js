import express, { Router }  from "express";
import { getPosts, savePosts } from "../utils/filehelper.js";

const router = express.Router();

export default (upload) =>{
   router.get('/', (req,res)=>{
    const posts = getPosts();
    res.render('index',{posts});  
        });

        router.get('/add',(req,res)=>{
                res.render('add');
        });

        router.post('/create',upload.single('image'), (req,res)=>{
                const posts = getPosts();
                posts.push({
                        title:req.body.title,
                        content: req.body.content,
                        image: req.file? '/uploads/'+req.file.filename:null
                })
                savePosts(posts);
                res.redirect('/');
        })
        return router;
}