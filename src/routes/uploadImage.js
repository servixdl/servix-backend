import {Router} from 'express';
import multer from 'multer';
import {storage} from '../utils/uploadImage/configCloudinary.js'
const upload = multer({storage});
const router = Router();


router.post('/upload',upload.single('image'),(req,res)=>{
    const imageUrl = req.file.path;
    res.json({imageUrl})
    console.log(imageUrl)
})


export default router;









