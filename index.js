import express from 'express';
import multer from 'multer';
import path from 'path';
import fs, { existsSync } from 'fs';
import blogRoutes from './routes/blogRoutes.js';

//express setup
const app = express();
const PORT = 3001;

//Middlewares setup
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

//file and folder setup
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if(!fs.existsSync('posts.json')) fs.writeFileSync('posts.json', '[]');

//Multer setup
const storage = multer.diskStorage({
        destination: 'uploads/',
        filename:(_,file,cb)=>{
                cb(null, Date.now() +path.extname(file.originalname))
        }
});
const upload = multer({storage});

app.use('/', (blogRoutes(upload)));
app.listen(PORT,(req,res)=>{
        console.log(`Server is running on port ${PORT}`);
})